import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AccountService } from '../../shared/account.service';
import { AutocompleteService } from '../../shared/autocomplete.service';

@Component({
  template: `
    <mat-card>
      <!-- TODO: Add a reactive binding to the form -->
      <form method="post" (ngSubmit)="register()">
        <h1>Inscription</h1>
        <p>Attention : il s'agit d'une app de test. E-mail et mot de passe seront
        visibles en clair par n'importe qui.</p>
        <!-- TODO: Add email, password and city components with form binding -->
        <cinemapp-errors [errors]="errors"></cinemapp-errors>
        <button type="submit" mat-raised-button color="accent">Valider l'inscription</button>
        <p class="center"><a routerLink="../login">Déjà inscrit/e ? Connectez-vous.</a></p>
      </form>
    </mat-card>
  `
})
export class ReactiveComponent implements AfterViewInit {

  // TODO: Form builder

  // TODO: Api observables with manual this-binding

  errors: string[] = [];

  // TODO: Inject FormBuilder
  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {

    // TODO: Detect changes


  }

  register(): void {

    const loading = this.snackBar.open(`Connexion en cours...`);

    // TODO: Pass form data
    this.account.register({ email: '', password: '' }).subscribe((response) => {

      if (response.success) {

        this.snackBar.open(`Inscription réussie`, `OK`, { duration: 2000 });

        this.router.navigate(['../login'], { relativeTo: this.route, queryParamsHandling: 'preserve' });

      } else {
        this.errors = response.error.split('.').slice(0, -1);
      }

    }, () => {

      loading.dismiss();

      this.errors = [`Pas de connexion Internet`];

    });

  }

}
