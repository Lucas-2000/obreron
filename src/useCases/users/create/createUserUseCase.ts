import { User } from "../../../entities/User";
import { UsersRepository } from "../../../repositories/usersRepositories";
import bcrypt from "bcrypt";
import { CustomError } from "../../../utils/customError";

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

type CreateUserResponse = void | CustomError;

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userPassword = String(password);

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (usernameAlreadyExists)
      return new CustomError(false, "Username já está em uso", 409);

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists)
      return new CustomError(false, "Email já está em uso", 409);

    if (userPassword.trim().length < 8)
      return new CustomError(false, "Senha precisa ter mais 7 caracteres", 400);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userPassword.trim(), salt);

    const user = new User();
    user.username = username.trim();
    user.email = email.trim();
    user.password = hashedPassword;

    await this.usersRepository.create(user);
  }
}
