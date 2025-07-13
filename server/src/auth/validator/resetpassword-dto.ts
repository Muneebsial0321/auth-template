import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    newPassword: string;
}