import React from 'react';
import HeroSlider from '../components/HeroSlider';
import IntroSection from '../components/IntroSection';
import WorkflowSection from '../components/WorkflowSection';
import ResearchAreas from '../components/ResearchAreas';
import SectorsSection from '../components/SectorsSection';
import FooterHome from '../components/FooterHome';

const Home: React.FC = () => {
  return (
    <>
      <main>
        {/* Component 1: Hero Image Slider */}
        <HeroSlider />

        {/* Component 2: Introduction Paragraph */}
        <IntroSection />

        {/* Component 3: How We Work Workflow */}
        <WorkflowSection />

        {/* Component 4: Areas of Research (R&D Domains) */}
        <ResearchAreas />

        {/* Component 5: Who We Serve (Client Sectors & Capabilities) */}
        <SectorsSection />
      </main>

      {/* Component 4: Footer */}
      <FooterHome />

    </>
  );
};

export default Home;
