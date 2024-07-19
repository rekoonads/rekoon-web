import { GlobeDemo } from '../components/Globe';
import { HeroHighlightDemo } from '../components/Hero';
import { HeroParallaxDemo } from '../components/HeroParallax';
import { InfiniteMovingCardsDemo } from '../components/MovingCard';
import { NavbarDemo } from '../components/Navbar';
import { BackgroundBeamsDemo } from '../components/Waitlist';
import { WobbleCardDemo } from '../components/WobbleCard';

const Home = () => {
  return (
    <div className="bg-dark">
      <NavbarDemo />
      <HeroHighlightDemo />
      {/* <LampDemo /> */}
      <HeroParallaxDemo />
      <WobbleCardDemo />
      <GlobeDemo />
      <InfiniteMovingCardsDemo />
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Home;
