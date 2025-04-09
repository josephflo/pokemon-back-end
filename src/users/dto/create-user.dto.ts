import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
  
    @MinLength(6)
    password: string;
  }
  
  export class LoginDto {
    @IsEmail()
    email: string;
  
    @MinLength(6)
    password: string;
  }
