import { IUserMG } from 'app/shared/model/user-mg.model';
import { IRoles } from 'app/shared/model/roles.model';

export interface IApp {
  id?: number;
  type?: string;
  vesrion?: string;
  urlPath?: string;
  name?: string;
  users?: IUserMG[];
  roles?: IRoles[];
}

export class App implements IApp {
  constructor(
    public id?: number,
    public type?: string,
    public vesrion?: string,
    public urlPath?: string,
    public name?: string,
    public users?: IUserMG[],
    public roles?: IRoles[]
  ) {}
}
