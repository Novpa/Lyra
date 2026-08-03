import { User } from "../../generated/prisma/client";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepositoryInstance: UserRepository) {
    this.userRepository = userRepositoryInstance;
  }

  public async findUserByEmail(email: string) {
    const userRawData: User = await this.userRepository.findByEmail(email);
    const { passwordHash: _, ...rest } = userRawData;
    return rest;
  }
}
