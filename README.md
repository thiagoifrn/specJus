# specJus
---

````markdown
# ⚖️ SpecJus

Sistema de notificações judiciais para advogados, que auxilia no acompanhamento de **prazos processuais** via uma interface web moderna e responsiva. O objetivo é evitar a perda de prazos importantes com alertas visuais e possibilidade futura de envio por WhatsApp, SMS ou e-mail.

![SpecJus Preview](./screenshot.png)

---

## 🚀 Tecnologias Utilizadas

- [Angular 17+](https://angular.io/)
- [NG-ZORRO Ant Design](https://ng.ant.design/docs/introduce/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Standalone Components](https://angular.io/guide/standalone-components)
- [i18n com locale pt-BR](https://ng.ant.design/components/i18n/en)
- [CSS Modules]

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/specjus.git
cd specjus
````

2. Instale as dependências:

```bash
npm install
```

3. Adicione os estilos globais do NG-ZORRO ao `angular.json` (se ainda não estiver):

```json
"styles": [
  "node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
  "src/styles.css"
]
```

4. Inicie o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve
```

---

## 🧠 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                 # Serviços e configurações globais
│   ├── features/             # Módulos funcionais como Prazos, Notificações etc.
│   ├── shared/               # Componentes reutilizáveis, pipes, icons, temas
│   ├── app.routes.ts         # Rotas do projeto
│   ├── app.config.ts         # Configuração do Angular com standalone
├── assets/                   # Imagens, ícones, etc
├── environments/             # Variáveis de ambiente
└── styles.css                # Estilos globais
```

---

## 🔧 Configuração Standalone (`app.config.ts`)

```ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: NZ_I18N, useValue: pt_BR },
  ]
};
```

---

## 🎯 Funcionalidades

* ✅ Visualização de prazos processuais com destaque de status:

  * 🔴 Expirado
  * 🟡 Pendente
  * 🟢 Notificado
* ✅ Filtros por número de processo
* ✅ Atualização manual dos dados
* 🚧 (em desenvolvimento) Integração com API do Comunica (PJe)
* 🚧 Notificações via e-mail, WhatsApp, SMS
* 🔒 Autenticação de usuários (futuro)

---

## 🖼️ Design

* Interface baseada no [ng-zorro-antd](https://ng.ant.design/) com layout clean e responsivo.
* Componentes reutilizáveis com foco em escalabilidade.
* Ícones SVG otimizados via `@ant-design/icons-angular`.

---

## 📅 Roadmap

* [x] Listagem de prazos
* [x] Layout de dashboard com menu lateral
* [x] Internacionalização pt-BR
* [ ] Integração com API do Comunica (PJe)
* [ ] Sistema de notificações (e-mail/WhatsApp/SMS)
* [ ] Painel administrativo para gestão de usuários
* [ ] Lançamento como SaaS com cobrança por assinatura

---

## 🛠️ Scripts úteis

```bash
# Build para produção
npm run build

# Lint do projeto
ng lint

# Testes (se configurado com Jest ou Karma)
npm run test
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 👨‍⚖️ Sobre

**SpecJus** é uma solução pensada para facilitar o dia a dia de advogados e escritórios de advocacia, reduzindo a chance de perda de prazos judiciais e melhorando o acompanhamento de comunicações eletrônicas via sistemas como o PJe.

Desenvolvido por Thiago Pereira de Souza.
