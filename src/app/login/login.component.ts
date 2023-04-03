import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean=true;
  isError:boolean=false;
  isAdmin:boolean=false;
  isUser:boolean=false;
 
  constructor(
    private userService:UserService,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit(): void {
   if(this.authService.isLoggedIn()){
    console.log("login");
    this.router.navigate(['/']);
   }
  }

  login(data:NgForm){
    this.userService.login(data.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.authService.setRoles(res.customer.roles[0].roleName);
        this.authService.setAccessToken(res.tokens.accessToken);
        this.authService.setRefreshToken(res.tokens.refreshToken);
        this.authService.setCustomer(res.customer);
        const role = res.customer.roles[0].roleName;
        console.log(role);
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {

          this.router.navigate(['/user']);
        }
        
        const clear=setInterval(()=>{

          if(this.authService.isLoggedIn()){
            
          const refresh=this.authService.getRefreshToken();
          this.authService.setAccessToken(refresh);
          this.userService.refreshToken().subscribe(
            (res:any)=>{
              this.authService.setAccessToken(res.accessToken);
              this.authService.setRefreshToken(res.refreshToken);
              console.log("refreshed")
            },
            (err:any)=>{console.log("error :"+err)}
          )}
          else{
            console.log("logout");
            clearInterval(clear);
          }
          
        },23*60*60000)
      },
      (err)=>{
        console.log(err);
        if(err.status==503)
        this.router.navigate(['/error']);
      }
      
    )
    data.reset();
  }
}




