import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComunicacaoService } from "../../core/services/comunicacao.service";
import { Comunicacao } from "../../core/models/comunicacao.model";

// Import ng-zorro components
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzAlertModule } from "ng-zorro-antd/alert";

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
  ],
  templateUrl: "./prazos.component.html",
  styleUrl: "./prazos.component.css",
})
export class PrazosComponent implements OnInit {
  listOfData: Comunicacao[] = [];
  listOfDisplayData: Comunicacao[] = [];
  loading = true;
  searchText = "";

  constructor(private comunicacaoService: ComunicacaoService) {}

  ngOnInit(): void {
    this.loadComunication();
  }

  loadComunication() {
    this.loading = true;
    this.comunicacaoService.getComunicacoes().subscribe({
      next: (data) => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      },
      error: (err) => {
        console.error("A pesquisa do pje está passando por manutenção.:", err);
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
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "Pendente":
        return "warning";
      case "Notificado":
        return "success";
      case "Expirado":
        return "error";
      default:
        return "default";
    }
  }
}
