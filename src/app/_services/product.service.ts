import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  API_Path='http://localhost:9000/';
  addCategory(data:FormData){
    return this.httpClient.post(`${this.API_Path}834915/product/addCategory`,data);
  }
  addSubCategory(data:FormData,sub:string){
    return this.httpClient.post(`${this.API_Path}834915/product/addSubCategory?categoryName=${sub}`,data);
  }
  getCategories(){
    return this.httpClient.get(`${this.API_Path}products/getAllCategories`);
  }
  getSubCategories(data:any){
    return this.httpClient.get(`${this.API_Path}products/getAllSubCategoriesByCategory?category=${data}`);
  }
  addProduct(data:FormData,sub:string){
    return this.httpClient.post(`${this.API_Path}834915/product/addProduct?subCategoryName=${sub}`,data);
  }
  getProducts(){
    return this.httpClient.get(`${this.API_Path}products`);
  }
  getProductsByCategory(data:string){
    return this.httpClient.get(`${this.API_Path}products/${data}`);
  }
  getProductsBySubCategory(data:string){
    return this.httpClient.get(`${this.API_Path}products/category/${data}`);
  }
  getProductsById(data:any){
    return this.httpClient.get(`${this.API_Path}products/by ${data}`);
  }
}
