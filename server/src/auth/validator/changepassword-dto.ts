import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class ChangePasswordDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    oldPassword: string;
}