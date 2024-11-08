import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchList } from './models/launch-list.model';

@Injectable()
export class LaunchesTableService {
  constructor(private http: HttpClient) {}

  getLaunchList(): Observable<LaunchList> {
    return this.http.get<LaunchList>('https://ll.thespacedevs.com/2.0.0/location/');
  }
}
