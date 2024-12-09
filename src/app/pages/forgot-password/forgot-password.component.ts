import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConstantsService } from '../../shared/constants.service';
import { Router } from '@angular/router';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordInfo: any = FormGroup;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiServiceService,
    private snackbar: SnackbarService,
    public dialog: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
  ){}

  ngOnInit(){
    this.forgotPasswordInfo = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(ConstantsService.emailRegex)]],
    })
  }

  submit(){
    this.ngxService.start();
    const formData = this.forgotPasswordInfo.value;
    const data = {
      email: formData.email
    }
    this.api.forgotPassword(data).subscribe((res:any)=>{this.ngxService.stop();
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
