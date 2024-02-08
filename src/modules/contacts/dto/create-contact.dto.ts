import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateContactDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    telephone: string;
}
