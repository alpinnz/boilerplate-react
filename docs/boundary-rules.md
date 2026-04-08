# Boundary Rules

## Allowed Directions

- apps/{app} -> packages/{package} (public API only)
- features -> lib_shared (public API only)

## Forbidden

- lib_shared -> apps/{app}
- Deep import ke internals package/feature
- Root app src/pages dan src/local
