import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../util/AppError";
import bcrypt from "bcrypt";

export class AuthService {
  //
  private userRepository: UserRepository;

  // dependency injection / repository injection
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // FIXME ->> (userData type) register
  public async register(userData: any) {
    const { firstName, lastName, email, password, gender } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new AppError(409, "User already exist!");

    const SALT_ROUND = 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUND);

    const newUser = await this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }
}
