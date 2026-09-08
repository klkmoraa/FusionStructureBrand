# Organización del workspace de FusionStructure

## Propósito

Dejar un punto de trabajo inequívoco para landing, brandbook y motion, sin
poner en riesgo las fuentes, el historial Git ni sesiones locales de los
proyectos históricos.

## Contexto comprobado

El workspace agrupa tres repositorios independientes. El portal activo vive
en `Plataforma/Landing-y-Brandbook/`; el histórico contiene Foundation y un
monolito anterior. Al momento de esta organización, el monolito histórico
tiene cambios locales y procesos de brandbook abiertos. El portal activo no
tiene cambios locales ni procesos que usen sus artefactos generados.

## Diseño

La raíz documentará las responsabilidades de cada repositorio y el portal
documentará sus tres superficies de producción. La limpieza elimina sólo
artefactos explícitamente ignorados por Git y recreables desde `package.json`
y los lockfiles del portal activo. El histórico queda inalterado: sus cambios,
worktrees y servidores son evidencia de trabajo aún vivo.

## Límites de seguridad

- No se borran archivos seguidos por Git, assets en `public/`, fuentes en
  `src/` o `app/`, documentación, worktrees ni repositorios.
- No se matan procesos ni se limpian sus directorios de trabajo.
- Cada ruta candidata se comprueba como ignorada por Git antes de eliminarse.
- No se fusionan repositorios ni se reescribe su historia.

## Resultado esperado

La raíz guía hacia el portal activo, las superficies del portal tienen dueño y
validación explícitos, y los builds/dependencias obsoletos del portal se
pueden reconstruir con los comandos documentados.
