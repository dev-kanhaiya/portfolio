import React from "react";
import { useGLTF } from "@react-three/drei";

export default function AvatarModel(props) {
  const { scene } = useGLTF("https://models.readyplayer.me/68a8576a7c6c17df66818174.glb");
  return <primitive object={scene} scale={2} {...props} />;
}
