export interface Comunicacao {
  id: number;
  numeroProcesso: string;
  tipoComunicacao: string;
  dataDisponibilizacao: Date;
  prazoFinal: Date;
  status: "Pendente" | "Notificado" | "Expirado";
  texto: string;
  link: string;
  nomeOrgao: string;
}
