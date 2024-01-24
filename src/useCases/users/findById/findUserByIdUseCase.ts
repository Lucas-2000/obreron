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
    const user = await this.usersRepository.findById(id);

    if (!user) return new CustomError(false, "Usuário não encontrado", 404);

    return {
      username: user.username,
      email: user.email,
    };
  }
}
