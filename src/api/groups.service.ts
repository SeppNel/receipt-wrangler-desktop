import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Group } from 'src/models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private httpClient: HttpClient) {}

  public GetGroupsForUser(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('/api/group').pipe(take(1));
  }

  public getGroupById(id: string): Observable<Group> {
    return this.httpClient.get<Group>(`/api/group/${id}`);
  }

  public deleteGroup(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/group/${id}`);
  }

  public createGroup(group: Group): Observable<Group> {
    return this.httpClient.post<Group>('/api/group', group);
  }

  public updateGroup(group: Group, groupId: string): Observable<Group> {
    return this.httpClient.put<Group>(`/api/group/${groupId}`, group);
  }
}
