import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userRole')
  async signup(@Body() body: SignupDto, @Param('userRole') userRole: number) {
    if (userRole === 1) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.userName}-${userRole}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
      return this.authService.signup(body);
    } else throw new UnauthorizedException();
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() { role_id, userName }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(userName, role_id);
  }
}
