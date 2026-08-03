import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { LoginUserDTO, RegisterUserDTO } from "../validators/AuthValidator";
import { User } from "../../generated/prisma/client";
import { JwtTokenProvider } from "../utils/JwtTokenProvider";
import { TokenPayload } from "../types/tokenTypes";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  //? register
  public async register(userData: RegisterUserDTO) {
    const { firstName, lastName, email, password, gender } = userData;

    const existingUser: User = await this.userRepository.findByEmail(email);
    if (existingUser) throw new AppError(409, "User already exist!");

    const SALT_ROUND = 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUND);

    const newUser = await this.userRepository.create({
      firstName,
      lastName,
      gender,
      email,
      passwordHash,
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  //? login
  public async login(credentials: LoginUserDTO) {
    const { email, password } = credentials;

    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) throw new AppError(404, "Invalid credentials!");

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isMatch) throw new AppError(400, "Invalid credentials!");

    const { passwordHash: _, ...userWithoutPassword } = existingUser;

    const payload: TokenPayload = {
      userId: userWithoutPassword.id,
      fullName: `${userWithoutPassword.firstName} ${userWithoutPassword.lastName}`,
    };
    const { accessToken, refreshToken } =
      JwtTokenProvider.generateTokens(payload);

    return { userWithoutPassword, accessToken, refreshToken };
  }
}
