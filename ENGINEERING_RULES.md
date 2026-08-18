# 📐 STYFLA — Diretrizes de Engenharia de Software, SOLID & GRASP

> **Padrões de Arquitetura, Componentização, Baixo Acoplamento e Alta Coesão para o Monorepo Styfla.**  
> **Status:** Obrigatório para todos os Desenvolvedores e Agentes de IA.

---

## 1. Princípios SOLID Aplicados ao E-Commerce

Todos os módulos, componentes React, hooks e serviços devem seguir estritamente os 5 princípios do **SOLID**:

```
+-----------------------------------------------------------------------------------+
|                                  SOLID NO STYFLA                                  |
+-----------------------------------------------------------------------------------+
|  [S] Single Responsibility  --> Componentes e serviços com UM único propósito.  |
|  [O] Open / Closed          --> Extensível via composição, props e interfaces.   |
|  [L] Liskov Substitution    --> Subtipos e wrappers respeitam o contrato base.   |
|  [I] Interface Segregation  --> Interfaces pequenas, focadas e desacopladas.     |
|  [D] Dependency Inversion   --> Código de domínio depende de abstrações/ports.    |
+-----------------------------------------------------------------------------------+
```

### 1.1 S — Single Responsibility Principle (Responsabilidade Única)
* **Regra:** Um arquivo, componente ou função deve ter **apenas um motivo para mudar**.
* **Frontend:** Não misture lógica de requisição HTTP, validação de formulário e renderização visual no mesmo componente.
  * ❌ *Incorreto:* Um `ProductCard.tsx` que busca dados no banco, faz cálculo de parcelamento, valida estoque e renderiza o HTML.
  * ✅ *Correto:* `ProductCard.tsx` apenas renderiza a UI recebendo dados via props; a lógica de cálculo fica em `@styfla/types` ou `@styfla/services`.
* **Backend / Services:** A camada de banco (`packages/database`) apenas lida com persistência; a camada de serviços (`packages/services`) lida com regras de negócio e integrações de APIs.

### 1.2 O — Open/Closed Principle (Aberto para Extensão, Fechado para Modificação)
* **Regra:** Entidades de software devem ser abertas para extensão, mas fechadas para modificação.
* **Aplicação no React:**
  * Utilize **Composição de Componentes**, `children`, slots e variantes tipadas (ex: `variant="primary" | "outline"`).
  * Para adicionar um novo método de pagamento (ex: Boleto ou Apple Pay), crie uma nova classe/estratégia que implemente `PaymentProvider` em vez de adicionar múltiplos `if/else` dentro do serviço do Mercado Pago.

### 1.3 L — Liskov Substitution Principle (Substituição de Liskov)
* **Regra:** Objetos de um tipo base devem poder ser substituídos por objetos de seus subtipos sem quebrar a aplicação.
* **Aplicação no Design System (`packages/ui`):**
  * Todo componente customizado que encapsula um elemento HTML nativo (ex: `ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`) deve repassar todas as propriedades HTML padrão (`type`, `disabled`, `onClick`, `aria-*`, `ref`) sem comportamentos colaterais inesperados.

### 1.4 I — Interface Segregation Principle (Segregação de Interfaces)
* **Regra:** Clientes não devem ser forçados a depender de interfaces ou tipos que não utilizam.
* **Aplicação no TypeScript (`packages/types`):**
  * Evite "Mega Interfaces" (ex: um `Product` gigantesco com 60 propriedades opcionais sendo passado para componentes que só precisam do título e do preço).
  * Crie DTOs e interfaces focadas:
    ```typescript
    // ✅ Interfaces segregadas e precisas
    export interface ProductSummaryDTO {
      id: string;
      title: string;
      price: number;
      pixPrice: number;
      imageUrl: string;
    }

    export interface ProductStockDTO {
      sku: string;
      stock: number;
    }
    ```

### 1.5 D — Dependency Inversion Principle (Inversão de Dependência)
* **Regra:** Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
* **Aplicação no Monorepo:**
  * O app de Store (`apps/store`) e o de Checkout não devem chamar bibliotecas terceiras de pagamento (ex: `mercadopago` ou `stripe`) diretamente nas páginas.
  * Ambas as aplicações devem depender de contratos genéricos exportados por `packages/services` (ex: `ShippingProviderInterface` e `PaymentGatewayInterface`).

---

## 2. Padrões GRASP (General Responsibility Assignment Software Patterns)

Os 9 métodos **GRASP** regem a atribuição de responsabilidades em todo o monorepo:

| Padrão GRASP | Descrição & Diretriz | Exemplo no Projeto Styfla |
| :--- | :--- | :--- |
| **1. Information Expert (Especialista na Informação)** | Atribua a responsabilidade ao módulo que possui as informações necessárias para executá-la. | O hook `useCart` calcula o subtotal e o progresso do Frete Grátis, pois ele detém a lista de itens e o threshold de R$ 299,00. |
| **2. Creator (Criador)** | A entidade $A$ deve criar a entidade $B$ se $A$ contém, agrega ou usa intimamente $B$. | A camada de checkout gera o `OrderItem` a partir do `CartItem`, pois o pedido é o agregador principal da transação. |
| **3. Low Coupling (Baixo Acoplamento)** | Mantenha as dependências entre módulos no nível mínimo necessário para facilitar manutenção e testes. | O pacote `packages/ui` é agnóstico a banco de dados e gateways; ele consome apenas tipos de `packages/types`. |
| **4. High Cohesion (Alta Coesão)** | As responsabilidades de um módulo devem ser fortemente relacionadas e focadas em um único propósito. | `packages/services/shipping.ts` lida exclusivamente com cálculo e regras de postagem; nada de pagamentos ou renderização. |
| **5. Controller** | Camada intermediária que orquestra as operações do sistema antes de repassar à UI ou ao banco. | Server Actions e rotas de API do Next.js atuam como controllers: recebem a requisição, validam com Zod, invocam o serviço e retornam o resultado. |
| **6. Polymorphism (Polimorfismo)** | Trate comportamentos variantes através de tipos polimórficos em vez de estruturas condicionais explícitas. | Formas de pagamento (`PIX`, `CREDIT_CARD`, `BOLETO`) implementam o método `.processPayment()`, eliminando árvores de `switch/case`. |
| **7. Pure Fabrication (Invenção Pura)** | Crie classes de utilidade para manter a alta coesão e baixo acoplamento quando o domínio não comportar a função. | Utilitários de composição CSS (`cn()`), helpers de formatação de moeda brasileira (`formatBRL()`) e geradores de Payload PIX. |
| **8. Indirection (Indireção)** | Atribua responsabilidade a um objeto intermediário para mediar a comunicação entre dois componentes. | O pacote `packages/database/src/client.ts` encapsula a conexão do Prisma em um Singleton, mediando o acesso ao PostgreSQL para ambos os apps. |
| **9. Protected Variations (Variações Protegidas)** | Identifique pontos de instabilidade externa e envolva-os em interfaces estáveis. | Se o gateway de frete mudar dos Correios para Melhor Envio ou Jadlog, apenas o adapter em `packages/services/src/shipping.ts` muda; o frontend permanece intocado. |

---

## 3. Diretrizes de Componentização no Frontend React / Next.js

Para garantir manutenibilidade e performance em larga escala, **qualquer componente React deve seguir a estrutura abaixo**:

```
+---------------------------------------------------------------------------------+
|                         ARQUITETURA DE COMPONENTIZAÇÃO                          |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   1. UI Components (Agnósticos)      --> packages/ui (Button, Badge, Modal)     |
|   2. Feature Components (Domínio)    --> apps/store/src/components (ProductCard)|
|   3. State & Logic Containers (Hooks)--> apps/store/src/hooks (useCart)         |
|   4. Page / Layout (Rotas Next.js)   --> apps/store/src/app (page.tsx)          |
|                                                                                 |
+---------------------------------------------------------------------------------+
```

### 3.1 Regras Estritas de Componentes
1. **Limite de Linhas (Regra dos 250 Linhas):**
   * Nenhum arquivo de componente deve exceder **250 linhas**.
   * Se um componente crescer demais, extraia subcomponentes (ex: `ProductCard` $\rightarrow$ `ProductCardGallery`, `ProductCardBadges`, `ProductCardActions`).
2. **Presentational vs Container (Smart vs Dumb):**
   * **Presentational (Dumb):** Fica em `packages/ui` ou pastas `/components`. Não acessa `fetch`, não conecta a bancos e não contém regras de negócio complexas. Apenas recebe props e dispara callbacks.
   * **Container / Hook (Smart):** Gerencia estado, invoca mutations e passa os dados para os componentes visuais.
3. **Imutabilidade e Funções Puras:**
   * Handlers e transformações de dados devem ser funções puras sem mutação direta de arrays/objetos.
4. **Clean Code & Naming Conventions:**
   * Componentes: PascalCase (`ProductCard.tsx`, `CartDrawer.tsx`).
   * Hooks: camelCase com prefixo `use` (`useCart.ts`, `useShipping.ts`).
   * Utilitários e Serviços: camelCase ou classes PascalCase (`formatters.ts`, `ShippingService.ts`).
   * Constantes globais: UPPER_SNAKE_CASE (`FREE_SHIPPING_THRESHOLD`).

---

## 4. Checklist de Qualidade antes de Commits / PRs

Antes de submeter código ou considerar uma tarefa como finalizada, verifique:

- [ ] **S.O.L.I.D:** O novo código respeita responsabilidade única e inversão de dependência?
- [ ] **G.R.A.S.P:** O acoplamento entre os pacotes do monorepo continua baixo?
- [ ] **Tipagem Estrita:** Não há uso de `any` explícito ou implícito em nenhum arquivo TypeScript.
- [ ] **Monocromia:** A interface respeita as cores oficiais **Preto (`#000000`)** e **Branco (`#FFFFFF`)**.
- [ ] **Build Check:** O comando `pnpm build` roda com código de saída 0 sem warnings impeditivos.
