import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  date: string;
 
  @ApiProperty()
  @IsNotEmpty()
  time: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  
  @ApiProperty()
  @IsNotEmpty()
  type_id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  place_id: string;
}
