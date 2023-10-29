import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    Error404Component,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule, AdminModule],
  exports: [
    LayoutComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    Error404Component,
  ],
})
export class RoutesModule {}
