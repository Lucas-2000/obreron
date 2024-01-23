import { UsersRepository } from "./../../../repositories/usersRepositories";
import { CustomError } from "./../../../utils/customError";

interface DeleteUserRequest {
  id: string;
}

type DeleteUserResponse = void | CustomError;

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    await this.usersRepository.delete(id);
  }
}
