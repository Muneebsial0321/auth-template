import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsString()
    name: string;

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