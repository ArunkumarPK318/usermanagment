import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserMG } from 'app/shared/model/user-mg.model';

type EntityResponseType = HttpResponse<IUserMG>;
type EntityArrayResponseType = HttpResponse<IUserMG[]>;

@Injectable({ providedIn: 'root' })
export class UserMGService {
  public resourceUrl = SERVER_API_URL + 'api/user-mgs';

  constructor(protected http: HttpClient) {}

  create(userMG: IUserMG): Observable<EntityResponseType> {
    return this.http.post<IUserMG>(this.resourceUrl, userMG, { observe: 'response' });
  }

  update(userMG: IUserMG): Observable<EntityResponseType> {
    return this.http.put<IUserMG>(this.resourceUrl, userMG, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserMG>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserMG[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
