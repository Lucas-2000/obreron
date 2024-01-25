import { UsersRepository } from "../../../repositories/usersRepository";
import { CustomError } from "./../../../utils/customError";
import bcrypt from "bcrypt";

interface UpdateUserRequest {
  id: string;
  password: string;
  rePassword: string;
}

type UpdateUserResponse =
  | {
      username: string;
      email: string;
    }
  | CustomError;

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    password,
    rePassword,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    if (id.trim() === "" || password.trim() === "" || rePassword.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const userExists = await this.usersRepository.findById(id);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    const isPasswordEqual = bcrypt.compareSync(
      password.trim(),
      userExists.password
    );

    if (isPasswordEqual)
      return new CustomError(
        false,
        "Nova senha não pode ser igual a atual",
        400
      );

    if (password.trim() !== rePassword.trim())
      return new CustomError(false, "Senhas não coincidem", 400);

    if (password.trim().length < 8 && rePassword.trim().length < 8)
      return new CustomError(false, "Senha precisa ter mais 7 caracteres", 400);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.trim(), salt);

    await this.usersRepository.update(id, hashedPassword);

    return {
      username: userExists.username,
      email: userExists.email,
    };
  }
}
