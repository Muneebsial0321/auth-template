import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class VerifyOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otpToken: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

}