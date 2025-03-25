import { usersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistesError } from "./errors/user-already-exists-error";

interface registerServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: usersRepository) {}
  async execute({ name, email, password }: registerServiceRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistesError();
    }

    const password_hash: string = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}
