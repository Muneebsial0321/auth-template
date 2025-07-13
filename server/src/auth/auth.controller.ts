import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './validator/register-dto';
import { ForgotPasswordDto } from './validator/forgetpassword-dto';
import { ResetPasswordDto } from './validator/resetpassword-dto';
import { User } from './decorators/user.decorators';
import { RequestUserType } from './guards/user.type';
import { ChangePasswordDto } from './validator/changepassword-dto';
import { GoogleAuthDto } from './validator/googleauth-dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.loginUser(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.token,
      resetPasswordDto.newPassword,

    );
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @User() user: RequestUserType) {
    return this.authService.changePassword(
      user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    );
  }

  @Post('login/google')
  loginWithGoogle(@Body() googleLoginDto: GoogleAuthDto) {
    return this.authService.loginWithGoogle(googleLoginDto.authCode);
  }

}
