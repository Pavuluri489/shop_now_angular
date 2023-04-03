import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from '../_model/file-handle.module';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  visible: boolean=false;
  isProfile: boolean=false;
  isProduct: boolean=false;
  isUploaded=false;
  customer:any;
  profileImage:any;
  image:any;
  constructor(
    private authService:AuthService,
    private router:Router,
    private userService:UserService,
    private sanitizer:DomSanitizer
  ){}
  ngOnInit(): void {
    
  }
  show(){
    this.visible=!this.visible
  }
  public isLoggedIn() {
    this.customer=this.authService.getCustomer();
    if(!(this.customer==null)){
      if(!(this.customer.profileImage==null)) 
    this.profileImage='data:'+this.customer.profileImage.contentType+';base64, '+this.customer.profileImage.picBytes;
    }
    else{
      this.profileImage=null;
    }
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
   profile(){
    this.isProfile=!this.isProfile;
   }
   product(){
    this.isProduct=!this.isProduct;
   }
   selectedFile(e:any){
    if(e.target.files){
      const file=e.target.files[0];
      const fileHandle:FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.image=fileHandle;
    }
   }
   upload(){
    console.log(this.image);
    const formData=new FormData();
    formData.append('image',this.image.file,this.image.file.name);
    console.log(formData);
    this.userService.uploadImage(formData).subscribe(
      (res)=>{
       this.authService.setCustomer(res);
       this.isLoggedIn();
       this.image=null;
        },
      (err)=>{
        console.log(err);
      }
    )
    
   }
   
}
