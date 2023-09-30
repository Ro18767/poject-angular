import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './routes/layout/layout.component';
import { HomeComponent } from './routes/home/home.component';
import { CartComponent } from './routes/cart/cart.component';
import { ProductComponent } from './routes/product/product.component';
import { AdminComponent } from './routes/admin/admin.component';
import { Error404Component } from './routes/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', component: Error404Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
