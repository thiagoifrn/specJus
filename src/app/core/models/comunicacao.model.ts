export interface Comunicacao {
  id: string;
  numeroProcesso: string;
  assunto: string;
  dataDisponibilizacao: Date;
  prazoFinal: Date;
  status: 'Pendente' | 'Notificado' | 'Expirado';
}