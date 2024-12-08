import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@Component({
  selector: 'app-homepage',
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgxUiLoaderModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private dialog: MatDialog) { }

  signup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px",
    dialogConfig.height = "600px"
      this.dialog.open(SignupComponent, dialogConfig);
  }

}
