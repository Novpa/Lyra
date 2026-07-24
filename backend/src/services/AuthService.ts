import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../util/AppError";
import bcrypt from "bcrypt";
import { RegisterUserDTO } from "../validators/AuthValidator";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async register(userData: RegisterUserDTO) {
    const { firstName, lastName, email, password, gender } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
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

  public async login(credentials: any) {
    const { email, password } = credentials;

    const existingUser = await this.userRepository.findByEmail(email);
    if (!existingUser) throw new AppError(404, "Invalid credentials!");

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isMatch) throw new AppError(400, "Invalid credentials!");

    const { passwordHash: _, ...userWithoutPassword } = existingUser;

    return userWithoutPassword;
  }
}
