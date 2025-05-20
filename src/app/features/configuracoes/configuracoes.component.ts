import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario.model';
import { finalize } from 'rxjs/operators';

// Import ng-zorro components
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-configuracoes',
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
    NzDividerModule
  ],
  template: `
    <nz-page-header class="page-header"
      nzTitle="Configurações"
      nzSubtitle="Configurações de perfil e notificações">
    </nz-page-header>

    <nz-card [nzBordered]="false">
      <h3>Informações Pessoais</h3>
      <nz-divider></nz-divider>
      
      <nz-spin [nzSpinning]="loading">
        <form [formGroup]="configForm" (ngSubmit)="onSubmit()">
          <div *ngIf="successMessage" class="message-container">
            <nz-alert nzType="success" [nzMessage]="successMessage" nzShowIcon></nz-alert>
          </div>
          
          <div nz-row [nzGutter]="24">
            <div nz-col [nzSpan]="24" [nzMd]="12">
              <nz-form-item>
                <nz-form-label nzRequired>Nome Completo</nz-form-label>
                <nz-form-control nzErrorTip="Por favor, informe seu nome completo">
                  <input nz-input formControlName="nome" placeholder="Seu nome completo" />
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div nz-col [nzSpan]="24" [nzMd]="12">
              <nz-form-item>
                <nz-form-label nzRequired>CPF ou OAB</nz-form-label>
                <nz-form-control nzErrorTip="Por favor, informe seu CPF ou OAB">
                  <input nz-input formControlName="cpfOab" placeholder="CPF ou número OAB" />
                </nz-form-control>
              </nz-form-item>
            </div>
          </div>
          
          <div nz-row [nzGutter]="24">
            <div nz-col [nzSpan]="24" [nzMd]="12">
              <nz-form-item>
                <nz-form-label nzRequired>E-mail</nz-form-label>
                <nz-form-control nzErrorTip="Por favor, informe um e-mail válido">
                  <input nz-input formControlName="email" placeholder="seu@email.com" />
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div nz-col [nzSpan]="24" [nzMd]="12">
              <nz-form-item>
                <nz-form-label nzRequired>WhatsApp</nz-form-label>
                <nz-form-control nzErrorTip="Por favor, informe seu número de WhatsApp">
                  <input nz-input formControlName="whatsapp" placeholder="(DDD) 99999-9999" />
                </nz-form-control>
              </nz-form-item>
            </div>
          </div>

          <h3>Preferências de Notificação</h3>
          <nz-divider></nz-divider>
          
          <div nz-row [nzGutter]="24">
            <div nz-col [nzSpan]="24">
              <nz-form-item>
                <nz-form-label nzRequired>Canal Preferencial</nz-form-label>
                <nz-form-control nzErrorTip="Por favor, selecione o canal preferencial">
                  <nz-select formControlName="canalPreferencial" nzPlaceHolder="Selecione o canal preferencial">
                    <nz-option nzValue="Email" nzLabel="E-mail"></nz-option>
                    <nz-option nzValue="WhatsApp" nzLabel="WhatsApp"></nz-option>
                    <nz-option nzValue="SMS" nzLabel="SMS"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </div>
          </div>

          <div nz-row>
            <div nz-col [nzSpan]="24" style="text-align: right;">
              <button nz-button nzType="primary" [disabled]="configForm.invalid || saving">
                <i *ngIf="saving" nz-icon nzType="loading"></i>
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>
        </form>
      </nz-spin>
    </nz-card>
  `,
  styles: [`
    .message-container {
      margin-bottom: 24px;
    }
    
    h3 {
      font-weight: 500;
      margin-bottom: 0;
    }
    
    nz-divider {
      margin: 16px 0 24px;
    }
  `]
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
      nome: ['', [Validators.required]],
      cpfOab: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required]],
      canalPreferencial: ['Email', [Validators.required]]
    });
  }

  loadUserData(): void {
    this.loading = true;
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => {
        this.configForm.patchValue(usuario);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
        this.loading = false;
      }
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
      id: '1', // Assumindo que estamos atualizando o usuário com ID 1
      ...this.configForm.value
    };

    this.usuarioService.atualizarPerfil(userData)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.successMessage = 'Configurações atualizadas com sucesso!';
          setTimeout(() => this.successMessage = null, 5000);
        },
        error: (err) => {
          console.error('Erro ao atualizar dados:', err);
        }
      });
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}