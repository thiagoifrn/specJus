import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComunicacaoService } from "../../core/services/comunicacao.service";
import { Comunicacao } from "../../core/models/comunicacao.model";

import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzPaginationModule } from "ng-zorro-antd/pagination";

type Status = "Pendente" | "Notificado" | "Expirado";

@Component({
  selector: "app-prazos",
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
    NzAlertModule,
    NzPaginationModule,
  ],
  templateUrl: "./prazos.component.html",
  styleUrl: "./prazos.component.css",
})
export class PrazosComponent implements OnInit {
  listOfData: Comunicacao[] = [];
  listOfDisplayData: Comunicacao[] = [];
  pagedData: Comunicacao[] = [];

  loading = true;
  searchText = "";

  pageIndex = 1;
  pageSize = 5;

  constructor(private comunicacaoService: ComunicacaoService) {}

  ngOnInit(): void {
    this.loadComunication();
  }

  loadComunication() {
    this.loading = true;
    this.comunicacaoService.getComunicacoes().subscribe({
      next: (data) => {
        this.listOfData = data;
        this.search(); // aplica filtro e paginação inicial
        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar comunicações:", err);
        this.loading = false;
      },
    });
  }

  search(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.listOfDisplayData = this.listOfData.filter(
      (data) =>
        data.numeroProcesso.toLowerCase().includes(searchTerm) ||
        data.tipoComunicacao.toLowerCase().includes(searchTerm)
    );
    this.pageIndex = 1;
    this.updatePagedData();
  }

  onPageChange(index: number): void {
    this.pageIndex = index;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.listOfDisplayData.slice(start, end);
  }

  getStatusColor(status: Status): string {
    const color = {
      Pendente: "warning",
      Notificado: "success",
      Expirado: "error",
    };
    return color[status] || "default";
  }
}
