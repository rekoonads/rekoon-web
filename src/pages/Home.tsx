import Banner from '../components/Banner';
import Community from '../components/Community';
import Footer from '../components/Footer';

import Introduction from '../components/Introduction';
import Hero from '../components/NewHero';
import NavbarNew from '../components/NewNavbar';
import Publisher from '../components/Publisher';

import Tools from '../components/Tools';
import Workflow from '../components/Workflow';

const App = () => {
  return (
    <>
      <NavbarNew />
      <Hero />
      <Introduction />
      <Tools />
      <Banner />
      <Workflow />
      {/* <Banner /> */}
      <Publisher />
      <Community />
      <Footer />
    </>
  );
};

export default App;
