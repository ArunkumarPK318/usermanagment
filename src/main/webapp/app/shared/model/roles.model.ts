import { IPermission } from 'app/shared/model/permission.model';
import { IApp } from 'app/shared/model/app.model';

export interface IRoles {
  id?: number;
  name?: string;
  permissions?: IPermission[];
  app?: IApp;
}

export class Roles implements IRoles {
  constructor(public id?: number, public name?: string, public permissions?: IPermission[], public app?: IApp) {}
}
