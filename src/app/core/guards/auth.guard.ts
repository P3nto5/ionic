import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService) {}

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
        tap( is => {
          if
        })
    );
  }

}
