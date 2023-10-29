import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminProductEditComponent } from './product/edit/edit.component';
import { AdminProductListComponent } from './product/list/list.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminProductEditComponent,
    AdminProductListComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
})
export class AdminModule { }
