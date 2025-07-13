import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString,  } from "class-validator";

export class SearchUserDto {

    @IsString()
    @IsOptional()    
    @ApiProperty({required: false})
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    email?: string;

    @IsOptional()
    id?: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;

    @IsOptional()
    @ApiProperty({ default: 10 ,required: false})
    limit?: number = 10;

    @IsOptional()
    @ApiProperty({ default: 1 ,required: false})
    page?: number = 1;
}