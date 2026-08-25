# Design System Styfla — Referência de Implementação (`apps/store`)

> Documento de referência rápida dos tokens visuais realmente implementados no código, para manter consistência em novas telas. Complementa (não substitui) `agents.md` e `brand/guidelines/`.

## Cores

Estritamente monocromático — sem tokens de tema em `@theme`, usados diretamente:

- Preto puro: `#000000` (`bg-black` / `bg-[#000000]`)
- Branco puro: `#FFFFFF` (`text-white` / `bg-white`)
- Superfícies elevadas (cards, painéis): `bg-zinc-950` / `bg-[#080808]` / `bg-[#050505]`
- Bordas: `border-white/10`, `border-white/15`, `border-white/20` (hairlines translúcidas, não cinza sólido)
- Faixas IBJJF (só em `Badge`, nunca decorativo): branca, azul (`blue-600`), roxa (`purple-600`), marrom (`amber-900`), preta (com barra vermelha `red-600`, convenção real de grau IBJJF)
- Estados de alerta (só nas rotas `/admin`, para severidade de estoque): `red-600` (esgotado/crítico), `amber-500` (aviso) — exceção funcional à regra de monocromia, não usado na loja

## Tipografia

- **Display/títulos** (`h1`, `h2`, `h3`, `.font-heading`): `Bebas Neue` via `next/font/google`, variável CSS `--font-display`. Fallback: `Impact, Arial Black, system-ui`.
- **Corpo/UI**: `Plus Jakarta Sans` via `next/font/google`, variável CSS `--font-sans`. Fallback: `system-ui`.
- A fonte "Legacy" (angular/chanfrada) permanece **apenas nas artes/logos** (`design-assets/brand/`, PNGs) — não é carregada como web font.

## Forma & Bordas

- `rounded-none` em todo lugar (cantos retos = identidade angular da marca). Nunca usar `rounded-lg`/`rounded-xl`.

## Animação

Definidas em `apps/store/src/app/globals.css`, sempre dentro de `@media (prefers-reduced-motion: no-preference)`:

- `.animate-fade-in` — abertura de modais
- `.animate-slide-left` — drawer do carrinho
- `.animate-scale-in` — badge de contagem do carrinho

## Foco & Acessibilidade

- `Button` (`packages/ui`) tem `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black` — todo elemento clicável novo deve manter foco visível equivalente.

## Responsivo

- Grades de produto/PDP devem sempre ter os 4 passos `sm:` / `md:` / `lg:` (evitar pular direto de 2 para 4 colunas).

## Componentes-fonte

- `packages/ui/src/components/Button.tsx` — variantes `primary | secondary | outline | ghost | pix | dark`
- `packages/ui/src/components/Badge.tsx` — variantes de faixa IBJJF + `red`/`gold` (uso exclusivo admin)
- Sempre reutilizar esses componentes em vez de recriar `<button>`/badges com classes manuais.
