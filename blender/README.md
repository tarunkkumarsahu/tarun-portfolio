# THE TARUN / 3D PIPELINE

The portfolio now has a code-driven Blender pipeline for the hero identity entity.

## Build the editable Blender source and web GLB

From the repository root on Windows:

```powershell
npm run 3d:build
```

The runner auto-detects Blender under `C:\Program Files\Blender Foundation`, executes `blender-scripts/build_tarun_entity.py`, and produces:

```text
blender/hero/tarun-entity-v01.blend
public/models/tarun-entity-v01.glb
```

## Preview the animation in Blender

Open `blender/hero/tarun-entity-v01.blend` and press Spacebar.

- Frame 1: assembled entity
- Frame 92: exploded view
- Frame 142: exploded hold
- Frame 220: reassembled entity

The model is intentionally modular. Head shells, visor pieces, chest plates, shoulders, core cages and system modules are separate named objects so the website can control them independently later.

## Current visual direction

`THE TARUN / ENTITY 01` is a mechanical identity bust rather than a generic humanoid robot. It uses graphite metal, warm ivory, signal red and a restrained blue rim. The head is faceless with a split visor and swept mechanical fins. The chest core is layered and the system modules are integrated into the body instead of floating around it like an atom.

## Website interaction

The homepage currently uses a lightweight procedural React Three Fiber version of the same concept for immediate iteration:

- mouse movement gives the entity subtle physical response
- click toggles an inspect/exploded state
- the first hero scroll progressively explodes the entity
- the final part of the hero scroll transitions into the black manifesto chapter

Once the Blender model is visually approved, the procedural web blockout can be replaced by the exported GLB while keeping the same click/scroll interaction system.
