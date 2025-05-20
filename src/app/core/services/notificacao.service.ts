import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Notificacao } from '../models/notificacao.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private mockData: Notificacao[] = [
    {
      id: '1',
      idComunicacao: '2',
      numeroProcesso: '0987654-32.2023.8.26.0100',
      assunto: 'Despacho Inicial',
      canal: 'Email',
      dataEnvio: new Date(2023, 9, 12, 10, 30),
      status: 'Enviado'
    },
    {
      id: '2',
      idComunicacao: '5',
      numeroProcesso: '0456789-01.2023.8.26.0100',
      assunto: 'Recurso de Apelação',
      canal: 'WhatsApp',
      dataEnvio: new Date(2023, 9, 15, 14, 20),
      status: 'Enviado'
    },
    {
      id: '3',
      idComunicacao: '3',
      numeroProcesso: '0234567-89.2023.8.26.0100',
      assunto: 'Citação',
      canal: 'SMS',
      dataEnvio: new Date(2023, 9, 1, 9, 15),
      status: 'Falha'
    }
  ];

  constructor() { }

  getAll(): Observable<Notificacao[]> {
    return of(this.mockData).pipe(delay(800));
  }

  getById(id: string): Observable<Notificacao | undefined> {
    const notificacao = this.mockData.find(item => item.id === id);
    return of(notificacao).pipe(delay(500));
  }

  // Additional methods for the real API integration would be added here
}