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

## 2. Arquitetura Unificada & Stack Tecnológica

O projeto adota uma arquitetura Next.js 16 direta e unificada na raiz, simplificando a árvore de pastas e eliminando qualquer duplicidade de configurações ou monorepo overhead:

```
styfla/
├── prisma/                     # Prisma ORM + Schema PostgreSQL + Scripts de Seed
│   ├── schema.prisma
│   └── seed.ts
├── public/                     # Assets estáticos de runtime (logos de marca e fotos de produtos)
│   ├── brand/
│   └── products/
├── src/                        # Código-fonte unificado da aplicação
│   ├── app/                    # Loja Virtual + Painel Admin (`/admin`) — Next.js 16 (Porta: 3030)
│   ├── components/             # Design System (`ui/`) e componentes de domínio (`home/`, `product/`, etc.)
│   ├── hooks/                  # Estado global (useCart) e utilitários de animação
│   ├── lib/                    # Singleton do Prisma (`db.ts`), autenticação (`adminAuth`, `customerAuth`) e utilitários
│   ├── services/               # Clientes de Frete (Melhor Envio) e Pagamento (Stripe/PIX)
│   ├── types/                  # Modelos TypeScript compartilhados (Cart, Checkout, Quotes, Melhor Envio)
│   └── middleware.ts           # Proteção de rotas e proxy
├── design-assets/              # Diretrizes de marca originais, logos em alta resolução e tipografia
└── docker/                     # Configurações de containerização e deploy em VPS
```

---

## 3. O que JÁ FOI FEITO (Changelog de Entregas)

### 🧱 A. Infraestrutura & Estrutura Unificada
- [x] Estrutura unificada e simplificada em um único projeto Next.js 16 direto na raiz (`src/`, `prisma/`, `public/`).
- [x] Eliminação de 100% das duplicações de arquivos de configuração, scripts e pacotes órfãos/vazios.
- [x] Loja e Admin rodam como um único app Next.js:
  - **App único:** `http://localhost:3030` (loja em `/`, admin em `/admin`)

### 🗄️ B. Modelagem de Dados (`prisma/` e `src/lib/db.ts`)
- [x] Schema completo do Prisma (`prisma/schema.prisma`) com as entidades:
  - `User`, `Address`, `Category`, `Product`, `ProductVariant` (tamanhos, SKU, estoque, peso e dimensões para cubagem), `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Coupon` e enum `IbjjfRank` (todas as faixas).
  - Singleton `PrismaClient` exportado em `src/lib/db.ts` para evitar conexões duplicadas no hot-reload.

### 🎨 C. Design System & Brand Assets (`src/components/ui` & `public/brand/`)
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
- [ ] **Script de Seed (`prisma/seed.ts`):** Popular o banco com as categorias oficiais, produtos reais, variantes de tamanho e usuários de teste.
- [ ] **Substituição dos Mocks por Queries Prisma:** Conectar as rotas Server Actions/APIs do Next.js diretamente ao banco de dados.

### 💳 Fase 2: Integrações Reais de Pagamento & Frete
- [x] **Gateway de Pagamento (Stripe & PIX):**
  - Integração do SDK oficial da Stripe (`src/services/payment/stripe.ts`) com geração de `PaymentIntent`, metadados completos e estornos.
  - Componente de formulário `@stripe/react-stripe-js` (`StripeCardSection.tsx`) no padrão visual monocromático STYFLA com `confirmCardPayment` e suporte a 3D Secure.
  - Endpoint de **Webhook** (`/api/webhooks/stripe`) com validação criptográfica HMAC, atualização de `Order.status = PAID` e baixa automática no estoque do PostgreSQL (`ProductVariant.stock`).
  - Fallback/Sandbox resiliente para ambiente de desenvolvimento local sem chaves ativas.
- [x] **API de Frete (Melhor Envio / Correios):**
  - Conectar cotação real de frete por cubagem em `src/services/shipping/melhorenvio.ts` e `/api/shipping/calculate`.
  - Ciclo de vida completo de logística: criação de envio no carrinho (`/api/v2/me/cart`), checkout de frete (`/me/shipment/checkout`), emissão de etiquetas (`/generate`), links de impressão de PLP/PDF (`/print`) e rastreamento em tempo real (`/tracking`).
  - Endpoint administrativo `/api/shipping/labels/generate` conectado ao painel `/admin/pedidos` com emissão 1-click de etiqueta e atualização de rastreio no PostgreSQL.

### 🔐 Fase 3: Autenticação & Permissões (RBAC)
- [x] **Login por senha única do `/admin`:** Cookie de sessão HMAC-assinado (`src/lib/adminAuth.ts`) e guard no layout de `admin/(dashboard)`, sem depender de porta/app separado.
- [ ] **Auth.js / NextAuth no Projeto:**
  - Login social (Google) e credenciais (E-mail/Senha com hash seguro) ligado ao model `User` do Prisma.
  - Controle de acesso baseado em papéis (`Role: CUSTOMER` vs `Role: ADMIN`) substituindo a senha única do admin.

### 🚀 Fase 4: Deploy & Infraestrutura em VPS
- [x] **Docker Multi-stage Build Standalone:** Imagem Docker standalone rápida e otimizada (`docker/Dockerfile`) servindo loja + admin no mesmo processo.
- [ ] **Configuração do Nginx Reverse Proxy:** Roteamento do domínio único (ex: `styfla.com.br`), com `/admin` servido pelo mesmo app.
- [ ] **SSL Automatizado:** Certbot / Let's Encrypt para renovação automática de HTTPS.
- [ ] **Rotina de Backup:** Script automatizado de dump diário do PostgreSQL enviado para bucket S3.

---

## 5. Diretrizes de Engenharia & Regras para Agentes de IA

Ao trabalhar neste repositório, **qualquer agente deve seguir rigorosamente as seguintes regras**:

1. **Padrões de Engenharia (SOLID & GRASP Obrigatórios):**
   - **Responsabilidade Única (SRP):** Nunca misture chamadas de API, regras de negócio e renderização no mesmo arquivo.
   - **Baixo Acoplamento & Alta Coesão:** Módulos de UI (`src/components/ui`) nunca devem depender diretamente de bancos ou gateways de pagamento. Use DTOs de `src/types`.
   - **Componentização Limpa:** Componentes não devem ultrapassar 250 linhas. Extraia subcomponentes e isole estado em hooks.
   - *Consulte o documento completo:* [`ENGINEERING_RULES.md`](./ENGINEERING_RULES.md).
2. **Monocromia Estrita:** As cores pilar são exclusivamente **Preto (`#000000`)** e **Branco (`#FFFFFF`)** em alto contraste. Cores adicionais são restritas às faixas oficiais da IBJJF.
3. **Tipografia:** Títulos principais devem usar a classe `.font-heading` ou a fonte `Legacy`. Textos de apoio devem usar a fonte sans-serif padrão (`Plus Jakarta Sans` / `Inter`).
4. **Porta de Execução:** Loja e Admin vivem no mesmo projeto unificado e sobem juntos na porta `3030` (`pnpm dev`). Não recrie um app/porta separado para o admin — novas telas administrativas entram como rotas sob `src/app/admin`.
5. **Compartilhamento de Código:** Não duplique lógica de negócio. Modelos de dados ficam em `src/types`, schema/consultas em `prisma/` e `src/lib/db.ts`, componentes visuais em `src/components/ui` e integrações externas em `src/services`.
6. **Validação de Build Obrigatória:** Sempre execute `pnpm build` antes de considerar uma tarefa de refatoração como concluída.
