import {
    IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsObject, ValidateNested, IsInt
} from 'class-validator';

import {Expose, Transform, Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({minimum: 1})
    @IsNumber()
    @IsOptional()
    @Expose()
    age: number;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    firstName: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsOptional()
    @Expose()
    lastName: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Expose()
    roleId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Expose()
    avatar: string;
}