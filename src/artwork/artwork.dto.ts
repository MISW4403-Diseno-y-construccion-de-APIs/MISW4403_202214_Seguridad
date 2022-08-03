/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ArtworkDto {
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly year: number;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly type: string;

    @IsUrl()
    @IsNotEmpty()
    readonly mainImage: string;
}
