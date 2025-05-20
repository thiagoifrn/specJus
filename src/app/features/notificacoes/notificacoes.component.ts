import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { Notificacao } from '../../core/models/notificacao.model';

// Import ng-zorro components
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzTagModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    NzEmptyModule,
    NzPageHeaderModule
  ],
  template: `
    <nz-page-header class="page-header"
      nzTitle="Histórico de Notificações"
      nzSubtitle="Acompanhe todas as notificações enviadas">
    </nz-page-header>

    <nz-spin [nzSpinning]="loading">
      <nz-table
        #basicTable
        [nzData]="listOfData"
        nzBordered>
        <thead>
          <tr>
            <th nzWidth="220px">Número do Processo</th>
            <th>Assunto</th>
            <th nzWidth="120px">Canal</th>
            <th nzWidth="160px">Data de Envio</th>
            <th nzWidth="100px">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of basicTable.data">
            <td>{{ data.numeroProcesso }}</td>
            <td>{{ data.assunto }}</td>
            <td>
              <nz-tag [nzColor]="getCanalColor(data.canal)">
                {{ data.canal }}
              </nz-tag>
            </td>
            <td>{{ data.dataEnvio | date:'dd/MM/yyyy HH:mm' }}</td>
            <td>
              <nz-tag [nzColor]="data.status === 'Enviado' ? 'success' : 'error'">
                {{ data.status }}
              </nz-tag>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-spin>
  `,
  styles: [``]
})
export class NotificacoesComponent implements OnInit {
  listOfData: Notificacao[] = [];
  loading = true;

  constructor(private notificacaoService: NotificacaoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.notificacaoService.getAll().subscribe({
      next: (data) => {
        this.listOfData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar notificações:', err);
        this.loading = false;
      }
    });
  }

  getCanalColor(canal: string): string {
    switch(canal) {
      case 'Email': return 'blue';
      case 'WhatsApp': return 'green';
      case 'SMS': return 'purple';
      default: return 'default';
    }
  }
}