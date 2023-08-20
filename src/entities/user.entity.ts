export class User {
  public username: string;
  private avatar: string;

  constructor(username: string, avatar: string) {
    this.username = username;
    this.avatar = avatar;
  }
}
