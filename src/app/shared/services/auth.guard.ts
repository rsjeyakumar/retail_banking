import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      // if (user.userName === 'admin') {
      //   // this.router.navigate(['/admin']);
      // } else {
      //   this.router.navigate(['/home']);
      // }
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
