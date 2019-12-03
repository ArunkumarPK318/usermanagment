import { IRoles } from 'app/shared/model/roles.model';

export interface IPermission {
  id?: number;
  name?: string;
  roles?: IRoles;
}

export class Permission implements IPermission {
  constructor(public id?: number, public name?: string, public roles?: IRoles) {}
}
