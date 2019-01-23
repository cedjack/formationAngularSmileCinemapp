import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LocalStorage, JSONSchemaArray, JSONSchemaObject, JSONSchemaString, JSONSchemaNumeric } from '@ngx-pwa/local-storage';

import { Response } from './response';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  get reservations$(): Observable<Reservation[]> {
    return this.reservationsSubject.asObservable();
  }

  private readonly localStorageKey = 'booking';
  private readonly reservationsSchema: JSONSchemaArray = {
    items: {
      properties: {
        movieTitle: { type: 'string' } as JSONSchemaString,
        theaterTitle: { type: 'string' } as JSONSchemaString,
        scheduleId: { type: 'number' } as JSONSchemaNumeric,
        scheduleHour: { type: 'string' } as JSONSchemaString,
      },
      required: ['movieTitle', 'theaterTitle', 'scheduleId', 'scheduleHour']
    } as JSONSchemaObject
  };
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private localStorage: LocalStorage) {

    /// TODO: Verify data with the JSON Schema and catch error
    this.localStorage.getItem<Reservation[]>(this.localStorageKey, { schema: this.reservationsSchema })
      .subscribe((reservations) => {

        this.reservationsSubject.next(reservations || []);

      });

  }

  book(schedule: number): Observable<Response<Reservation>> {

    return this.http.post<Response<Reservation>>(`/api/book`, { schedule })
    .pipe(tap((response) => {

      if (response.success && response.data) {

        const newReservations = this.reservationsSubject.getValue();
        newReservations.push(response.data);

        this.reservationsSubject.next(newReservations);

        this.localStorage.setItemSubscribe(this.localStorageKey, newReservations);

      }

    }));

  }

  cancel(id: number): void {

    const newReservations = this.reservationsSubject.getValue();
    newReservations.splice(id, 1);

    this.reservationsSubject.next(newReservations);

    this.localStorage.setItemSubscribe(this.localStorageKey, newReservations);

  }

}
