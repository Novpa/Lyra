import { UserCreateInput } from "../../generated/prisma/models";
import Database from "../config/Database";
import { USER_QUERIES } from "../queries/userQueries";

export class UserRepository {
  constructor(
    private prisma = Database.getInstance().getPrisma(),
    private pool = Database.getInstance().getPool(),
  ) {}

  public async findByEmail(email: string) {
    const user = await this.pool.query(USER_QUERIES.FIND_BY_EMAIL, [email]);
    return user.rows[0];
  }

  public async create(data: UserCreateInput) {
    return await this.prisma.user.create({
      data,
    });
  }
}
