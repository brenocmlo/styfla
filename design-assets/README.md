# 🎨 Styfla - Artefatos de Identidade Visual & Design Assets

Esta pasta foi estruturada para centralizar todos os arquivos de identidade visual da marca **Styfla**.

---

## 📁 Estrutura de Pastas

```
design-assets/
├── brand/
│   ├── logos/           # Logotipos oficiais (SVG, PNG transparente, vetor AI/EPS)
│   │   ├── primary/     # Logo principal (Horizontal / Completo)
│   │   ├── symbol/      # Ícone / Símbolo / Favicon (apenas o ícone da marca)
│   │   ├── monochrome/  # Versões 100% branco e 100% preto
│   │   └── watermark/   # Marca d'água para aplicação em fotos de rash guards
│   │
│   ├── banners/         # Banners promocionais, Hero banners da Home e Redes Sociais
│   │   ├── hero-desktop/# Banners largos para Desktop (ex: 1920x800px)
│   │   ├── hero-mobile/ # Banners verticais para Mobile (ex: 1080x1350px)
│   │   └── social/      # Posts de Instagram (Feed 1:1, Stories 9:16)
│   │
│   ├── mockups/         # Mockups de produtos, modelagens 3D e fotos editoriais
│   │   ├── rashguards/  # Fotos de rash guards (frente, costas, no corpo do atleta)
│   │   └── packaging/   # Embalagens, sacolas, tags de produto e adesivos
│   │
│   ├── typography/      # Arquivos de fontes (.ttf, .otf, .woff2) ou manuais de uso
│   │
│   └── guidelines/      # Manual de Marca (Brandbook em PDF, paletas de cores, moodboards)
```

---

## ⚡ Como Usar os Arquivos na Aplicação Web (Next.js)

Para que qualquer logo ou imagem seja exibido automaticamente na **Loja Virtual** ou no **Painel Admin**:

1. **Arquivos Públicos do Site:**
   - Basta copiar o arquivo para a pasta `apps/store/public/brand/` (ex: `apps/store/public/brand/logo.svg`).
   - No código React/Next.js, ele estará disponível diretamente em:
     ```tsx
     <img src="/brand/logo.svg" alt="Styfla Logo" className="h-8" />
     ```

2. **Formatos Recomendados:**
   - **Logos & Ícones:** `.svg` (vetorial, máxima nitidez em qualquer resolução).
   - **Fotografia & Banners:** `.webp` ou `.png` (alta fidelidade e leveza).
   - **Arquivos Fonte:** `.ai`, `.fig` (Figma), `.psd` ou `.pdf`.
