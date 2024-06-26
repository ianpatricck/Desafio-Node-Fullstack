import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePlaceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  nickname?: string;

  @ApiProperty()
  @IsNotEmpty()
  type_id: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsOptional()
  complement?: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  inputs: string;

  @ApiProperty()
  @IsNotEmpty()
  turnstiles: string;
}
