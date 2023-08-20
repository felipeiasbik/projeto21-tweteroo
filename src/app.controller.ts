import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { Response } from 'express';
import { CreateTweetsDto } from './dtos/tweets.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  createUser(@Res() res: Response, @Body() body: CreateUserDto) {
    res.status(200).json(this.appService.createUser(body));
  }

  @Post('tweets')
  createTweet(@Body() body: CreateTweetsDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  getTweets() {
    return this.appService.getTweets();
  }

  @Get('tweets/:username')
  getTweetsUser(@Param('username') username: string) {
    return this.appService.getTweetsUser(username);
  }
}
