import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class GoogleAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authCode: string;

}