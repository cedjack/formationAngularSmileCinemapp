import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'cinemapp-password-with-confirmation',
  template: `
    <!-- TODO: Add form binding -->
    <div>
      <!-- TODO: Add form group name -->
      <div>
        <mat-form-field>
          <!-- TODO: Add form control name -->
          <input type="password" matInput placeholder="Votre mot de passe" required autocomplete="off">
        </mat-form-field>
        <mat-form-field>
          <!-- TODO: Add form control name -->
          <input type="password" matInput placeholder="Confirmez-le" autocomplete="off">
        </mat-form-field>
        <!-- TODO: Add mat-error on errors -->
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordWithConfirmationComponent implements OnInit {

  @Input() form: Readonly<FormGroup>;
  @Input() name = 'password';
  @Input() fieldName1 = 'password1';
  @Input() fieldName2 = 'password2';

  ngOnInit() {

    // TODO: Set validator


  }

}
