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
  template: `
    <div class="login-container">
      <div class="login-content">
        <nz-card [nzBordered]="false" class="login-card">
          <div class="login-header">
            <h1 class="login-title">SpecJus</h1>
            <p class="login-subtitle">Sistema de Comunicações Judiciais</p>
          </div>

          <nz-alert
            *ngIf="error"
            nzType="error"
            [nzMessage]="error"
            nzShowIcon
            nzCloseable
            (nzOnClose)="clearError()"
          ></nz-alert>

          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="login-form"
          >
            <nz-form-item>
              <nz-form-control nzErrorTip="Por favor, informe seu e-mail">
                <nz-input-group nzPrefixIcon="user">
                  <input
                    type="email"
                    nz-input
                    formControlName="email"
                    placeholder="E-mail"
                  />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-control nzErrorTip="Por favor, informe sua senha">
                <nz-input-group nzPrefixIcon="lock">
                  <input
                    type="password"
                    nz-input
                    formControlName="password"
                    placeholder="Senha"
                  />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-control>
                <button
                  nz-button
                  nzType="primary"
                  nzBlock
                  [disabled]="loginForm.invalid || loading"
                >
                  <span *ngIf="!loading">Entrar</span>
                  <span *ngIf="loading">
                    <i nz-icon nzType="loading" nzTheme="outline"></i>
                    Processando...
                  </span>
                </button>
              </nz-form-control>
            </nz-form-item>

            <div class="login-info">
              <p>Teste com: advogadoexemplo.com / senha123</p>
            </div>
          </form>
        </nz-card>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f0f2f5;
      }

      .login-content {
        width: 100%;
        max-width: 400px;
        padding: 0 16px;
      }

      .login-card {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }

      .login-header {
        text-align: center;
        margin-bottom: 40px;
      }

      .login-title {
        margin-bottom: 8px;
        color: #001529;
        font-weight: 700;
        font-size: 33px;
      }

      .login-subtitle {
        color: #8c8c8c;
        font-size: 14px;
      }

      .login-form {
        margin-top: 24px;
      }

      .login-info {
        text-align: center;
        color: #8c8c8c;
        font-size: 12px;
        margin-top: 16px;
      }

      nz-alert {
        margin-bottom: 24px;
      }
    `,
  ],
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
