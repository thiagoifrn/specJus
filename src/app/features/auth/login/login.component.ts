import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { finalize } from "rxjs/operators";
import { CommonModule } from "@angular/common";

// Import ng-zorro components
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzSpinModule } from "ng-zorro-antd/spin";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzAlertModule,
    NzIconModule,
    NzLayoutModule,
    NzSpinModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.loginForm.value;

    this.authService
      .login(email, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (success) => {
          if (success) {
            const returnUrl =
              this.route.snapshot.queryParams["returnUrl"] || "/";
            this.router.navigateByUrl(returnUrl);
          } else {
            this.error = "E-mail ou senha incorretos.";
          }
        },
        error: (err) => {
          this.error = "Ocorreu um erro. Tente novamente.";
          console.error(err);
        },
      });
  }

  clearError(): void {
    this.error = null;
  }
}
