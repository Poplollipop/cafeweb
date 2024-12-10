import { Component } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../service/snackbar.service';
import { ConstantsService } from '../../shared/constants.service';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  responseMessage: any;
  data: any;

  constructor(
    private dashboard: DashboardService,
    private snackbar: SnackbarService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.ngxService.start();
    this.dashboardData();
  }

  ngAfterViewInit() {

  }

  dashboardData() {
    this.dashboard.getDetails().subscribe((res: any) => {
      this.ngxService.stop();
      this.data = res;
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = ConstantsService.commonError;
      }
      this.snackbar.openSnackBar(this.responseMessage, ConstantsService.commonError);
    })
  }

}
