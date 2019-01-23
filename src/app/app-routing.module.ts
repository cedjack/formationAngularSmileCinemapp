import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cinema/movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'oops/not-found' },
  // TODO: Lazy-load admin module and other modules
];

@NgModule({
  // TODO: Manage lazy-loading strategy
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
