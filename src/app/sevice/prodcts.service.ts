import { Injectable, signal } from '@angular/core';

export type Product = {
  title: string;
  description: string;
  image_url: URL;
  price: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProdctsService {
  private state = signal<Map<number, Product>>(new Map());
  private lastId = signal(0);
  private readonly key = '/assets/products.json';

  constructor() {
    try {
      let json = window.localStorage.getItem(this.key);
      if (json == null)
        throw new TypeError(`localStorage do not have "${this.key}"`);
      this.fromParsedJson(JSON.parse(json));
    } catch {
      window
        .fetch('/assets/products.json')
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(`response code is ${response.status}`);
          }
          return response.json();
        })
        .then((json) => this.fromParsedJson(json))
        .catch(() => console.log)
        .finally(() => this.save());
    }
  }

  private fromParsedJson(
    json: {
      id: string;
      title: string;
      description: string;
      image_url: string;
      price: number;
    }[]
  ) {
    try {
      this.state.set(
        json.reduce((map, { id, title, description, image_url, price }, i) => {
          return map.set(+id, {
            title,
            description,
            image_url: new URL(image_url, window.location.href),
            price,
          });
        }, new Map())
      );
    } catch (reason) {
      console.log('catch', reason);
      this.state.set(new Map());
    }
  }

  private toJson(): string {
    let array = [];
    for (const [id, { title, description, image_url, price }] of this.state() ??
      new Map()) {
      array.push({ id, title, description, image_url, price });
    }
    return JSON.stringify(array);
  }
  save() {
    window.localStorage.setItem(this.key, this.toJson());
  }

  select() {
    return this.state();
  }
  signal() {
    return this.state.asReadonly();
  }

  insert(product: Product) {
    this.state.mutate((value) => {
      if (value) value.set(this.lastId(), product);
      this.lastId.update((value) => value + 1);
    });
  }
}
