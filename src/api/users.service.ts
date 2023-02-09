import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/user').pipe(take(1));
  }

  public updateUser(id: string, user: User): Observable<void> {
    return this.httpClient.post<void>(`/api/user/${id}`, user);
  }

  public createUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`/api/user`, user);
  }
}
