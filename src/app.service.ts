import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const userCurrent = this.users.find(
      (u) => String(u.username) === String(body.username),
    );
    if (!userCurrent) throw new UnauthorizedException('Unregistered User');
    const userInstance = this.users.find(
      (u) => u.getUsername() === userCurrent.getUsername(),
    );
    const tweet = new Tweets(userInstance, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweets(pg: number) {
    const page = Number(pg);
    if (pg && (isNaN(page) || page < 1))
      throw new BadRequestException('Informe uma página válida!');

    let latestTweets: Tweets[];

    if (page) {
      const limit = 15;
      const start = (page - 1) * limit;
      const end = page * limit;
      latestTweets = this.tweets.slice(start, end);
    } else {
      latestTweets = this.tweets.slice(-15);
    }

    const tweetsReturn = [];
    latestTweets.map((t) => {
      tweetsReturn.push({
        username: t.getUser().getUsername(),
        avatar: t.getUser().getAvatar(),
        tweet: t.getTweet(),
      });
    });

    return tweetsReturn;
  }

  getTweetsUser(username: string) {
    const tweetsReturn = [];
    const tweetsUser = this.tweets.filter(
      (t) => t.getUser().getUsername() === String(username),
    );

    tweetsUser.map((t) => {
      tweetsReturn.push({
        username: t.getUser().getUsername(),
        avatar: t.getUser().getAvatar(),
        tweet: t.getTweet(),
      });
    });

    return tweetsReturn;
  }
}
