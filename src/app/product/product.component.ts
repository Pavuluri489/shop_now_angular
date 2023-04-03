import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { FileProcessingService } from '../_services/file-processing.service';
import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

 
  splits:any[]=[];
  products:any[]=[];
  n=Math.floor(Math.random()*4);
  p=0;
  heads:any[]=[];
  heading='';
  product:any;
  current_route='';
  customer:any;
  constructor(private router:Router,private productService:ProductService,
    private fileProcess:FileProcessingService,private authService:AuthService,
    private cartservice:CartService){}
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.customer=this.authService.getCustomer();
    }
    this.routeSelected();
  }

 
  
   fetchProducts(res:any){
    console.log(res);
    if(res.length==undefined){
      this.product=res;
      const sub_cate_image=this.fileProcess.fileProcess(res.subCategory.subCategoryImage);
    this.product.subCategory.subCategoryImage=sub_cate_image;
    const cate_image=this.fileProcess.fileProcess(res.subCategory.category.categoryImage);
    this.product.subCategory.category.categoryImage=cate_image;
    
  for(let i=0;i<res.productImages.length;i++){
  const productImg=this.fileProcess.fileProcess(res.productImages[i]);
      this.product.productImages[i]=productImg;
}
console.log(this.product)

    }
   for(let x=0;x<res.length;x++){
    this.products[x]=res[x];
    console.log(this.products[x])
    const sub_cate_image=this.fileProcess.fileProcess(res[x].subCategory.subCategoryImage);
    this.products[x].subCategory.subCategoryImage=sub_cate_image;
    const cate_image=this.fileProcess.fileProcess(res[x].subCategory.category.categoryImage);
    this.products[x].subCategory.category.categoryImage=cate_image;
    
  for(let i=0;i<res[x].productImages.length;i++){
  const productImg=this.fileProcess.fileProcess(res[x].productImages[i]);
      this.products[x].productImages[i]=productImg;
}

  }
}

clicked(i:any){
  this.p=i;
}

routeSelected(){
  this.current_route=this.router.url+'/';
  this.splits=this.router.url.split('/');
  console.log(this.splits);
  this.heading=this.splits[this.splits.length-1];
  this.heads=this.heading.split('%20');
  this.heading='';
  for(let x=0;x<this.heads.length;x++){
  this.heading+=this.heads[x]+' '
  }
  
  if(this.splits.length==4){
  this.productService.getProductsBySubCategory(this.splits[this.splits.length-1]).subscribe( 
  (res:any)=>{
   
   this.fetchProducts(res);
  }
  )
 }
 if(this.splits.length==3){
   this.productService.getProductsByCategory(this.splits[this.splits.length-1]).subscribe( 
   (res:any)=>{
    this.fetchProducts(res);
   }
   )
  }
  if(this.splits.length==2){
   this.productService.getProducts().subscribe( 
   (res:any)=>{
    this.fetchProducts(res);
   }
   )
  }
  if(this.splits.length==5){
    this.productService.getProductsById(this.splits[this.splits.length-1]).subscribe( 
    (res:any)=>{
     this.fetchProducts(res);
    }
    )
    setTimeout(()=>{
    this.productService.getProductsBySubCategory(this.product.subCategory.subCategoryName).subscribe( 
      (res:any)=>{
        
          console.log(res)
       this.fetchProducts(res);
       })
    },1000)
  }
}

productSelected(id:any){
  this.splits.length=5;
  this.productService.getProductsById(id).subscribe( 
    (res:any)=>{
     this.fetchProducts(res);
    }
    )
  this.router.navigate ([`${this.current_route}${id}`])
}

addCart(id:number){
  this.cartservice.addToCart(id,this.customer.userName).subscribe(
    (res:any)=>{
      console.log(res);
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
    }
  );
}
}
