import { User } from 'src/models/user';

export class SetUsers {
  static readonly type = '[User] Set Users';
  constructor(public users: User[]) {}
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  constructor(public userId: string, public user: User) {}
}
export class AddUser {
  static readonly type = '[User] Add User';
  constructor(public user: User) {}
}
