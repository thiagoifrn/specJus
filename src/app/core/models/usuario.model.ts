export interface Usuario {
  id: string;
  nome: string;
  cpfOab: string;
  email: string;
  whatsapp: string;
  canalPreferencial: 'Email' | 'WhatsApp' | 'SMS';
}