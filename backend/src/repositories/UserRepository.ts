import { UserCreateInput } from "../../generated/prisma/models";
import Database from "../config/Database";

export class UserRepository {
  private prisma = Database.getInstance().getPrisma();

  public async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(data: UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
