import { Component } from '@angular/core';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';
import { CartService } from 'src/app/sevice/cart.service';
import { map, max } from 'rxjs';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  _cart: Map<number, number>;
  cart: Map<number, [Product, number]>;

  mincount: number = 1;
  maxcount: number = 9999;

  constructor(private prodctsService: ProdctsService, private cartService: CartService) {
    this._cart = this.cartService.select();

    this.cart = new Map<number, [Product, number]>();
    
    this._cart.forEach((value, key, map) => {
      let product = this.prodctsService.get(key);

      if (product)
        this.cart.set(key, [product, value]);
    });
  }

  delete(id : number)
  {
    this.cartService.delete(id);
    window.location.reload();
  }

  valuechange(id : number, event : Event): void {
    let n = Number((event.target as HTMLInputElement).value);

    if (!isNaN(n))
    {
      if (n > this.maxcount)
        n = this.maxcount;
      if (n < this.mincount)
        n = this.mincount;
      
      this.cartService.edit_count(id, n);
      window.location.reload();
    }
  }

  valueplus(id : number){
    let product = this.cart.get(id);
    if (product)
    {
      let count = product[1] + 1;
      if (count > this.maxcount)
        count = this.maxcount;

      this.cartService.edit_count(id, count);
      window.location.reload();
    }
  }

  valueminus(id : number){
    let product = this.cart.get(id);
    if (product)
    {
      let count = product[1] - 1;
      if (count < this.mincount)
        count = this.mincount;
      
      this.cartService.edit_count(id, count);
      window.location.reload();
    }
  }
}
