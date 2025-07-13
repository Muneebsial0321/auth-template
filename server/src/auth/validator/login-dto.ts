import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    password: string;
}