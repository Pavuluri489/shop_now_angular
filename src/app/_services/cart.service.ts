import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  cartItems:any=[];
  cartList= new BehaviorSubject<any>([]);
  constructor(private httpClient:HttpClient) { }
  Api_path='http://localhost:9000/cart/';

  addToCart( pid:number,user:any){
    return this.httpClient.post(`${this.Api_path}add?productId=${pid}&userName=${user}`,user);
  }
  getCartList(user:any){
    return this.httpClient.get(`${this.Api_path}getCartItems?userName=${user}`);
  }
  getCount(user:any){
    this.getCartList(user).subscribe(
      (res:any)=>{
     for(let i=0;i<res.length;i++){
        this.cartItems.push(res[i]);
        this.cartList.next(this.cartItems);
       }
      }
    )
    return this.cartList.asObservable();
  }

  addItems(cart:any){
    this.cartItems.push(cart);
    this.cartList.next(this.cartItems);
  }
}


