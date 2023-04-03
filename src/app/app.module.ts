import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_auth/auth.guard';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { CartComponent } from './cart/cart.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { DragDirective } from './_services/drag.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ErrorComponent,
    AdminComponent,
    HomeComponent,
    PageNotFoundComponent,
    SideNavComponent,
    ProductComponent,
    UserComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    AddProductComponent,
    ViewProductsComponent,
    CartComponent,
    SearchComponent,
    OrdersComponent,
    ViewOrdersComponent,
    DeliveriesComponent,
    DragDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
