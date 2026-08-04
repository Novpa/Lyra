import { User } from "../../generated/prisma/client";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepositoryInstance: UserRepository) {
    this.userRepository = userRepositoryInstance;
  }

  public async findUserByEmail(email: string) {
    const userRawData: User = await this.userRepository.findByEmail(email);

    if (!userRawData) throw new AppError(404, "User not found");

    const { passwordHash: _, ...rest } = userRawData;
    return rest;
  }

  public async getUserDetails(id: string) {
    const userRawData: User | null =
      await this.userRepository.getUserDetails(id);

    if (!userRawData) throw new AppError(404, "User not found");

    const { passwordHash: _, ...rest } = userRawData;
    return rest;
  }
}
