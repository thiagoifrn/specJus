import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comunicacao } from '../models/comunicacao.model';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {
  private mockData: Comunicacao[] = [
    {
      id: '1',
      numeroProcesso: '0123456-78.2023.8.26.0100',
      assunto: 'Intimação para Audiência',
      dataDisponibilizacao: new Date(2023, 9, 15),
      prazoFinal: new Date(2023, 9, 25),
      status: 'Pendente'
    },
    {
      id: '2',
      numeroProcesso: '0987654-32.2023.8.26.0100',
      assunto: 'Despacho Inicial',
      dataDisponibilizacao: new Date(2023, 9, 10),
      prazoFinal: new Date(2023, 9, 20),
      status: 'Notificado'
    },
    {
      id: '3',
      numeroProcesso: '0234567-89.2023.8.26.0100',
      assunto: 'Citação',
      dataDisponibilizacao: new Date(2023, 8, 20),
      prazoFinal: new Date(2023, 9, 5),
      status: 'Expirado'
    },
    {
      id: '4',
      numeroProcesso: '0345678-90.2023.8.26.0100',
      assunto: 'Sentença',
      dataDisponibilizacao: new Date(2023, 9, 18),
      prazoFinal: new Date(2023, 10, 2),
      status: 'Pendente'
    },
    {
      id: '5',
      numeroProcesso: '0456789-01.2023.8.26.0100',
      assunto: 'Recurso de Apelação',
      dataDisponibilizacao: new Date(2023, 9, 12),
      prazoFinal: new Date(2023, 9, 27),
      status: 'Notificado'
    }
  ];

  constructor() { }

  getAll(): Observable<Comunicacao[]> {
    return of(this.mockData).pipe(delay(800));
  }

  getById(id: string): Observable<Comunicacao | undefined> {
    const comunicacao = this.mockData.find(item => item.id === id);
    return of(comunicacao).pipe(delay(500));
  }

  // Additional methods for the real API integration would be added here
}