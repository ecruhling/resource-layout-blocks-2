# Block Development

Blocks in this directory use JSX.

Each block should maintain separate:
- editor JavaScript
- frontend style
- editor style

Do not consolidate block entry points unless explicitly requested.

Bootstrap utility-class controls must remain bidirectional:
- toolbar class string → Inspector state
- Inspector state → toolbar class string

Responsive classes must support:
- base
- sm
- md
- lg
- xl
- xxl

For spacing controls:
- px maps to ps + pe
- py maps to pt + pb
- mx maps to ms + me
- my maps to mt + mb

Preserve margin auto behavior and normalized class output.
