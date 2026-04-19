// HomePage.js
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import BrainModel from "./BrainModel";
import IntroSlide from './IntroSlide';
import TopBar from "./TopBar";
import TumorInfoSection from "./TumorInfoSection";
import AIStatsSection from "./AIStatsSection";
import Footer from "./Footer";
import "../styles.scss";

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} castShadow />
      <spotLight position={[0, 0, -6]} angle={0.8} penumbra={1} intensity={1.5} castShadow />
      <directionalLight position={[-3, 2, -5]} intensity={1.6} castShadow={false} />
      <spotLight position={[0, 5, 5]} angle={0.5} penumbra={0.5} intensity={1} castShadow />
      <spotLight position={[-2, 5, 5]} angle={0.4} penumbra={0.8} intensity={1.5} castShadow={false} />
      <directionalLight position={[0, -4, 2]} intensity={0.9} castShadow={false} />
      <hemisphereLight skyColor={"#ffffff"} groundColor={"#666666"} intensity={0.7} />

      <Suspense fallback={null}>
        <BrainModel />
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls 
        enableZoom={true}
        minDistance={2}
        maxDistance={5}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const HomePage = () => {
  return (
    <div className="app-container">
      <TopBar />

      <IntroSlide />

      <TumorInfoSection 
        tumors={[
          { 
            title: "Gliome", 
            image: "/images/image1.png", 
            description: "Le gliome est une tumeur qui se développe à partir des cellules gliales du cerveau ou de la moelle épinière. Ces cellules soutiennent et protègent les neurones. Le gliome peut être de bas grade (moins agressif) ou de haut grade (plus agressif, comme le glioblastome). Les symptômes varient selon la localisation, mais incluent souvent des maux de tête, des convulsions et des troubles neurologiques." 
          },
          { 
            title: "Méningiome", 
            image: "/images/image2.png", 
            description: "Le méningiome est une tumeur généralement bénigne qui se forme dans les méninges, les membranes qui entourent le cerveau et la moelle épinière. Bien qu'il soit souvent non cancéreux, il peut provoquer des symptômes en comprimant les structures cérébrales, causant des maux de tête, des troubles de la vision ou des changements de comportement." 
          },
          { 
            title: "Tumeur hypophysaire", 
            image: "/images/image3.png", 
            description: "Les tumeurs hypophysaires se développent dans l'hypophyse, une petite glande située à la base du cerveau qui régule de nombreuses hormones. Ces tumeurs peuvent être fonctionnelles (produisant des hormones en excès) ou non fonctionnelles. Les symptômes incluent des troubles hormonaux, des problèmes de vision et des maux de tête." 
          },
          { 
            title: "Cerveau Sain", 
            image: "/images/2.png", 
            description: "Un cerveau sain est essentiel pour le bon fonctionnement du corps et de l'esprit. Maintenir un mode de vie équilibré, pratiquer des activités physiques et mentales régulières, et adopter une alimentation saine sont des éléments clés pour préserver la santé cérébrale." 
          }
        ]}
      />

      <div className="brain-container">
        <Canvas
          shadows
          camera={{ position: [0, 0, 3], fov: 30 }}
          style={{
            width: '300px',
            height: '300px',
            background: 'transparent',
            margin: '0 auto'
          }}
        >
          <Scene />
        </Canvas>
      </div>

      <AIStatsSection />

    </div>
  );
};

export default HomePage;
