import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { Comunicacao } from "../models/comunicacao.model";
import { addBusinessDays, isBefore, isToday, isTomorrow } from "date-fns";
import { HttpClient } from "@angular/common/http";

interface ComunicaApiResponse {
  count: number;
  items: any[];
  message: string;
  status: string;
}

@Injectable({
  providedIn: "root",
})
export class ComunicacaoService {
  private mockData: Comunicacao[] = [];
  private API_URL =
    "https://comunicaapi.pje.jus.br/api/v1/comunicacao?numeroOab=21604&ufOab=RN&nomeAdvogado=RAULISSON%20BRUNO%20XAVIER%20DA%20SILVA";

  constructor(private http: HttpClient) {}

  getComunicacoes(): Observable<Comunicacao[]> {
    return this.http.get<ComunicaApiResponse>(this.API_URL).pipe(
      map((response) =>
        response.items.map((c) => {
          const dataDisponibilizacao = new Date(c.data_disponibilizacao);
          const prazoFinal = this.calcularPrazo(dataDisponibilizacao);
          const hoje = new Date();
          const status =
            isBefore(prazoFinal, hoje) && c.status !== "N"
              ? "Expirado"
              : c.status === "N"
              ? "Notificado"
              : "Pendente";

          const comunicacao: Comunicacao = {
            id: c.id,
            numeroProcesso: c.numero_processo,
            tipoComunicacao: c.tipoComunicacao,
            dataDisponibilizacao,
            prazoFinal,
            status,
            texto: c.texto,
            link: c.link,
            nomeOrgao: c.nomeOrgao,
          };

          return comunicacao;
        })
      )
    );
  }

  private calcularPrazo(data: Date): Date {
    return addBusinessDays(data, 15);
  }

  getPorStatus(
    status: "Pendente" | "Notificado" | "Expirado"
  ): Observable<Comunicacao[]> {
    return this.getComunicacoes().pipe(
      map((comunicacoes) => comunicacoes.filter((c) => c.status === status))
    );
  }

  getVencemHoje(): Observable<Comunicacao[]> {
    return this.getComunicacoes().pipe(
      map((comunicacoes) => comunicacoes.filter((c) => isToday(c.prazoFinal)))
    );
  }

  getVencemAmanha(): Observable<Comunicacao[]> {
    return this.getComunicacoes().pipe(
      map((comunicacoes) =>
        comunicacoes.filter((c) => isTomorrow(c.prazoFinal))
      )
    );
  }
}
