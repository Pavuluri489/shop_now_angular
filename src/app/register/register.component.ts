import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit(): void {
   if(this.authService.isLoggedIn()){
      this.router.navigate(['/']);
   }
  }
  
  register(data:any){
    this.userService.register(data.value).subscribe(
      (res:any)=>{
        console.log(res);
      },
      (err:HttpErrorResponse)=>{
        console.log(err);
      }
    )
  }
}
