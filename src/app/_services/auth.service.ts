import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setRoles(role: string) {
    localStorage.setItem('role', role);
  }
  public setCustomer(customer:any){
    localStorage.setItem('customer',JSON.stringify(customer));
  }
  public getCustomer():any{
    return JSON.parse(`${localStorage.getItem('customer')}`);
  }
 
  public getRoles() {
    return localStorage.getItem("role");
  }
  public setAccessToken(accessToken:any){
    localStorage.setItem('accessToken', accessToken);
  }
  public setRefreshToken(refreshToken:any){
    localStorage.setItem('refreshToken', refreshToken);
  }
  public getAccessToken(){
    return localStorage.getItem('accessToken');
  }
  public getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getAccessToken();
  }
  public isAdmin(){
    const role=this.getRoles();
    return role==='Admin';
    //console.log(roles);
  }
  public isUser(){
    const role=this.getRoles();
    return role==='User';
    
  }
}
