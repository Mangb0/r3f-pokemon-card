import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Fish({ hovered, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Fish.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const anim = hovered ? "Wave" : "Idle";
    actions[anim].reset().fadeIn(0.5).play();
    return () => actions[anim].fadeOut(0.5);
  }, [hovered]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh
            name="Fish"
            geometry={nodes.Fish.geometry}
            material={materials.Atlas}
            skeleton={nodes.Fish.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Fish.gltf");
