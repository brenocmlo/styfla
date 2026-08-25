# 🥋 STYFLA — Guia Universal de Agentes & Engenharia

> **Documento de Contexto, Estado Atual e Diretrizes de Desenvolvimento para Agentes de IA e Desenvolvedores.**  
> **Última Atualização:** Agosto de 2026 &bull; **Versão:** 1.0.0  
> **Slogan Oficial:** *"DECIDA CONTINUAR"*

---

## 1. Visão do Produto e Identidade da Marca

* **Nicho de Mercado:** E-commerce especializado em **Rash Guards e vestuário técnico de No-Gi Jiu-Jitsu**.
* **Proposta de Valor:** Alta compressão muscular, tecido premium (85% Poliamida / 15% Elastano, 260 g/m² anti-transparência), proteção UV50+, fita de silicone antiderrapante na cintura e conformidade estrita com o regulamento de cores da **IBJJF / CBJJ**.
* **Identidade Visual:** 
  * **Cores Pilar:** **Preto (`#000000`)** e **Branco (`#FFFFFF`)** em alto contraste.
  * **Tipografia de Títulos e Display:** **Legacy** (estilo athletic block / angular display).
  * **Tipografia de UI e Leitura:** `Plus Jakarta Sans` / `Inter` (sans-serif para máxima legibilidade mobile).
  * **Símbolo Oficial:** Ícone do Raio circular (*Flash Symbol*).
  * **Linha de Assinatura:** Colab exclusiva com o atleta *João Flashboy*.

---

## 2. Arquitetura do Monorepo & Stack Tecnológica

O projeto utiliza **Turborepo** gerenciado com **pnpm v11 (Workspaces)**:

```
styfla/
├── apps/
│   └── store/                  # Loja Virtual + Painel Admin (`/admin`) — Next.js 16 (Porta: 3030)
│
├── packages/
│   ├── database/               # Prisma ORM + Schema PostgreSQL + Client Singleton
│   ├── ui/                     # Design System (Button, Badge, CartDrawer, SizeGuideModal)
│   ├── services/               # Clientes de Frete (Melhor Envio/Correios) e Pagamento (PIX/Gateways)
│   └── types/                  # Modelos TypeScript compartilhados (Cart, Checkout, Quotes)
│
├── design-assets/              # Diretrizes de marca, logos em alta resolução e tipografia
└── docker/                     # Configurações de containerização e deploy em VPS
```

---

## 3. O que JÁ FOI FEITO (Changelog de Entregas)

### 🧱 A. Infraestrutura e Monorepo
- [x] Configuração do Turborepo com pipelines de cache em `turbo.json`.
- [x] Resolução de permissões de scripts de build para pnpm v11 (`allowBuilds` no `pnpm-workspace.yaml`).
- [x] Loja e Admin rodam como um único app Next.js (`apps/store`), evitando a complexidade de gerenciar duas portas/dois deploys:
  - **App único:** `http://localhost:3030` (loja em `/`, admin em `/admin`)

### 🗄️ B. Modelagem de Dados (`packages/database`)
- [x] Schema completo do Prisma (`schema.prisma`) com as entidades:
  - `User`, `Address`, `Category`, `Product`, `ProductVariant` (tamanhos, SKU, estoque, peso e dimensões para cubagem), `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Coupon` e enum `IbjjfRank` (todas as faixas).
  - Singleton `PrismaClient` exportado para evitar conexões duplicadas no hot-reload.

### 🎨 C. Design System & Brand Assets (`packages/ui` & `design-assets/`)
- [x] Tokens visuais estritos em **Preto e Branco**.
- [x] Configuração da fonte oficial **Legacy** em `@font-face` com fallbacks.
- [x] Componentes compartilhados construídos:
  - `Button`: Variantes `primary` (fundo branco, texto preto), `dark`, `outline`, `secondary`, `ghost` e `pix`.
  - `Badge`: Variações monocromáticas e graduações oficiais da IBJJF (Faixas Branca, Azul, Roxa, Marrom e Preta).
  - `SizeGuideModal`: Guia de medidas interativo com matriz **Altura (m) $\times$ Peso (kg)** e orientações de conformidade da IBJJF.
  - `CartDrawer`: Gaveta lateral da sacola com régua de **Frete Grátis** (R$ 299,00) e desconto de 10% no PIX.
- [x] Extração e organização de todos os assets PNG e diretrizes em `design-assets/` e `public/brand/`:
  - `logo.png`, `logo-with-slogan.png`, `symbol.png` (raio), `joao-flashboy.png` e favicons.

### 🛒 D. Loja Virtual / Storefront (`apps/store`)
- [x] **Home / Vitrine:** Hero editorial No-Gi, barra de benefícios, catálogo com filtros por faixa e seção de assinatura *João Flashboy*.
- [x] **Página de Produto (PDP — `/produto/[slug]`):** Galeria de imagens, seletor de tamanho com contador de estoque, botão do provador virtual, simulador de frete por CEP e compra expressa 1-Click PIX.
- [x] **Estado Global do Carrinho (`useCart`):** Implementado com Zustand e persistência automática em `localStorage`.
- [x] **Checkout Transparente (`/checkout`):** Formulário de dados do atleta com validação de CPF, endereço, escolha de frete, pagamento via PIX (QR Code e Copia-e-Cola imediatos) e cartão de crédito.
- [x] **Área do Cliente (`/conta`):** Abas interativas de *Meus Pedidos* com timeline de rastreamento e código dos Correios, *Endereços de Entrega* (com definição de padrão), *Dados do Atleta* (com graduação de faixa) e *Central de Trocas (CDC 7 dias)*.

### 📊 E. Painel do Administrador (`apps/store/src/app/admin`)
- [x] **Login (`/admin/login`):** Autenticação por senha (`ADMIN_PASSWORD`) com cookie de sessão assinado (HMAC, `ADMIN_SESSION_SECRET`) protegendo todas as rotas de `/admin/*` via layout guard server-side.
- [x] **Dashboard de Performance (`/admin`):** Cards de faturamento mensal, total de pedidos, ticket médio, taxa de conversão PIX ($81.4\%$), últimos pedidos e alertas de estoque crítico.
- [x] **Catálogo de Produtos (`/admin/produtos`):** Listagem com busca e modal de cadastro de novas rash guards com grade de estoque por tamanho (`P`, `M`, `G`, `GG`).
- [x] **Gestão de Pedidos & Expedição (`/admin/pedidos`):** Filtros por status de pagamento e envio, modal de despacho com inserção de rastreio e impressão de *Picking List*.
- [x] **Controle de Estoque por SKU (`/admin/estoque`):** Tabela com ajustes inline rápidos (`+1` / `-1`), identificação de saldo crítico e prevenção de rupturas.
- [x] **Gestão de Cupons (`/admin/cupons`):** Criação e gerenciamento de cupons de porcentagem, valor fixo e frete grátis.

---

## 4. O que VAMOS FAZER a Seguir (Roadmap & Backlog)

### 🎯 Fase 1: Persistência & Banco de Dados Real
- [ ] **Docker Compose para PostgreSQL:** Criar arquivo `docker/docker-compose.yml` para rodar o banco localmente e em produção.
- [ ] **Script de Seed (`packages/database/src/seed.ts`):** Popular o banco com as categorias oficiais, produtos reais, variantes de tamanho e usuários de teste.
- [ ] **Substituição dos Mocks por Queries Prisma:** Conectar as rotas Server Actions/APIs do Next.js diretamente ao banco de dados.

### 💳 Fase 2: Integrações Reais de Pagamento & Frete
- [ ] **Gateway de Pagamento (Mercado Pago / Stripe / Pagar.me):**
  - Implementar geração real de cobrança PIX via API e tokenização client-side de cartão de crédito.
  - Implementar endpoint de **Webhook** (`/api/webhooks/payment`) para atualizar automaticamente o status do pedido para `PAID` e dar baixa no estoque.
- [ ] **API de Frete (Melhor Envio / Correios):**
  - Conectar cotação real de frete por cubagem em `packages/services/src/shipping.ts`.
  - Implementar emissão automática de etiquetas de postagem no painel Admin.

### 🔐 Fase 3: Autenticação & Permissões (RBAC)
- [x] **Login por senha única do `/admin`:** Cookie de sessão HMAC-assinado (`lib/adminAuth.ts`) e guard no layout de `admin/(dashboard)`, sem depender de porta/app separado.
- [ ] **Auth.js / NextAuth no Monorepo:**
  - Login social (Google) e credenciais (E-mail/Senha com hash seguro) ligado ao model `User` do Prisma.
  - Controle de acesso baseado em papéis (`Role: CUSTOMER` vs `Role: ADMIN`) substituindo a senha única do admin.

### 🚀 Fase 4: Deploy & Infraestrutura em VPS
- [ ] **Docker Multi-stage Build:** Otimizar imagem Docker única para `apps/store` (loja + admin no mesmo processo).
- [ ] **Configuração do Nginx Reverse Proxy:** Roteamento do domínio único (ex: `styfla.com.br`), com `/admin` servido pelo mesmo app.
- [ ] **SSL Automatizado:** Certbot / Let's Encrypt para renovação automática de HTTPS.
- [ ] **Rotina de Backup:** Script automatizado de dump diário do PostgreSQL enviado para bucket S3.

---

## 5. Diretrizes de Engenharia & Regras para Agentes de IA

Ao trabalhar neste repositório, **qualquer agente deve seguir rigorosamente as seguintes regras**:

1. **Padrões de Engenharia (SOLID & GRASP Obrigatórios):**
   - **Responsabilidade Única (SRP):** Nunca misture chamadas de API, regras de negócio e renderização no mesmo arquivo.
   - **Baixo Acoplamento & Alta Coesão:** Módulos de UI (`packages/ui`) nunca devem depender diretamente de bancos ou gateways de pagamento. Use DTOs de `packages/types`.
   - **Componentização Limpa:** Componentes não devem ultrapassar 250 linhas. Extraia subcomponentes e isole estado em hooks.
   - *Consulte o documento completo:* [`ENGINEERING_RULES.md`](./ENGINEERING_RULES.md).
2. **Monocromia Estrita:** As cores pilar são exclusivamente **Preto (`#000000`)** e **Branco (`#FFFFFF`)** em alto contraste. Cores adicionais são restritas às faixas oficiais da IBJJF.
3. **Tipografia:** Títulos principais devem usar a classe `.font-heading` ou a fonte `Legacy`. Textos de apoio devem usar a fonte sans-serif padrão (`Plus Jakarta Sans` / `Inter`).
4. **Porta de Execução:** Loja e Admin vivem no mesmo app (`apps/store`) e sobem juntos na porta `3030`. Não recrie um app/porta separado para o admin — novas telas administrativas entram como rotas sob `apps/store/src/app/admin`.
5. **Compartilhamento de Código:** Não duplique lógica de negócio. Modelos de dados ficam em `packages/types`, schema/consultas em `packages/database`, componentes visuais em `packages/ui` e integrações externas em `packages/services`.
6. **Validação de Build Obrigatória:** Sempre execute `pnpm build` antes de considerar uma tarefa de refatoração como concluída.
