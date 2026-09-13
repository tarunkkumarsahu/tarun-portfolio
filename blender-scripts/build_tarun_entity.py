import bpy
import math
import os
from mathutils import Vector

# THE TARUN / ENTITY 01
# Procedural Blender blockout for an explode-ready mechanical identity bust.
# Blender 5.x compatible. Run from the repository root.

PROJECT_ROOT = os.getcwd()
BLEND_PATH = os.path.join(PROJECT_ROOT, "blender", "hero", "tarun-entity-v01.blend")
GLB_PATH = os.path.join(PROJECT_ROOT, "public", "models", "tarun-entity-v01.glb")


def clean_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        pass


def ensure_collection(name, parent=None):
    collection = bpy.data.collections.get(name)
    if collection is None:
        collection = bpy.data.collections.new(name)
    if parent:
        if collection.name not in parent.children:
            parent.children.link(collection)
    elif collection.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(collection)
    return collection


def move_to_collection(obj, collection):
    for current in list(obj.users_collection):
        current.objects.unlink(obj)
    collection.objects.link(obj)


def material(name, base, metallic=0.0, roughness=0.45, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        # Blender 4/5 renamed this socket to Emission Color.
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        elif "Emission" in bsdf.inputs:
            bsdf.inputs["Emission"].default_value = (*emission, 1.0)
        if "Emission Strength" in bsdf.inputs:
            bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def apply_bevel(obj, width=0.08, segments=3):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new(name="EDGE_SOFTEN", type="BEVEL")
    modifier.width = width
    modifier.segments = segments
    modifier.limit_method = "ANGLE"


def tag_explode(obj, vector, rotation=(0.0, 0.0, 0.0)):
    obj["explode_x"] = float(vector[0])
    obj["explode_y"] = float(vector[1])
    obj["explode_z"] = float(vector[2])
    obj["explode_rx"] = float(rotation[0])
    obj["explode_ry"] = float(rotation[1])
    obj["explode_rz"] = float(rotation[2])


def add_box(name, location, scale, mat, collection, rotation=(0.0, 0.0, 0.0), bevel=0.08, explode=(0, 0, 0), explode_rot=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    apply_bevel(obj, bevel, 4)
    if mat:
        obj.data.materials.append(mat)
    move_to_collection(obj, collection)
    if parent:
        obj.parent = parent
    tag_explode(obj, explode, explode_rot)
    return obj


def add_sphere(name, location, radius, mat, collection, scale=(1, 1, 1), explode=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=4, radius=radius, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if mat:
        obj.data.materials.append(mat)
    move_to_collection(obj, collection)
    if parent:
        obj.parent = parent
    tag_explode(obj, explode)
    return obj


def add_cylinder(name, location, radius, depth, mat, collection, rotation=(0, 0, 0), explode=(0, 0, 0), parent=None, vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    apply_bevel(obj, 0.06, 3)
    if mat:
        obj.data.materials.append(mat)
    move_to_collection(obj, collection)
    if parent:
        obj.parent = parent
    tag_explode(obj, explode)
    return obj


def add_torus(name, location, major_radius, minor_radius, mat, collection, rotation=(0, 0, 0), explode=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_radius,
        minor_radius=minor_radius,
        major_segments=96,
        minor_segments=16,
        location=location,
        rotation=rotation,
    )
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    move_to_collection(obj, collection)
    if parent:
        obj.parent = parent
    tag_explode(obj, explode)
    return obj


def animate_explosion(obj, start=1, open_frame=92, hold_frame=142, end=220):
    if not hasattr(obj, "keyframe_insert") or "explode_x" not in obj:
        return

    base_loc = obj.location.copy()
    base_rot = obj.rotation_euler.copy()
    vector = Vector((obj["explode_x"], obj["explode_y"], obj["explode_z"]))
    rot_delta = Vector((obj["explode_rx"], obj["explode_ry"], obj["explode_rz"]))

    obj.location = base_loc
    obj.rotation_euler = base_rot
    obj.keyframe_insert(data_path="location", frame=start)
    obj.keyframe_insert(data_path="rotation_euler", frame=start)

    obj.location = base_loc + vector
    obj.rotation_euler = (
        base_rot.x + rot_delta.x,
        base_rot.y + rot_delta.y,
        base_rot.z + rot_delta.z,
    )
    obj.keyframe_insert(data_path="location", frame=open_frame)
    obj.keyframe_insert(data_path="rotation_euler", frame=open_frame)
    obj.keyframe_insert(data_path="location", frame=hold_frame)
    obj.keyframe_insert(data_path="rotation_euler", frame=hold_frame)

    obj.location = base_loc
    obj.rotation_euler = base_rot
    obj.keyframe_insert(data_path="location", frame=end)
    obj.keyframe_insert(data_path="rotation_euler", frame=end)


def look_at(obj, target=(0, 0, 2.1)):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def build():
    clean_scene()

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 220
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = 1400
    scene.render.resolution_y = 1400
    scene.render.resolution_percentage = 100

    world = scene.world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.005, 0.006, 0.008, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.22

    root_collection = ensure_collection("TARUN_ENTITY")
    head_collection = ensure_collection("HEAD", root_collection)
    torso_collection = ensure_collection("TORSO", root_collection)
    core_collection = ensure_collection("CORE", root_collection)
    module_collection = ensure_collection("MODULES", root_collection)
    detail_collection = ensure_collection("DETAILS", root_collection)
    light_collection = ensure_collection("LIGHTS")
    camera_collection = ensure_collection("CAMERA")

    root = bpy.data.objects.new("TARUN_ENTITY_ROOT", None)
    root.empty_display_type = "PLAIN_AXES"
    root_collection.objects.link(root)

    graphite = material("GRAPHITE_METAL", (0.018, 0.021, 0.025), metallic=0.88, roughness=0.24)
    graphite_soft = material("GRAPHITE_SOFT", (0.055, 0.06, 0.068), metallic=0.62, roughness=0.33)
    ivory = material("WARM_IVORY", (0.82, 0.80, 0.74), metallic=0.12, roughness=0.32)
    red = material("SIGNAL_RED", (0.46, 0.018, 0.012), metallic=0.25, roughness=0.22, emission=(1.0, 0.035, 0.015), emission_strength=5.5)
    blue = material("SIGNAL_BLUE", (0.018, 0.08, 0.18), metallic=0.28, roughness=0.2, emission=(0.03, 0.28, 1.0), emission_strength=3.0)
    dark_glass = material("VISOR_DARK", (0.008, 0.012, 0.018), metallic=0.75, roughness=0.1)

    # CHEST / TORSO — asymmetric mechanical bust.
    add_box("CHEST_FRAME", (0, 0.18, 0.5), (1.72, 0.46, 1.14), graphite_soft, torso_collection, bevel=0.18, parent=root)
    add_box("CHEST_PLATE_L", (-0.88, -0.32, 0.72), (0.77, 0.18, 0.76), graphite, torso_collection,
            rotation=(0.0, 0.10, -0.10), explode=(-1.95, -0.28, 0.15), explode_rot=(0.0, -0.18, -0.22), parent=root)
    add_box("CHEST_PLATE_R", (0.88, -0.32, 0.72), (0.77, 0.18, 0.76), graphite, torso_collection,
            rotation=(0.0, -0.10, 0.10), explode=(1.95, -0.28, 0.15), explode_rot=(0.0, 0.18, 0.22), parent=root)
    add_box("CHEST_RIB_L", (-1.35, 0.05, 0.18), (0.30, 0.34, 0.82), ivory, torso_collection,
            rotation=(0, 0.06, -0.12), bevel=0.11, explode=(-1.35, 0.05, -0.5), explode_rot=(0.0, 0.0, -0.25), parent=root)
    add_box("CHEST_RIB_R", (1.35, 0.05, 0.18), (0.30, 0.34, 0.82), ivory, torso_collection,
            rotation=(0, -0.06, 0.12), bevel=0.11, explode=(1.35, 0.05, -0.5), explode_rot=(0.0, 0.0, 0.25), parent=root)

    # Core is deliberately not an arc-reactor copy: layered sphere + split cage.
    add_sphere("CHEST_CORE", (0, -0.73, 0.62), 0.38, red, core_collection, scale=(1.0, 0.48, 1.0), explode=(0, -1.1, 0), parent=root)
    add_torus("CORE_CAGE_A", (0, -0.69, 0.62), 0.54, 0.035, ivory, core_collection,
              rotation=(math.radians(90), 0, 0), explode=(0, -0.75, 0.35), parent=root)
    add_torus("CORE_CAGE_B", (0, -0.66, 0.62), 0.67, 0.018, red, core_collection,
              rotation=(math.radians(90), 0, math.radians(35)), explode=(0, -0.55, -0.28), parent=root)

    # Shoulder architecture.
    add_box("SHOULDER_L_01", (-2.02, 0.0, 0.92), (0.52, 0.52, 0.42), graphite, torso_collection,
            rotation=(0.0, 0.12, -0.20), bevel=0.16, explode=(-2.0, 0.1, 0.85), explode_rot=(0.15, 0, -0.35), parent=root)
    add_box("SHOULDER_L_02", (-2.34, 0.10, 0.43), (0.32, 0.40, 0.50), graphite_soft, torso_collection,
            rotation=(0.0, 0.05, -0.10), bevel=0.12, explode=(-2.4, 0.3, -0.25), parent=root)
    add_box("SHOULDER_R_01", (2.02, 0.0, 0.92), (0.52, 0.52, 0.42), graphite, torso_collection,
            rotation=(0.0, -0.12, 0.20), bevel=0.16, explode=(2.0, 0.1, 0.85), explode_rot=(-0.15, 0, 0.35), parent=root)
    add_box("SHOULDER_R_02", (2.34, 0.10, 0.43), (0.32, 0.40, 0.50), graphite_soft, torso_collection,
            rotation=(0.0, -0.05, 0.10), bevel=0.12, explode=(2.4, 0.3, -0.25), parent=root)

    # Neck / spine.
    add_cylinder("NECK_COLUMN", (0, 0.02, 1.82), 0.38, 0.90, graphite_soft, torso_collection,
                 explode=(0, 0.0, 0.65), parent=root)
    add_box("NECK_SIGNAL", (0, -0.38, 1.88), (0.10, 0.055, 0.34), red, detail_collection,
            bevel=0.035, explode=(0, -0.55, 0.8), parent=root)

    # Head core: faceless engineered silhouette.
    add_sphere("HEAD_CORE", (0, 0.02, 3.05), 1.0, graphite_soft, head_collection,
               scale=(0.83, 0.72, 1.0), explode=(0, 0.18, 1.0), parent=root)
    add_box("HEAD_FACE_PLATE", (0, -0.67, 2.98), (0.64, 0.12, 0.64), graphite, head_collection,
            bevel=0.16, explode=(0, -1.15, 0.15), explode_rot=(0.12, 0, 0), parent=root)
    add_box("HEAD_SHELL_L", (-0.60, -0.02, 3.12), (0.22, 0.56, 0.70), graphite, head_collection,
            rotation=(0.0, -0.10, -0.05), bevel=0.13, explode=(-1.15, 0.05, 0.55), explode_rot=(0, -0.3, -0.18), parent=root)
    add_box("HEAD_SHELL_R", (0.60, -0.02, 3.12), (0.22, 0.56, 0.70), graphite, head_collection,
            rotation=(0.0, 0.10, 0.05), bevel=0.13, explode=(1.15, 0.05, 0.55), explode_rot=(0, 0.3, 0.18), parent=root)

    # Split visor: thin, intelligent, not literal eyes.
    add_box("VISOR_L", (-0.34, -0.815, 3.22), (0.28, 0.045, 0.055), dark_glass, head_collection,
            rotation=(0, 0, -0.04), bevel=0.04, explode=(-0.48, -0.95, 0.20), parent=root)
    add_box("VISOR_R", (0.34, -0.815, 3.22), (0.28, 0.045, 0.055), dark_glass, head_collection,
            rotation=(0, 0, 0.04), bevel=0.04, explode=(0.48, -0.95, 0.20), parent=root)
    add_box("VISOR_SIGNAL", (0, -0.87, 3.22), (0.10, 0.025, 0.025), red, detail_collection,
            bevel=0.02, explode=(0, -1.2, 0.22), parent=root)

    # Top fins suggest a recognisable swept silhouette without literal hair.
    fin_specs = [
        (-0.50, 3.83, -0.28),
        (-0.25, 3.94, -0.18),
        (0.02, 3.98, -0.08),
        (0.29, 3.93, 0.04),
        (0.53, 3.80, 0.14),
    ]
    for index, (x, z, rz) in enumerate(fin_specs, start=1):
        direction = -1 if x < 0 else 1
        add_box(
            f"HEAD_FIN_{index:02d}",
            (x, -0.02, z),
            (0.13, 0.34, 0.34),
            graphite,
            head_collection,
            rotation=(0.0, 0.10 * direction, rz),
            bevel=0.09,
            explode=(x * 1.6, 0.24, 1.15 + abs(x) * 0.3),
            explode_rot=(0.12 * direction, 0.18 * direction, rz * 0.8),
            parent=root,
        )

    # Integrated domain modules, attached to the back/side architecture rather than orbiting boxes.
    modules = [
        ("MODULE_AI", (-1.28, 0.62, 1.38), (-1.8, 0.9, 1.0), red),
        ("MODULE_MEMORY", (1.28, 0.62, 1.38), (1.8, 0.9, 1.0), blue),
        ("MODULE_TOOLS", (-1.55, 0.66, 0.15), (-2.2, 1.0, -0.45), ivory),
        ("MODULE_MACHINES", (1.55, 0.66, 0.15), (2.2, 1.0, -0.45), ivory),
    ]
    for name, loc, explode_vec, mat in modules:
        add_box(name, loc, (0.28, 0.20, 0.24), mat, module_collection, bevel=0.08,
                explode=explode_vec, parent=root)

    # Back rails make the silhouette feel engineered and frame the head.
    add_box("BACK_RAIL_L", (-1.18, 0.72, 2.10), (0.09, 0.10, 1.05), graphite_soft, detail_collection,
            rotation=(0, 0, -0.16), bevel=0.06, explode=(-1.45, 0.8, 0.75), parent=root)
    add_box("BACK_RAIL_R", (1.18, 0.72, 2.10), (0.09, 0.10, 1.05), graphite_soft, detail_collection,
            rotation=(0, 0, 0.16), bevel=0.06, explode=(1.45, 0.8, 0.75), parent=root)
    add_box("BACK_BRIDGE", (0, 0.74, 3.55), (1.02, 0.10, 0.08), ivory, detail_collection,
            bevel=0.05, explode=(0, 0.9, 1.35), parent=root)

    # Animation preview in Blender: assembled -> exploded -> assembled.
    for collection in (head_collection, torso_collection, core_collection, module_collection, detail_collection):
        for obj in collection.objects:
            animate_explosion(obj)

    # Camera.
    bpy.ops.object.camera_add(location=(7.7, -13.4, 5.8))
    camera = bpy.context.object
    camera.name = "TARUN_ENTITY_CAMERA"
    camera.data.lens = 58
    look_at(camera, (0, 0, 1.75))
    move_to_collection(camera, camera_collection)
    scene.camera = camera

    # Lighting: dark studio, red signal, restrained cool rim.
    def add_area(name, location, energy, color, size):
        bpy.ops.object.light_add(type="AREA", location=location)
        light = bpy.context.object
        light.name = name
        light.data.energy = energy
        light.data.color = color
        light.data.shape = "DISK"
        light.data.size = size
        look_at(light, (0, 0, 1.6))
        move_to_collection(light, light_collection)
        return light

    add_area("KEY_IVORY", (-4.8, -6.0, 7.0), 1150, (1.0, 0.88, 0.72), 5.0)
    add_area("RIM_BLUE", (5.0, 2.2, 5.8), 900, (0.12, 0.28, 1.0), 4.0)
    add_area("SIGNAL_RED_LIGHT", (-3.0, 0.0, 2.2), 650, (1.0, 0.03, 0.01), 3.0)

    bpy.ops.object.light_add(type="POINT", location=(0, -2.2, 0.6))
    core_light = bpy.context.object
    core_light.name = "CORE_GLOW_LIGHT"
    core_light.data.energy = 430
    core_light.data.color = (1.0, 0.03, 0.01)
    core_light.data.shadow_soft_size = 1.3
    move_to_collection(core_light, light_collection)

    os.makedirs(os.path.dirname(BLEND_PATH), exist_ok=True)
    os.makedirs(os.path.dirname(GLB_PATH), exist_ok=True)

    scene.frame_set(1)
    bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)

    bpy.ops.export_scene.gltf(
        filepath=GLB_PATH,
        export_format="GLB",
        export_animations=True,
        export_extras=True,
    )

    print("\n============================================")
    print("THE TARUN / ENTITY 01 GENERATED")
    print(f"BLEND: {BLEND_PATH}")
    print(f"GLB:   {GLB_PATH}")
    print("Frames 1-220 preview the explode animation.")
    print("============================================\n")


if __name__ == "__main__":
    build()
