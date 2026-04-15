export class ModelUser {
  id?: number;
  username: string;
  role: string;
  password: string;

  constructor(username: string, role: string, password: string) {
    this.username = username;
    this.role = role;
    this.password = password;
  }
}
