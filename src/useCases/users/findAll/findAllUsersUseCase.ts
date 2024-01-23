import { User } from "../../../entities/User";
import { UsersRepository } from "../../../repositories/usersRepositories";

type FindAllUsersResponse = User[];

export class FindAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersResponse> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
