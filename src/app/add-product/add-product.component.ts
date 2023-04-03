import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.module';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public images=new Array();
  category='';
  nam='ac';
  categories:any[]=[];
  sub_categories:any[]=[];
  msg:string='';
  errMsg:string='';
  ngOnInit(): void {
    this.get_cate();
  }
  constructor(private sanitizer:DomSanitizer,private productService:ProductService){}

  image(e:any){
    if(e.target.files){
      
      const file=e.target.files[0];
      
      const fileHandle:FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
 this.images.push(fileHandle);
 console.log(this.images[0]);
    
  }
 
}
 cate(data:NgForm){
  console.log(data.value);
  const category={"categoryName":data.value.categoryName};
  let formData=new FormData();
  formData.append("categoryImage",this.images[0].file,this.images[0].file.name);
  formData.append("category",new Blob([JSON.stringify(category)],{type:'application/json'}));
  this.productService.addCategory(formData).subscribe(
    (res:any)=>{
      console.log(res);
      this.get_cate();
      this.msg=res.categoryName+' is added successfully into Category List.'
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
      this.errMsg=data.value.categoryName+' is failed to add into Category List.please try again !'
    }
  )
  data.reset();
  this.images=[];
 }

 sub_cate(data:NgForm){
  console.log(data.value);
  const subCategory={"subCategoryName":data.value.subCategoryName};
  let formData=new FormData();
  formData.append("subCategoryImage",this.images[0].file,this.images[0].file.name);
  formData.append("subCategory",new Blob([JSON.stringify(subCategory)],{type:'application/json'}));
  this.productService.addSubCategory(formData,data.value.category).subscribe(
    (res:any)=>{
      console.log(res);
      this.msg=res.subCategoryName+' is added successfully into Sub-Category List.'
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
      this.errMsg=data.value.subCategoryName+' is failed to add into Sub-Category List.please try again !'
    }
  )
  data.reset();
  this.images=[];
 }
 filesDroped(fileHandle:FileHandle){
  this.images.push(fileHandle);
 }
 product(data:NgForm){
  console.log(data.value);
  const product={"productName":data.value.p_name,"productActualPrice":data.value.p_actual,
    "productDiscountedPrice":data.value.p_discounted,"productOverview":data.value.p_overview,
  "aboutItem":{"description":data.value.p_description}};
  console.log('product'+product.aboutItem);
  const formData=new FormData();
  for(let i=0;i<this.images.length;i++){
  formData.append('profileImages',this.images[i].file,this.images[i].file.name);
  }
  formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));
  this.productService.addProduct(formData,data.value.sub).subscribe(
    (res:any)=>{
      console.log(res);
      this.msg=res.productName+' is added successfully into Products List.'
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
      this.errMsg=data.value.p_name+' is failed to add into Products List.please try again !'
    }
  );
  data.reset();
  this.images=[];
 }
 clicked(e:any){
  this.msg='';
  this.errMsg='';
 this.nam=e.target.name;
 }

 get_sub_cate(data:any){
  this.productService.getSubCategories(data).subscribe(
    (res:any)=>{
      console.log(res);
      for(let i=0;i<res.length;i++)
      this.sub_categories[i]=res[i].subCategoryName;
      
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
    }
  )
 }
 get_cate(){
  this.productService.getCategories().subscribe(
  (res:any)=>{
    for(let i=0;i<res.length;i++)
    this.categories[i]=res[i].categoryName;
  }
  );
 }
 
  
}
