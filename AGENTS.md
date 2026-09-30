# Project Instructions

## Project

This is a WordPress project.

Before changing code, inspect:
- composer.json
- package.json
- block.json files
- vite.config.js or equivalent build configuration
- existing PHP registration/bootstrap code

Follow patterns already established in the repository.

## Environment

- WordPress: 6.6+
- Frontend framework: Bootstrap 5
- JavaScript build system: Vite
- JavaScript: JSX/ES modules where appropriate
- Do not introduce TypeScript unless explicitly requested.
- Sass may be used where already configured.

## WordPress conventions

- Use WordPress APIs instead of direct database access when an appropriate API exists.
- Escape rendered output.
- Sanitize and validate incoming values.
- Use capability checks and nonces where appropriate.
- Preserve existing REST/public-access behavior unless intentionally changing it.

## Gutenberg blocks

- Inspect block.json before changing a block.
- Keep editor and frontend behavior separate where appropriate.
- Preserve saved markup compatibility.
- Be particularly careful when modifying save().
- Prefer supported WordPress packages and block APIs.
- Do not assume @wordpress packages should be bundled; inspect Vite externals first.

## Bootstrap

This project uses Bootstrap 5.

Prefer existing Bootstrap:
- grid classes
- spacing utilities
- display utilities
- flex utilities
- alignment utilities
- responsive breakpoint utilities

before adding equivalent custom CSS.

Bootstrap breakpoints are:

- base
- sm
- md
- lg
- xl
- xxl

## Build workflow

Before modifying build configuration, inspect the current Vite inputs, outputs, externals, and CSS handling.

After relevant JavaScript/CSS changes, run the project's existing build command.

Do not assume emitted assets exist; verify the output.

## Testing

After PHP modifications:
- run available PHP syntax/lint checks;
- inspect affected WordPress hooks and registrations.

After JavaScript/block modifications:
- run the project's build;
- report build warnings and failures rather than hiding them.

Do not commit or push changes unless explicitly requested.
