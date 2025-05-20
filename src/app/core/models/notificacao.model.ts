export interface Notificacao {
  id: string;
  idComunicacao: string;
  numeroProcesso: string;
  assunto: string;
  canal: 'Email' | 'WhatsApp' | 'SMS';
  dataEnvio: Date;
  status: 'Enviado' | 'Falha';
}