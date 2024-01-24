import { UsersRepository } from "../../../repositories/usersRepository";

type FindAllUsersResponse = {
  username: string;
  email: string;
};

export class FindAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersResponse[]> {
    const users = await this.usersRepository.findAll();

    const mappedUsers: FindAllUsersResponse[] = users.map(
      (user: FindAllUsersResponse) => ({
        username: user.username,
        email: user.email,
      })
    );

    return mappedUsers;
  }
}
