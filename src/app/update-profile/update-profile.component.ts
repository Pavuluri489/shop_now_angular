import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  isUD: boolean=true;
  isSD: boolean=false;
  isAd: boolean=false;
  isUpdated:boolean=false;
  address={
    doorNo: '',
    location:'',
    landmark:'',
    city:'',
    state:'',
    country:'',
    pincode:''
  }
  customer: any;
  name:string='';
  constructor(private userService:UserService,
    private authService:AuthService){}
  ngOnInit(): void {
    this.customer=this.authService.getCustomer();
    if(this.customer.address==null){
      console.log("empty")
      this.customer.address=this.address;
    }
  }
  edit(e:any){
  this.name=e.target.name;
  }

  updateProfile(data:NgForm){
    
    this.userService.updateProfile(this.customer).subscribe(
      (res:any)=>{
        console.log(res);
        this.authService.setCustomer(res);
        this.isUpdated=true;
        
      },
      (err:HttpErrorResponse)=>{
        console.log(err);
      }
    )
  }
}
