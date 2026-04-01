import React, { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
  BallCollider,
} from "@react-three/rapier";

import "./styles/TechStack.css";

const skillsData = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", color: "#f89820" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", color: "#4EAA25" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624" },
  
  { name: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg", color: "#0078D4" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", color: "#326CE5" },
  { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg", color: "#7B42BC" },
  
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
  
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
  { name: "EC2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#FF9900" },
  { name: "S3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#FF9900" },
  { name: "IAM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#FF9900" },

  { name: "VPC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#FF9900" },
  { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg", color: "#E6522C" },
  { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg", color: "#F46800" },
  { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", color: "#D24939" },
  
  { name: "CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", color: "#2088FF" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", color: "#FFFFFF" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC" },
];

function SkillBall({ skill, r, normalMap }: { skill: any; r: any; normalMap: THREE.Texture }) {
  const api = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!api.current) return;
    
    // Attract towards center gently
    const pos = api.current.translation();
    const impulse = new THREE.Vector3(-pos.x, -pos.y, -pos.z)
      .normalize()
      .multiplyScalar(delta * 12);
    
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={api}
      colliders="ball"
      linearDamping={1.2}
      angularDamping={1}
      friction={0.2}
      restitution={1.1}
      position={[r(30), r(20), r(10)]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[3.2, 128, 128]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            roughness={0.7} 
            metalness={0.0}
            normalMap={normalMap} // Hexagonal professional dimple pattern
            normalScale={new THREE.Vector2(3.5, 3.5)} // Deep realistic pores
            clearcoat={0.4} // Lowered to prevent reflection overlap
            clearcoatRoughness={0.1}
            ior={1.4}
            reflectivity={0.2}
            emissive="#ffffff"
            emissiveIntensity={hovered ? 0.3 : 0.05}
          />
        </mesh>

        <Html transform distanceFactor={14} sprite zIndexRange={[100, 0]}>
          <div className={`ball-ui-badge ${hovered ? 'hovered' : ''}`}>
            <img src={skill.icon} alt={skill.name} className="ball-ui-icon" style={{ filter: 'none' }} />
            <span className="ball-ui-name" style={{ 
              color: '#000', 
              fontWeight: 900,
              textShadow: '0 0 15px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,1)' 
            }}>{skill.name}</span>
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}

function MouseInterface() {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    ref.current.setNextKinematicTranslation({
      x: (pointer.x * viewport.width) / 2,
      y: (pointer.y * viewport.height) / 2,
      z: 0
    });
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[6]} />
    </RigidBody>
  );
}

function PhysicsBounds() {
  const { viewport } = useThree();
  // Dynamic bounds that grow/shrink based on current viewport size
  const w = viewport.width;
  const h = viewport.height;
  
  return (
    <RigidBody type="fixed" colliders={false}>
      {/* Floor and Ceiling */}
      <CuboidCollider position={[0, -h / 2 - 10, 0]} args={[w, 10, 60]} />
      <CuboidCollider position={[0, h / 2 + 10, 0]} args={[w, 10, 60]} />
      {/* Walls */}
      <CuboidCollider position={[-w / 2 - 10, 0, 0]} args={[10, h, 60]} />
      <CuboidCollider position={[w / 2 + 10, 0, 0]} args={[10, h, 60]} />
      {/* Back and Front */}
      <CuboidCollider position={[0, 0, -15]} args={[w, h, 2]} />
      <CuboidCollider position={[0, 0, 15]} args={[w, h, 2]} />
    </RigidBody>
  );
}

const TechStack = () => {
    // Professional Hexagonal Dimple Normal Map
    const normalMap = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d")!;
        
        ctx.fillStyle = "rgb(128, 128, 255)";
        ctx.fillRect(0, 0, 1024, 1024);
        
        const dimpleRadius = 18;
        const spacingX = 38;
        const spacingY = 32;
        
        for (let y = 0; y < 1024 + spacingY; y += spacingY) {
            const isOffset = (Math.floor(y / spacingY) % 2 === 0);
            for (let x = isOffset ? spacingX / 2 : 0; x < 1024 + spacingX; x += spacingX) {
                const grad = ctx.createRadialGradient(x, y, 0, x, y, dimpleRadius);
                // Creating deep normal slope: Center is flat (up), edges slope down
                grad.addColorStop(0, "rgb(128, 128, 255)");
                grad.addColorStop(0.3, "rgb(80, 80, 255)"); // Slope down
                grad.addColorStop(0.9, "rgb(40, 40, 255)"); // Deepest point
                grad.addColorStop(1, "rgb(128, 128, 255)"); // Return to surface
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, dimpleRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        return tex;
    }, []);

  return (
    <section className="techstack-section" id="techstack">
      <div className="techstack-header" style={{ pointerEvents: 'none', position: 'absolute', top: '10%' }}>
        <h2 className="techstack-title">
          My <span className="text-gradient-neon">Tech</span> Ecosystem
        </h2>
        <p className="techstack-subtitle">
          Highly active module cluster — Sweep your mouse to break the array.
        </p>

        <div className="techstack-soft-skills-row">
          <div className="soft-skill-pill"><span className="pill-dot blue"></span>DSA (LeetCode)</div>
          <div className="soft-skill-pill"><span className="pill-dot purple"></span>Cloud Architecture</div>
          <div className="soft-skill-pill"><span className="pill-dot green"></span>Software Structuring</div>
        </div>
      </div>

      <Canvas
        shadows
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 55], fov: 40, near: 1, far: 300 }} // Wider camera for mobile
        onCreated={({ camera, viewport }) => {
            // Adjust camera Z based on screen aspect ratio
            if (viewport.width < 15) camera.position.z = 70; 
            camera.updateProjectionMatrix();
        }}
        className="tech-canvas"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[20, 20, 25]} intensity={3} color="white" castShadow />
          <directionalLight position={[-10, 20, 10]} intensity={1.5} />
          
          <Physics gravity={[0, 0, 0]} iterations={10}>
            <MouseInterface />
            <PhysicsBounds />
            {skillsData.map((skill, i) => (
              <SkillBall
                key={i}
                skill={skill}
                r={THREE.MathUtils.randFloatSpread}
                normalMap={normalMap}
              />
            ))}
          </Physics>
          
          <Environment preset="night" />
          
          <EffectComposer multisampling={4}>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default TechStack;
