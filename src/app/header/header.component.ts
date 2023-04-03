import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { CartService } from '../_services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public isActive:boolean=false;
 public key:string='';
 customer:any;
 constructor(
  private authService:AuthService,
  private router:Router,
  private userService:UserService,
  private cartService:CartService
){}
ngOnInit(): void {
  if(this.authService.isLoggedIn()){
   this.customer= this.authService.getCustomer();
   console.log(this.customer);
   this.cartService.getCartList(this.customer.userName).subscribe(
    (res:any)=>{
      console.log("cart :"+res.length);
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
    }
   );
  }
}
public isLoggedIn() {
  return this.authService.isLoggedIn();
}

public logout() {
  this.authService.clear();
  this.router.navigate(['/']);
}
public isAdmin(){
 return this.authService.isAdmin();
}
public isUser(){
  return this.authService.isUser();
 }
  search(e:any){
    console.log(e);
  }

  searchBar(){
    if(this.key===''){
    this.isActive=!this.isActive;
    }
    else{
      this.search(this.key);
    }
  }
}
