import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
  Api_path='https://localhost:9000/cart/';

  addToCart( pid:number,user:any){
    return this.httpClient.post(`${this.Api_path}add?productId=${pid}&userName=${user}`,user);
  }
  getCartList(user:any){
    return this.httpClient.get(`${this.Api_path}getcartItems?userName=${user}`);
  }
}
