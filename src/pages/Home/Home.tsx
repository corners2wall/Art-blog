import Footer from '../../components/Footer';
import HomeFooter from '../../components/HomeFooter';
import Content from '../../screens/Content';
import Terminal from '../../screens/Terminal';
import Navigation from '../../components/Navigation';
import PreviewAnimation from '../../screens/PreviewAnimation';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
      <Navigation />
      <main className='flex'>
        <PreviewAnimation>
          <Terminal />
        </PreviewAnimation>
        <Content />
      </main>
      <HomeFooter />
      <Footer />
    </div>
  );
}
