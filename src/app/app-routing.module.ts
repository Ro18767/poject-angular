import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './routes/layout/layout.component';
import { HomeComponent } from './routes/home/home.component';
import { CartComponent } from './routes/cart/cart.component';
import { ProductComponent } from './routes/product/product.component';
import { AdminProductListComponent } from './routes/admin/product/list/list.component';
import { AdminProductEditComponent } from './routes/admin/product/edit/edit.component';
import { AdminComponent } from './routes/admin/admin.component';
import { Error404Component } from './routes/error404/error404.component';
import { adminGuard } from './guard/admin.guard';
import { notAdminGuard } from './guard/not_admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product/:id', component: ProductComponent },
      {
        path: 'admin/product/add',
        component: AdminProductEditComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'admin/product/:id',
        component: AdminProductEditComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'admin/product',
        component: AdminProductListComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'admin/:any',
        redirectTo: '/admin',
      },
      {
        path: 'admin',
        component: AdminComponent,
        canMatch: [notAdminGuard],
      },
      {
        path: 'admin',
        redirectTo: '/admin/product',
        canMatch: [adminGuard],
      },
      
  

      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
