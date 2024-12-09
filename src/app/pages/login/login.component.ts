import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

import { ApiServiceService } from '../../service/api-service.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConstantsService } from '../../shared/constants.service';

@Component({
  selector: 'app-login',
  imports: [
    MatToolbar,
    MatFormFieldModule,
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatDialogContent,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginform: any = FormGroup;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiServiceService,
    private snackbar: SnackbarService,
    public dialog: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(ConstantsService.emailRegex)]],
      password: [null, [Validators.required]],
    })
  }

  hidePassword = signal(true);
  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }


  submit() {
    this.ngxService.start();
    const formData = this.loginform.value;
    const data = {
      email: formData.email,
      password: formData.password
    }

    this.api.login(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.dialog.close();
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/cafe/dashboard');
      this.responseMessage = res?.message;
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = ConstantsService.commonError;
      }
      this.snackbar.openSnackBar(this.responseMessage, ConstantsService.commonError);
    })

  }


}
