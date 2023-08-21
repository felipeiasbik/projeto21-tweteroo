import { User } from './user.entity';

export class Tweets {
  public username: User;
  private tweet: string;

  constructor(username: User, tweet: string) {
    this.username = username;
    this.tweet = tweet;
  }

  getUser() {
    return this.username;
  }

  getTweet() {
    return this.tweet;
  }
}
