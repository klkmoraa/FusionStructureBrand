# FusionStructure Brandbook

Repositorio oficial del **sistema de marca de FusionStructure**.

Este repositorio ya no contiene la landing del ecosistema. Su única responsabilidad es definir, documentar y entregar la identidad visual y verbal de FusionStructure.

## Contenido

- marca principal, lockups e isotipo;
- acento **Aqua estructural**;
- señales técnicas y colores semánticos;
- tipografía y jerarquía;
- iconografía y familias de herramientas;
- material, profundidad y patrones de interfaz;
- motion y comportamiento;
- voz y microcopy;
- mockups, referencias y entregables de handoff.

La landing pública vive en **[FusionStructure](https://github.com/klkmoraa/FusionStructure)**.

## Desarrollo

```bash
cd brandbook-site
npm ci
npm run brand:assets
npm run lint
npm run dev
```

## Build estático

```bash
cd brandbook-site
NEXT_PUBLIC_BASE_PATH=/fusionstructure-web/ npm run build:pages
```

GitHub Pages publica el brandbook directamente en la raíz del sitio del repositorio.

## Estado

Experimental. El brandbook distingue identidad de marca, señales técnicas y estados de producto para evitar usar color decorativo como significado técnico.
