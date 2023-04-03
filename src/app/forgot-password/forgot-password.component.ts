import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public userName:string='';
  public lastName:string='';
  public isVerified:boolean=false;
  public isFirst:boolean=true;
  public isReset:boolean=false;
  isError=false;
  errMsg:string='';
  isSuccess:boolean=false;
  constructor(
    private userService:UserService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    
  }

  forgot(data:NgForm){
     this.userService.forgotPwd(data.value).subscribe(
      (res:any)=>{
        if(res===null){
          this.isVerified=false;
          this.isError=true;
        }
        else{
        this.isVerified=true;
        this.isError=false;
      }
      },
      (err:HttpErrorResponse)=>{
        this.errMsg=err.message;
      }
     )
  }

  otherWay(){
    this.isFirst=!this.isFirst;
  }

  resetPwd(){
    this.isReset=true;
    this.errMsg='';
  }
  reset(data:NgForm){
    this.userService.changePwd(data.value).subscribe(
      (res:any)=>{
        data.reset();
        this.isSuccess=true;
      },
      (err:HttpErrorResponse)=>{
        this.errMsg=err.message;
      }
    )
  }
}
