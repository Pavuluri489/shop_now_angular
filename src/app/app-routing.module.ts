import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { CartComponent } from './cart/cart.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'error', component:ErrorComponent},
  {path:'page', component:PageNotFoundComponent},
  {path:'products', component:ProductComponent,children:[{path:'**',component:ProductComponent}]},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'register', component:RegisterComponent},
  {path:'user', component:UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'update-profile', component:UpdateProfileComponent, canActivate:[AuthGuard],data:{roles:['Admin','User']}},
  {path:'view-profile', component:ViewProfileComponent, canActivate:[AuthGuard],data:{roles:['User','Admin']}},
  {path:'add-product', component:AddProductComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'view-products', component:ViewProductsComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},
  
  {path:'view-cart', component:CartComponent, canActivate:[AuthGuard], data:{roles:['Admin','User']}},
  {path:'view-orders', component:ViewOrdersComponent, canActivate:[AuthGuard], data:{roles:['Admin','User']}},
  {path:'orders', component:OrdersComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'deliveries', component:DeliveriesComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'search-results', component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
