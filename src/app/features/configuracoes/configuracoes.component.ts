import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UsuarioService } from "../../core/services/usuario.service";
import { Usuario } from "../../core/models/usuario.model";
import { finalize } from "rxjs/operators";

// Import ng-zorro components
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzDividerModule } from "ng-zorro-antd/divider";

@Component({
  selector: "app-configuracoes",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    NzAlertModule,
    NzPageHeaderModule,
    NzDividerModule,
  ],
  templateUrl: "./configuracoes.component.html",
  styleUrls: ["./configuracoes.component.css"],
})
export class ConfiguracoesComponent implements OnInit {
  configForm!: FormGroup;
  loading = false;
  saving = false;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  initForm(): void {
    this.configForm = this.fb.group({
      nome: ["", [Validators.required]],
      cpfOab: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      whatsapp: ["", [Validators.required]],
      canalPreferencial: ["Email", [Validators.required]],
    });
  }

  loadUserData(): void {
    console.log("chamou Api Configurações");

    this.loading = true;
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => {
        this.configForm.patchValue(usuario);
        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar dados do usuário:", err);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.configForm.invalid) {
      this.markFormGroupTouched(this.configForm);
      return;
    }

    this.saving = true;
    this.successMessage = null;

    const userData: Usuario = {
      id: "1", // Assumindo que estamos atualizando o usuário com ID 1
      ...this.configForm.value,
    };

    this.usuarioService
      .atualizarPerfil(userData)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.successMessage = "Configurações atualizadas com sucesso!";
          setTimeout(() => (this.successMessage = null), 5000);
        },
        error: (err) => {
          console.error("Erro ao atualizar dados:", err);
        },
      });
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
