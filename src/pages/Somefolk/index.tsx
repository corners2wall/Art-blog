import WalkingSection from './WalkingSection';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';
import CircleSection from './CircleSection';
import ContactSection from './ContactSection';
import ExampleSection from './ExampleSection';
import IntroSection from './IntroSection';
import PreviewSection from './PreviewSection';

export default function Somefolk() {
  return (
    <div className='text-olive-100 bg-olive-900 font-arges'>
      <PreviewSection />
      {/* <ExampleSection />
      <ExampleSection /> */}
      <IntroSection />
      <ExampleSection />
      <WalkingSection />
      <ParallaxSection />
      <CircleSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
