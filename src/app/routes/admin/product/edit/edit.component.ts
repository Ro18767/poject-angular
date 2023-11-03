import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProdctsService } from 'src/app/sevice/prodcts.service';

type ValidateInvalidResult = {
  status: 'invalid';
  reason: string;
};

type ValidateValidResult = {
  status: 'valid';
};

type ValidateResult = ValidateInvalidResult | ValidateValidResult;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class AdminProductEditComponent {
  id: number | null = null;

  title = '';
  price = NaN;
  description = '';
  image_url = '';

  @ViewChild('title_input', { static: true })
  title_input!: ElementRef<HTMLInputElement>;
  @ViewChild('price_input', { static: true })
  price_input!: ElementRef<HTMLInputElement>;
  @ViewChild('description_input', { static: true })
  description_input!: ElementRef<HTMLInputElement>;
  @ViewChild('image_url_input', { static: true })
  image_url_input!: ElementRef<HTMLInputElement>;

  title_error_message = '';
  price_error_message = '';
  description_error_message = '';
  image_url_error_message = '';

  constructor(
    private prodctsService: ProdctsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.check_is_admin();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id_param = params.get('id');
      if (id_param != null && Number.isInteger(+id_param)) {
        this.id = +id_param;
        let product = this.prodctsService.get(this.id);
        if (product) {
          this.title = product.title;
          this.price = product.price;
          this.description = product.description;
          this.image_url = product.image_url.toString();
        } else {
          this.router.navigate(['/admin/product']);
        }
      } else if (id_param == null) {
      } else {
        this.router.navigate(['/admin/product']);
      }
    });
  }

  check_is_admin() {
    if (!this.authService.is_admin()) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    }
  }

  handle_input(event: Event) {
    let input = event.target as HTMLInputElement;
    if (!input) return;
    input.classList.remove('valid', 'invalid');
  }

  async submit_product() {
    let isAllValid = await this.validate_add_product_form();
    if (!isAllValid) return;

    let prodct = {
      title: this.title,
      price: this.price,
      description: this.description,
      image_url: new URL(this.image_url),
    };

    if (this.id == null) {
      let insert_id = this.prodctsService.insert(prodct);
      this.prodctsService.save();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/product', insert_id]);
      });
    } else {
      let db_product = this.prodctsService.get(this.id);
      if (db_product) {
        Object.assign(db_product, prodct);
        this.prodctsService.save();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/product', this.id]);
        });
      } else {
        this.id = null;
        this.submit_product();
      }
    }
  }

  async validate_add_product_form(): Promise<boolean> {
    let results = await Promise.all<ValidateResult>([
      this.validate_title(),
      this.validate_price(),
      this.validate_description(),
      this.validate_image_url(),
    ]);

    let [
      title_validate_result,
      price_validate_result,
      description_validate_result,
      image_url_validate_result,
    ] = results;

    if (title_validate_result.status === 'invalid') {
      this.title_error_message = title_validate_result.reason;
      this.title_input.nativeElement.classList.add('invalid');
    } else {
      this.title_input.nativeElement.classList.add('valid');
    }

    if (price_validate_result.status === 'invalid') {
      this.price_error_message = price_validate_result.reason;
      this.price_input.nativeElement.classList.add('invalid');
    } else {
      this.price_input.nativeElement.classList.add('valid');
    }

    if (description_validate_result.status === 'invalid') {
      this.description_error_message = description_validate_result.reason;
      this.description_input.nativeElement.classList.add('invalid');
    } else {
      this.description_input.nativeElement.classList.add('valid');
    }

    if (image_url_validate_result.status === 'invalid') {
      this.image_url_error_message = image_url_validate_result.reason;
      this.image_url_input.nativeElement.classList.add('invalid');
    } else {
      this.image_url_input.nativeElement.classList.add('valid');
    }

    let isAllValid = !results.find(({ status }) => status === 'invalid');
    return isAllValid;
  }

  async validate_title(): Promise<ValidateResult> {
    return this.validate(async () => {
      if (this.title.length < 3) {
        throw 'too short';
      }
    });
  }

  async validate_price(): Promise<ValidateResult> {
    return this.validate(async () => {
      if (Number.isNaN(this.price)) {
        throw 'is not a number';
      }
      if (!Number.isFinite(this.price)) {
        throw 'is not a finate number';
      }
      if (this.price < 1) {
        throw 'is too small number';
      }
    });
  }

  async validate_description(): Promise<ValidateResult> {
    return this.validate(async () => {
      if (this.description.length < 3) {
        throw 'too short';
      }
    });
  }

  async validate_image_url(): Promise<ValidateResult> {
    return this.validate(async () => {
      let url: URL;
      try {
        url = new URL(this.image_url);
      } catch {
        throw 'incorrect url';
      }

      let image = new Image();

      try {
        await new Promise<void>((resolve, reject) => {
          function load_function() {
            image.removeEventListener('load', load_function);
            image.removeEventListener('error', error_function);
            resolve();
          }
          function error_function(event: ErrorEvent) {
            image.removeEventListener('load', load_function);
            image.removeEventListener('error', error_function);
            reject(event.error);
          }

          image.addEventListener('load', load_function);
          image.addEventListener('error', error_function);

          image.src = url.toString();
        });
      } catch {
        throw 'image is in a format not supported';
      }
    });
  }
  async validate(callback: () => {}): Promise<ValidateResult> {
    try {
      await callback();
    } catch (reason) {
      if (reason instanceof Error) {
        return {
          status: 'invalid',
          reason: reason.name,
        };
      }
      if (typeof reason === 'string') {
        return {
          status: 'invalid',
          reason: reason,
        };
      }
      return {
        status: 'invalid',
        reason: 'unknown error',
      };
    }
    return {
      status: 'valid',
    };
  }
}
