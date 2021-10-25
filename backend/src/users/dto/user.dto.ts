import {
    IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsObject, ValidateNested, IsInt
} from 'class-validator';

import {Expose, Transform, Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";
import {BookResponsesDto} from "../../books/dto/book.dto";

export class UserDto {
    @ApiProperty({minimum: 1})
    @IsNumber()
    @IsOptional()
    @Expose()
    age: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Expose()
    avatar: string;
}
export class ResponseUserDto extends UserDto {
    @ApiProperty({type: () => BookResponsesDto})
    @IsOptional()
    @Expose()
    @Type(e => BookResponsesDto)
    @ValidateNested()
    history: BookResponsesDto[];

    @Expose()
    @IsNumber()
    id: number;
}