import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const Developer = ({ animationName = 'idle', animation, ...props }) => {
  const group = useRef();

  const { scene } = useGLTF("/Models/developer.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load animations with error handling
  const { animations: idleAnimation } = useFBX("/Models/animations/idle.fbx");
  const { animations: saluteAnimation } = useFBX("/Models/animations/salute.fbx");
  const { animations: clappingAnimation } = useFBX("/Models/animations/clapping.fbx");
  const { animations: victoryAnimation } = useFBX("/Models/animations/victory.fbx");

  // Set animation names safely
  if (idleAnimation?.[0]) idleAnimation[0].name = 'idle';
  if (saluteAnimation?.[0]) saluteAnimation[0].name = 'salute';
  if (clappingAnimation?.[0]) clappingAnimation[0].name = 'clapping';
  if (victoryAnimation?.[0]) victoryAnimation[0].name = 'victory';

  // Create animations array, filtering out undefined animations
  const allAnimations = [
    idleAnimation?.[0],
    saluteAnimation?.[0],
    clappingAnimation?.[0],
    victoryAnimation?.[0]
  ].filter(Boolean);

  const { actions } = useAnimations(allAnimations, group);

  // Handle animation changes with proper error checking
  useEffect(() => {
    if (!actions || !group.current) return;

    // Stop all current animations
    Object.values(actions).forEach(action => {
      if (action) {
        action.stop();
      }
    });

    // Start the requested animation if it exists
    const targetAction = actions[animationName];
    if (targetAction) {
      targetAction.reset().fadeIn(0.5).play();
    } else {
      console.warn(`Animation "${animationName}" not found. Available animations:`, Object.keys(actions));
      // Fallback to idle if available
      const idleAction = actions['idle'];
      if (idleAction) {
        idleAction.reset().fadeIn(0.5).play();
      }
    }

    // Cleanup function
    return () => {
      const currentAction = actions[animationName];
      if (currentAction) {
        currentAction.fadeOut(0.5);
      }
    };
  }, [animationName, actions]);

  // Handle the animation prop (this seems to be unused, but keeping for compatibility)
  useEffect(() => {
    if (animation) {
      if (typeof animation.fadeIn === 'function') {
        animation.fadeIn();
      } else {
        console.warn("Animation prop does not have fadeIn method:", animation);
      }
    }
  }, [animation]);

  // Add error boundary for rendering
  if (!nodes || !materials) {
    console.error("3D model nodes or materials not loaded");
    return null;
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      {nodes.Wolf3D_Hair && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      )}
      {nodes.Wolf3D_Glasses && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
      )}
      {nodes.Wolf3D_Body && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Bottom && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Footwear && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Top && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      )}
      {nodes.EyeLeft && (
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
      )}
      {nodes.EyeRight && (
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Head && (
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Teeth && (
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      )}
    </group>
  );
};

export default Developer;