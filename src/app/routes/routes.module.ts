import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    Error404Component,
    AdminComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    LayoutComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    Error404Component,
  ],
})
export class RoutesModule {}
