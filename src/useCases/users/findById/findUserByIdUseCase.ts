import { UsersRepository } from "../../../repositories/usersRepository";
import { CustomError } from "../../../utils/customError";

interface FindUserByIdRequest {
  id: string;
}

type FindUserByIdResponse =
  | {
      username: string;
      email: string;
    }
  | CustomError;

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    if (id.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const user = await this.usersRepository.findById(id);

    if (!user) return new CustomError(false, "Usuário não encontrado", 404);

    return {
      username: user.username,
      email: user.email,
    };
  }
}
