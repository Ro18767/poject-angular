import { Component } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  handle_image_url_input(event: Event) {
    let image_url = event.target as HTMLInputElement;
    if (!image_url) return;
    image_url.classList.remove('valid', 'invalid');
  }

  async handle_image_url_change(event: Event) {
    let image_url = event.target as HTMLInputElement;
    if (!image_url) return;

    try {
      let url = new URL(image_url.value);
      let image = new Image();

      await new Promise<void>((resolve, reject) => {
        function load_function() {
          resolve();
          image.removeEventListener('load', load_function);
          image.removeEventListener('error', error_function);
        }
        function error_function() {
          reject();
          image.removeEventListener('load', load_function);
          image.removeEventListener('error', error_function);
        }

        image.addEventListener('load', load_function);
        image.addEventListener('error', error_function);

        image.src = url.toString();
      });

      image_url.classList.add('valid');
    } catch {
      image_url.classList.add('invalid');
    }
  }
}
