import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router,
    private userService:UserService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {
     if(this.authService.getAccessToken()!==null){
      const role=route.data['roles'] as Array<string>;
      console.log(role);
      if(role){
        const match=this.userService.roleMatch(role);
        if(match)
        return true;
      }else {
        this.router.navigate(['/page']);
        return false;
     }
    }
    console.log('check1')
     this.router.navigate(['/login']);
     return false;
  }
  
}
