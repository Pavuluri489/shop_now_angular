import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  API_PATH='http://localhost:9000/auth/'
  requestHeader= new HttpHeaders({"No-Auth": 'True'})
 
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }

  public login(loginData: any){
    return this.httpClient.post(this.API_PATH+'authenticate',loginData,{
      headers: this.requestHeader,
    })
  }
 
  public register(registerData: any){
    return this.httpClient.post(this.API_PATH+'register',registerData)
  }

  public forgotPwd(data:any){
    return this.httpClient.post(this.API_PATH+'forgotPassword',data) 
  }

  public changePwd(data:any){
    return this.httpClient.post(this.API_PATH+'changePassword',data) 
  }

  public refreshToken(){
    return this.httpClient.get<any>(this.API_PATH+'refresh');
  }

  public updateProfile(data:any){
    return this.httpClient.post(this.API_PATH+'updateProfile',data);
  }
  public uploadImage(data:FormData){
    return this.httpClient.post(this.API_PATH+`profileImage`,data );
  }
  public roleMatch(allowedRoles:any):any {
    let isMatch = false;
    const userRoles: any = this.authService.getRoles();
      
    if (userRoles != null) {
      
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles === allowedRoles[j]) {
            isMatch = true;  
          } 
        }
        return isMatch;
      }
    }
  
}
