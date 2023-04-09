import { Circle, SpotLight, SpotLightShadow } from '@react-three/drei'

import { useLayoutEffect } from 'react'
import { useTexture } from '@react-three/drei'

import { MathUtils, RepeatWrapping } from 'three'

import { TerrainProps } from './Terrain.interface'
import { Texture } from 'three'

export default function Terrain({ onContextMenu }: TerrainProps): JSX.Element {
  const texs = useTexture([
    '/textures/grassy/grassy_cobblestone_diff_2k.jpg',
    '/textures/grassy/grassy_cobblestone_nor_gl_2k.jpg',
    '/textures/grassy/grassy_cobblestone_rough_2k.jpg',
    '/textures/grassy/grassy_cobblestone_ao_2k.jpg',
  ])

  useLayoutEffect(() => {
    for (const tex of texs) {
      tex.wrapS = tex.wrapT = RepeatWrapping
      tex.repeat.set(20, 20)
    }
  }, [texs])

  const [diffuse, normal, roughness, ao]: Texture[] = texs

  return (
    <>
      <Circle
        onContextMenu={onContextMenu}
        receiveShadow
        args={[15, 64, 64]}
        rotation-x={-Math.PI / 2}
      >
        <meshStandardMaterial
          map={diffuse}
          normalMap={normal}
          roughnessMap={roughness}
          aoMap={ao}
          envMapIntensity={0.2}
        />
      </Circle>

      <SpotLight
        distance={20}
        intensity={9}
        angle={MathUtils.degToRad(75)}
        color={'#fadcb9'}
        position={[4, 12, -2]}
        volumetric={false}
        debug
      >
        <SpotLightShadow
          scale={4}
          distance={0.4}
          width={2048}
          height={2048}
          shader={
            /* glsl */ `
					varying vec2 vUv;
					uniform sampler2D uShadowMap;
					uniform float uTime;
					void main() {
						// material.repeat.set(2.5) - Since repeat is a shader feature not texture
						// we need to implement it manually
						vec2 uv = mod(vUv, 0.4) * 2.5;

						// Fake wind distortion
						uv.x += sin(uv.y * 10.0 + uTime * 0.5) * 0.02;
						uv.y += sin(uv.x * 10.0 + uTime * 0.5) * 0.02;
						
						vec3 color = texture2D(uShadowMap, uv).xyz;
						gl_FragColor = vec4(color, 1.);
					}
				`
          }
        />
      </SpotLight>
    </>
  )
}
