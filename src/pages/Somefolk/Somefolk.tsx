import getImageUrl from '../../utils/getImageUrl';
import { useState } from 'react';
import WalkingSection from './WalkingSection';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';
import CircleSection from './CircleSection';
import ContactSection from './ContactSection';
import ExampleSection from './ExampleSection';
import IntroSection from './IntroSection.1';

const tileImage = getImageUrl('background', 'jpg');

export default function Somefolk() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  return (
    <div className='text-olive-100 bg-olive-900 font-arges'>
      {/* <ScreenWrapper className='overflow-hidden'>
        {isModelsLoaded && (
          <>
            <Tile image={tileImage} />
            <OverlayLayer />
          </>
        )}
        <ScreenWrapper position='absolute'>
          <VolumetricText setIsModelsLoaded={setIsModelsLoaded} word='SOMEFOLK' />
        </ScreenWrapper>
      </ScreenWrapper> */}
      <ContactSection />
      <IntroSection />
      <ExampleSection />
      <WalkingSection />
      <ParallaxSection />
      <CircleSection />
      <Footer />
    </div>
  );
}
