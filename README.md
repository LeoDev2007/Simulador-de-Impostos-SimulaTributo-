Simulador-de-Impostos-SimulaTributo-

📝 Descrição

SimulaTributo é um simulador de impostos sofisticado baseado na web, desenvolvido com React e TypeScript. Este projeto oferece uma plataforma interativa e intuitiva para que os usuários possam calcular e estimar diversas obrigações fiscais com precisão. Aproveitando a robusta verificação de tipos do TypeScript e as capacidades dinâmicas de interface do React, o SimulaTributo proporciona uma experiência fluida para navegar por regulamentações financeiras complexas, tornando-se uma ferramenta essencial para planejamento tributário pessoal e profissional.

✨ Funcionalidades

```
🕸️ Aplicação Web
🛠️ Tecnologias Utilizadas
⚛️ React
📜 TypeScript
📦 Principais Dependências
@chakra-ui/react: ^3.34.0
@emotion/react: ^11.14.0
@emotion/styled: ^11.14.1
@tailwindcss/vite: ^4.2.2
framer-motion: ^12.38.0
jspdf: ^4.2.1
next-themes: ^0.4.6
react: ^19.2.4
react-dom: ^19.2.4
react-hook-form: ^7.71.2
react-icons: ^5.6.0
react-router-dom: ^7.13.1
recharts: ^3.8.1
tailwindcss: ^4.2.2
🚀 Comandos para Execução
dev: npm run dev
build: npm run build
lint: npm run lint
preview: npm run preview
📁 Estrutura do Projeto

```

```
.
├── eslint.config.js
├── index.html
├── package.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── RootLayout.tsx
│   ├── assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── Background.tsx
│   │   ├── CalculateForm.tsx
│   │   ├── DialogText.tsx
│   │   ├── Footer.tsx
│   │   ├── FormICMS.tsx
│   │   ├── FormIPVA.tsx
│   │   ├── Header.tsx
│   │   ├── IRform.tsx
│   │   ├── Property_RealEstate.tsx
│   │   └── exportPDFButton.tsx
│   ├── contexts
│   │   ├── ActiveTaxContext.tsx
│   │   ├── HistoryContext.tsx
│   │   ├── ICMSContext.tsx
│   │   ├── IPVAContext.tsx
│   │   └── IRContext.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── Charts.tsx
│   │   ├── History.tsx
│   │   └── Home.tsx
│   ├── routes
│   │   ├── router.tsx
│   │   ├── routes.ts
│   │   └── useTypedNavigate.ts
│   ├── styles
│   │   ├── CalculateForm.module.css
│   │   ├── Charts.module.css
│   │   ├── Dialog.module.css
│   │   ├── Footer.module.css
│   │   ├── Form.module.css
│   │   ├── Header.module.css
│   │   ├── History.module.css
│   │   └── Home.module.css
│   └── utils
│       ├── ICMS.ts
│       ├── INSS.ts
│       ├── IPVA.ts
│       ├── IR.ts
│       ├── Tax.ts
│       └── useExportPDF.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```
🛠️ Configuração de Desenvolvimento
Ambiente Node.js/JavaScript
Instale o Node.js (recomendado versão 18 ou superior)
Instale as dependências: npm install ou yarn install
Inicie o servidor de desenvolvimento: (verifique os scripts no package.json, por exemplo, npm run dev)
👥 Contribuindo

Contribuições são bem-vindas! Veja como ajudar:

Faça um fork do repositório
Clone o seu fork:
git clone https://github.com/LeoDev2007/Simulador-de-Impostos-SimulaTributo-.git
Crie uma nova branch:
git checkout -b feature/sua-feature
Faça commit das alterações:
git commit -am 'Adiciona nova funcionalidade'
Envie para sua branch:
git push origin feature/sua-feature
Abra um pull request

Certifique-se de que seu código segue os padrões do projeto e inclui testes quando aplicável.
