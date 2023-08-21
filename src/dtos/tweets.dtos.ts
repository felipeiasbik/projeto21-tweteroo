import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateTweetsDto {
  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  username: User;

  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  tweet: string;
}
