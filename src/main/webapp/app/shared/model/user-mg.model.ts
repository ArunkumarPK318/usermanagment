import { IApp } from 'app/shared/model/app.model';

export interface IUserMG {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  app?: IApp;
}

export class UserMG implements IUserMG {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public app?: IApp
  ) {}
}
