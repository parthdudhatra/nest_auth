import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
    
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class getUserDto {
  readonly _id: string;
  readonly username: string;
  readonly password: string;
}
