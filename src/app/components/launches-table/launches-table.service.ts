import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LaunchList } from './models/launch-list.model';
import { LocationsList } from './models/locations.model';

@Injectable()
export class LaunchesTableService {
  constructor(private http: HttpClient) {}

  getLaunchList(offset?: number): Observable<LaunchList> {
    const params = offset
      ? { params: new HttpParams().set('offset', offset) }
      : {};

    return this.http
      .get<LaunchList>(
        'https://ll.thespacedevs.com/2.2.0/launch/upcoming/',
        params
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return of();
        })
      );
  }

  getLaunchLocations(): Observable<LocationsList> {
    return this.http
      .get<LocationsList>('https://ll.thespacedevs.com/2.0.0/location/')
      .pipe(
        catchError((err) => {
          console.error(err);
          return of();
        })
      );
  }
}
