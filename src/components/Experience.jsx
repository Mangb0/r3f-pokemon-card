import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { DragonEvolved } from "./Dragon_Evolved";
import { Cactoro } from "./Cactoro";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <MonsterStage
        texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        name="Fish King"
        color="#38adcf"
      >
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>
      <MonsterStage
        texture={"textures/anime_art_style_lava_world.jpg"}
        name="Dragon"
        color="#df8d52"
        position-x={-2.5}
        rotation-y={Math.PI / 8}
      >
        <DragonEvolved scale={0.5} position-y={-1} />
      </MonsterStage>
      <MonsterStage
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        name="Cactoro"
        color="#739d3c"
        position-x={2.5}
        rotation-y={-Math.PI / 8}
      >
        <Cactoro scale={0.45} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, name, color, ...props }) => {
  const map = useTexture(texture);
  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
