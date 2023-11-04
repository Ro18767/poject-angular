import { Component, Signal } from '@angular/core';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';
import { CartService }  from 'src/app/sevice/cart.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  produts: Map<number, Product> | null;
  constructor(private prodctsService: ProdctsService, private cartService: CartService ) {
    this.produts = this.prodctsService.select();
  }

  add(id : number){
      this.cartService.add(id);
  }
}
