import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { FileProcessingService } from '../_services/file-processing.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
 
  
  
  n=Math.floor(Math.random()*4);
  products:any[]=[];
  splits:any[]=[];
  categories: any[]=[];
  cate_products:any[]=[];
  sub_cate_products:any[]=[];
  sub_cates: any[]=[];
constructor(private productService:ProductService,private fileProcess:FileProcessingService){}
  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      (res:any)=>{
        this.setRandom(res);
        console.log(this.categories);
      }
    );
    this.productService.getProducts().subscribe(
      (res:any)=>{
        console.log(res);
      if(this.categories.length>1){
      for(let j=0;j<this.categories.length;j++){
        this.productService.getSubCategories(this.categories[j].categoryName).subscribe(
            (resp:any)=>{
              
               this.sub_cates[j]={'sub':resp};}
            
          );
          setTimeout(()=>{
            console.log(this.sub_cates)
            if(this.sub_cates[j].sub.length!=0){
            if(this.categories[j].categoryName== this.sub_cates[j].sub[0].category.categoryName){
          for(let y=0;y<this.sub_cates[j].sub.length;y++){
            let x=0;
        for(let prod of res){
         if(this.sub_cates[j].sub[y].subCategoryName==prod.subCategory.subCategoryName){
          this.products.push(prod);
          const sub_cate_image=this.fileProcess.fileProcess(prod.subCategory.subCategoryImage);
          this.products[x].subCategory.subCategoryImage=sub_cate_image;
          const cate_image=this.fileProcess.fileProcess(prod.subCategory.category.categoryImage);
          this.products[x].subCategory.category.categoryImage=cate_image;
          
        for(let i=0;i<prod.productImages.length;i++){
        const productImg=this.fileProcess.fileProcess(prod.productImages[i]);
            this.products[x].productImages[i]=productImg;
      }
      x++;
      
    }
        }
        this.sub_cate_products[y]={'sub_cate':this.products};
        console.log(this.sub_cate_products[y]);
        this.products=[];
      }
    }
  }
      this.cate_products[j]={'cate':this.sub_cate_products};
     
      this.sub_cate_products=[];
      console.log(this.cate_products[j]);
          },1000)
          
      }
    }
      
      }
      
    )
  }
   setRandom(res:any){
    var x=0;
     for(let i=0;i<res.length+100;i++){
      let num=Math.floor(Math.random()*(res.length));
      if(this.categories.length==0){
        this.categories[x]=res[num];
        this.splits[x]=num;
      }
      
      else{
        if(res.length>=this.categories.length){
         let y=1;
        for(let m=0;m<this.categories.length;m++){
         if(res[num].categoryId==this.categories[m].categoryId)
         y++;
         }
          if(y==1){
            this.categories[++x]=res[num];
            if(this.splits.length<4)
               this.splits[x]=num;
          }
       }
        else break;
      }
     }
     for(let i=0;i<res.length;i++){
     if(res.length>=this.categories.length){
     let y=1;
      for(let j=0;j<this.categories.length;j++){
        if(res[i].categoryId==this.categories[j].categoryId)
        y++;
      }
      if(y==1)
      this.categories[this.categories.length]=res[i];
     }
     else break;
    }
   }
}
