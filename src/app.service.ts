import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweets } from './entities/tweets.entity';
import { CreateUserDto } from './dtos/user.dtos';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweets[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet() {
    return 'Criando Tweet!';
  }

  getTweets() {
    return this.tweets;
  }

  getTweetsUser(username: string) {
    return username;
  }
}
