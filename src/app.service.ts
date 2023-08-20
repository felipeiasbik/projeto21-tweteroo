import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweets } from './entities/tweets.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetsDto } from './dtos/tweets.dtos';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweets[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetsDto) {
    const userCurrent = this.users.find((u) => u.username === body.username);
    if (!userCurrent) throw new UnauthorizedException('Unregistered User');
    const tweet = new Tweets(body.username, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweets() {
    return this.tweets;
  }

  getTweetsUser(username: string) {
    return username;
  }
}
