import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConstantsService } from '../../shared/constants.service';
import { MatToolbar } from '@angular/material/toolbar';
import { SnackbarService } from '../../service/snackbar.service';


@Component({
  selector: 'app-signup',
  imports: [
    MatToolbar
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  password = true;
  confirmPassword = true;
  signupInfo: any = FormGroup;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiServiceService,
    private snackbar: SnackbarService,
    public dialog: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnOnit() {
    this.signupInfo = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(ConstantsService.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(ConstantsService.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(ConstantsService.contactNumberRegex)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  validateInfo() {
    if (this.signupInfo.controls['password'].value != this.signupInfo.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.ngxService.start();
    const formData = this.signupInfo.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.api.signup(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.dialog.close();
      this.responseMessage = res?.message;
      this.snackbar.openSnackBar(this.responseMessage, "");
      this.router.navigateByUrl('/');
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
