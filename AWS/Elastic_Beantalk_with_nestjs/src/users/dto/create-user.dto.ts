import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    
    @Transform(params => 
        params.value.trim()
    )
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly name : string;


    @IsEmail()
    @IsString()
    @MaxLength(60)
    readonly email : string;

    @IsString()
    @Matches(/^[A-Za-z\d~@#$%^&*()]{8,30}$/)
    readonly password: string;
}
