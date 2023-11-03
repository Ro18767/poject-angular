import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/sevice/auth.service';

type ValidateInvalidResult = {
  status: 'invalid';
  reason: string;
};

type ValidateValidResult = {
  status: 'valid';
};

type ValidateResult = ValidateInvalidResult | ValidateValidResult;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  password = '';
  password_error_message = '';

  @ViewChild('password_input', { static: true })
  password_input!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.set_is_not_admin();
  }

  check_is_admin() {
    if (this.authService.is_admin()) {
      this.router.navigate(['/admin/product']);
    }
  }

  handle_input(event: Event) {
    let input = event.target as HTMLInputElement;
    if (!input) return;
    input.classList.remove('valid', 'invalid');
  }

  async submit_form() {
    let isAllValid = await this.validate_form();
    if (!isAllValid) return;

    this.authService.set_is_admin();

    this.check_is_admin();
  }

  async validate_form(): Promise<boolean> {
    let results = await Promise.all<ValidateResult>([this.validate_password()]);

    let [password_validate_result] = results;

    if (password_validate_result.status === 'invalid') {
      this.password_error_message = password_validate_result.reason;
      this.password_input.nativeElement.classList.add('invalid');
    } else {
      this.password_input.nativeElement.classList.add('valid');
    }

    let isAllValid = !results.find(({ status }) => status === 'invalid');
    return isAllValid;
  }

  async validate_password(): Promise<ValidateResult> {
    return this.validate(async () => {
      if (this.password !== 'admin') {
        throw 'incorrect password';
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
