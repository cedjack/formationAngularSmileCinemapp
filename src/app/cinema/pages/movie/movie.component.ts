import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';

import { Movie } from '../../shared/movie';
import { Schedule } from '../../shared/schedule';
import { CinemaService } from '../../shared/cinema.service';

@Component({
  template: `
    <div>
      <div *ngIf="movie">
        <cinemapp-movie-details [movie]="movie"></cinemapp-movie-details>
        <cinemapp-movie-schedules [schedulesGroups]="movie.schedulesGroups"></cinemapp-movie-schedules>
      </div>
      <div  *ngIf="!movie">
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </div>
    </div>
  `,
})
export class MovieComponent implements OnInit {

  movie: Movie;

  constructor(private cinema: CinemaService, private route: ActivatedRoute) { }

  ngOnInit() {

    // TODO: Upgrade to dynamic parameter
    // TODO: Use async pipe
    // TODO: Manage offline errors
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1', 10);

    this.cinema.getMovie(id).subscribe((movie) => {
      this.movie = movie;
    });

  }

}
