import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private mockData: Usuario = {
    id: '1',
    nome: 'João Silva',
    cpfOab: 'OAB/SP 123456',
    email: 'advogado@exemplo.com',
    whatsapp: '(11) 99999-9999',
    canalPreferencial: 'Email'
  };

  constructor() { }

  getPerfil(): Observable<Usuario> {
    return of(this.mockData).pipe(delay(800));
  }

  atualizarPerfil(usuario: Usuario): Observable<Usuario> {
    this.mockData = { ...usuario };
    return of(this.mockData).pipe(delay(1000));
  }

  // Additional methods for the real API integration would be added here
}