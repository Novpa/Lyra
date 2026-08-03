import Database from "../config/Database";
import { TokenPayload } from "../types/tokenTypes";
import { JwtTokenProvider } from "../utils/JwtTokenProvider";
import crypto from "crypto";

export class TokenRepository {
  constructor(private prisma = Database.getInstance().getPrisma()) {}

  public async getActiveRefreshToken(refreshToken: string) {
    return await this.prisma.session.findFirst({
      where: {
        refreshToken,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  public async storeToken(userId: string, hashedRefreshToken: string) {
    await this.prisma.session.create({
      data: {
        userId,
        refreshToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
  }

  public async rotateToken(userId: string, payload: TokenPayload) {
    const { accessToken, refreshToken } = await this.prisma.$transaction(
      async (tx) => {
        await tx.session.deleteMany({
          where: {
            userId,
          },
        });

        const { accessToken, refreshToken } =
          JwtTokenProvider.generateTokens(payload);

        const hashedStoredToken = crypto
          .createHash("sha256")
          .update(refreshToken)
          .digest("hex");

        await tx.session.create({
          data: {
            refreshToken: hashedStoredToken,
            userId,
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          },
        });

        return { accessToken, refreshToken };
      },
    );

    return { accessToken, refreshToken };
  }
}
