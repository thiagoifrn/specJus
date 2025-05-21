import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NotificacaoService } from "../../core/services/notificacao.service";
import { Notificacao } from "../../core/models/notificacao.model";

// Import ng-zorro components
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";

type Canal = "Email" | "WhatsApp" | "SMS";

@Component({
  selector: "app-notificacoes",
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
    NzPageHeaderModule,
  ],
  templateUrl: "./notificacoes.component.html",
  styleUrls: ["./notificacoes.component.css"],
})
export class NotificacoesComponent implements OnInit {
  listOfData: Notificacao[] = [];
  loading = true;

  constructor(private notificacaoService: NotificacaoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    console.log("chamou Api notificações");
    this.loading = true;
    this.notificacaoService.getAll().subscribe({
      next: (data) => {
        this.listOfData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar notificações:", err);
        this.loading = false;
      },
    });
  }

  getCanalColor(canal: Canal): string {
    const color = {
      Email: "blue",
      WhatsApp: "green",
      SMS: "purple",
    };
    return color[canal] || "default";
  }
}
