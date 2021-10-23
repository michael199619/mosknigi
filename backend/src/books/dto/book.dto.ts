import {
    IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsObject, ValidateNested, IsInt
} from 'class-validator';

import {Expose, Transform, Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class BookDto {
    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    title: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    author: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    book_img_url: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    about: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Expose()
    release_year: number;
}

export class BookResponsesDto extends BookDto {
    @ApiProperty({})
    @IsNumber()
    @IsOptional()
    @Expose()
    id: number;
}