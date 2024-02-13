import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
    { message: 'Choose a stronger password' },
  )
  password: string;
}
