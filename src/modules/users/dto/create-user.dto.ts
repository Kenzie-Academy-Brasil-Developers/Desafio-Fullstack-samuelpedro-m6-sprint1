import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    fullName: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(4, 200)
    @Transform(({value}: {value:string}) => hashSync(value, 10), {groups: ['transform']})
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    telephone: string
}
