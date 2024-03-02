import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UserRepository) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email } = authenticateDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { user };
  }
}
