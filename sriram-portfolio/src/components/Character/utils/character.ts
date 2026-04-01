import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                const name = mesh.name.toLowerCase();
                // Identify and change clothing colors
                if (mesh.material && (mesh.material as any).color) {
                  const color = (mesh.material as any).color;
                  // Original Shirt color check: #8b4513
                  if (color.getHex() === 0x8b4513 || name.includes("shirt") || name.includes("body")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#4B0082"); // Deep Purple
                    mesh.material = newMat;
                  } else if (name.includes("pant") || name.includes("legs")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#111111"); // Charcoal Black
                    mesh.material = newMat;
                  } else if (name.includes("cap") || name.includes("hat")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#ffffff"); // Pure White Cap
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations
            
            // Add "DevOps" Text Decal covering the entire chest area
            const canvas = document.createElement("canvas");
            canvas.width = 2048; // Increased resolution
            canvas.height = 1024;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0,0,2048,1024);
              ctx.font = "bold 440px Arial"; // Increased font size
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              ctx.shadowColor = "rgba(0,0,0,0.8)";
              ctx.shadowBlur = 20;
              ctx.fillText("DevOps", 1024, 660);
            }
            const textTexture = new THREE.CanvasTexture(canvas);
            const decalMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(2.0, 1.0), // Increased T-shirt logo size even more
                new THREE.MeshBasicMaterial({ 
                    map: textTexture, 
                    transparent: true, 
                    depthTest: false,
                    polygonOffset: true,
                    polygonOffsetFactor: -10
                 })
            );
            
            // Placed at the exact height mapping to the shirt
            decalMesh.position.set(0, 1.40, 0.24); 
            decalMesh.rotation.x = -Math.PI / 15;
            
            // Attach to the actual mid-chest bone (usually spine004)
            const neck = character.getObjectByName("spine006");
            let chestBone = character.getObjectByName("spine004");
            
            if (!chestBone && neck && neck.parent && neck.parent.parent) {
               chestBone = neck.parent.parent;
            }
            
            if (chestBone) {
               chestBone.add(decalMesh);
               decalMesh.position.set(0, -0.05, 0.18); // Centered on chest
               decalMesh.rotation.x = 0;
            } else {
               character.add(decalMesh);
               decalMesh.position.set(0, 1.15, 0.25); 
               decalMesh.rotation.x = -Math.PI / 15;
            }

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
