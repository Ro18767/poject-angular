import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';
import { CartService }  from 'src/app/sevice/cart.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  id!: number;
  product!: Product;
  constructor(
    private prodctsService: ProdctsService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService 
  ) {
    this.id = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id_param = params.get('id');
      if (id_param != null && Number.isInteger(+id_param)) {
        this.id = +id_param;
        let product = this.prodctsService.get(this.id)!;
        if (!product) {
          this.router.navigate(['']);
        }
        this.product = product;
      } else if (id_param == null) {
      } else {
        this.router.navigate(['']);
      }
    });
  }

  add(id : number){
    this.cartService.add(id);
    window.location.reload();
  }
}
