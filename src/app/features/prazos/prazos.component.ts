import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComunicacaoService } from '../../core/services/comunicacao.service';
import { Comunicacao } from '../../core/models/comunicacao.model';

// Import ng-zorro components
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-prazos',
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
    NzInputModule,
    NzPageHeaderModule,
    NzAlertModule
  ],
  template: `
    <nz-page-header class="page-header"
      nzTitle="Prazos Processuais"
      nzSubtitle="Acompanhe todas as suas comunicações judiciais">
      <nz-page-header-extra>
        <button nz-button nzType="primary">
          <i nz-icon nzType="sync"></i>
          Atualizar
        </button>
      </nz-page-header-extra>
    </nz-page-header>

    <div class="search-box">
      <nz-input-group [nzSuffix]="suffixIconSearch">
        <input type="text" nz-input placeholder="Buscar por número de processo ou assunto" [(ngModel)]="searchText" (ngModelChange)="search()" />
      </nz-input-group>
      <ng-template #suffixIconSearch>
        <i nz-icon nzType="search"></i>
      </ng-template>
    </div>

    <nz-spin [nzSpinning]="loading">
      <nz-table
        #basicTable
        [nzData]="listOfDisplayData"
        [nzShowPagination]="true"
        [nzPageSize]="10"
        nzBordered>
        <thead>
          <tr>
            <th nzWidth="220px">Número do Processo</th>
            <th>Assunto</th>
            <th nzWidth="130px">Data de Disponibilização</th>
            <th nzWidth="130px">Prazo Final</th>
            <th nzWidth="100px">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of basicTable.data">
            <td>{{ data.numeroProcesso }}</td>
            <td>{{ data.assunto }}</td>
            <td>{{ data.dataDisponibilizacao | date:'dd/MM/yyyy' }}</td>
            <td>{{ data.prazoFinal | date:'dd/MM/yyyy' }}</td>
            <td>
              <nz-tag
                [nzColor]="getStatusColor(data.status)"
                [ngClass]="'status-' + data.status.toLowerCase()">
                {{ data.status }}
              </nz-tag>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-spin>
  `,
  styles: [`
    .search-box {
      margin-bottom: 16px;
    }
    
    .status-pendente {
      font-weight: 500;
    }
    
    .status-notificado {
      font-weight: 500;
    }
    
    .status-expirado {
      font-weight: 500;
    }
  `]
})
export class PrazosComponent implements OnInit {
  listOfData: Comunicacao[] = [];
  listOfDisplayData: Comunicacao[] = [];
  loading = true;
  searchText = '';

  constructor(private comunicacaoService: ComunicacaoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.comunicacaoService.getAll().subscribe({
      next: (data) => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar comunicações:', err);
        this.loading = false;
      }
    });
  }

  search(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.listOfDisplayData = this.listOfData.filter(
      data => data.numeroProcesso.toLowerCase().includes(searchTerm) ||
              data.assunto.toLowerCase().includes(searchTerm)
    );
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'Pendente': return 'warning';
      case 'Notificado': return 'success';
      case 'Expirado': return 'error';
      default: return 'default';
    }
  }
}