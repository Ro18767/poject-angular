import { Injectable, numberAttribute, signal } from '@angular/core';
import { Product } from 'src/app/sevice/prodcts.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products = signal<Map<number, number>>(new Map())
  private key = "cart";

  constructor() 
  {
    try{
      let ls = window.localStorage.getItem(this.key);

      if (ls)
      {
        let jsonObject = JSON.parse(ls);

        let map = new Map<number, number>();
        for (var value in jsonObject) {
          let n : number = Number(value);

          if (!isNaN(n))
          map.set(n, jsonObject[value]);
        }
        this.products.set(map);
      }
    }
    catch{}
  }

  private toJson(): string {
    let p = this.products();
    return JSON.stringify(Object.fromEntries(p));
  }

  add(id:number) {
    let i = this.products().get(id);

    if (i)
      this.edit_count(id, i+1);
    else
      this.products.mutate((value) => {
        if (!value) return;
        value.set(id, 1);
      });
    
    this.save();
  }

  edit_count(id:number, count:number){
    if (this.products().has(id))
      this.products.mutate((value) => {
        if (!value) return;
        value.set(id, count);
      });
    this.save();
  }

  select() {
    return this.products();
  }

  delete(id : number){
    this.products.mutate((value) => {
      value.delete(id);
    });
    this.save();
  }
  
  save() {
    window.localStorage.setItem(this.key, this.toJson());
  }
}
