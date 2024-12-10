import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from '../login/login.component';
import { ApiServiceService } from '../../service/api-service.service';



@Component({
  selector: 'app-homepage',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgxUiLoaderModule,
    MatTooltipModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private dialog: MatDialog,
    private api: ApiServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.api.checktoken().subscribe((res: any) => {
      this.router.navigateByUrl('/cafe/dashboard');
    },(error:any)=>{
      console.log(error);

    })
  }

  signup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px",
      dialogConfig.height = "600px"
    this.dialog.open(SignupComponent, dialogConfig);
  }


  forgotPassowrd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px",
      dialogConfig.height = "600px"
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  login() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px",
      dialogConfig.height = "600px"
    this.dialog.open(LoginComponent, dialogConfig);
  }

}
