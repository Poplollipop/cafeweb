import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbar: SnackbarService,
  ) { }


  canActivate(router: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = router.data;
    expectedRoleArray = expectedRoleArray['expectedRole'];

    const token: any = localStorage.getItem("token");

    var tokenLoad: any;

    try {
      tokenLoad = jwtDecode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigateByUrl('/')
    }

    let expectedRole = '';
    for (let i = 0; i < expectedRoleArray['length'] ; i++) {
      if (expectedRoleArray[i] == tokenLoad.role) {
        expectedRole = tokenLoad.role;
      }
    }
    if (tokenLoad.role == 'user' || tokenLoad.role == 'admin') {
      if (this.auth.isAuthed() && tokenLoad.role == expectedRole) {
        return true;
      }
      this.snackbar.openSnackBar(ConstantsService.unauth, ConstantsService.error)
      this.router.navigateByUrl('/cafe/dashboard');
      return false;
    } else {
      this.router.navigateByUrl('/');
      localStorage.clear();
      return false
    }
  }
}
