import { UsersRepository } from "./../../../repositories/usersRepository";
import { CustomError } from "./../../../utils/customError";
import bcrypt from "bcrypt";
import { jwtSecret } from "../../../infra/config/jwtConfig";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
  username: string;
  password: string;
}

type AuthUserResponse =
  | { user: { username: string; email: string }; token: string }
  | CustomError;

export class AuthUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthUserRequest): Promise<AuthUserResponse> {
    const usernameExists = await this.usersRepository.findByUsername(
      username.trim()
    );

    if (!usernameExists)
      return new CustomError(false, "Usuário e/ou senha incorretos", 400);

    const isPasswordEqual = bcrypt.compareSync(
      password.trim(),
      usernameExists.password
    );

    if (!isPasswordEqual)
      return new CustomError(false, "Usuário e/ou senha incorretos", 400);

    if (!jwtSecret) throw new Error("JWT Key not found!");

    const token = sign({}, jwtSecret, {
      subject: username,
      expiresIn: "3h",
    });

    return {
      user: {
        username,
        email: usernameExists.email,
      },
      token,
    };
  }
}
