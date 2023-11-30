import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Fish(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Fish.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Idle"].reset().fadeIn(0.5).play();
    return () => actions["Idle"].fadeOut(0.5);
  }, []);

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
