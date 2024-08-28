import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import axios from 'axios';

const CorporateAds = () => {
  const [currentDesign, setCurrentDesign] = useState(0);
  const designs = [DesignOne, DesignTwo];

  const nextDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % designs.length);
  };

  const prevDesign = () => {
    setCurrentDesign((prev) => (prev - 1 + designs.length) % designs.length);
  };
  const CurrentDesign = designs[currentDesign];

  //Fluid Player integration is here 
//   const content = 'Careers';
//   const [vastTags, setVastTags] = useState({
//     preRoll: '',
//     midRoll1: '',
//     midRoll2: '',
//     postRoll: '',
//     onPauseRoll: '',
//   });
//   const [playerInitialized, setPlayerInitialized] = useState(false);

//   useEffect(() => {
//     const fetchVastTags = async () => {
//       try {
//         const preRoll = await axios.get(`http://localhost:3001/api/get-ads?type=${content}`);
//         const midRoll1 = await axios.get(`http://localhost:3001/api/get-ads?type=${content}`);
//         const midRoll2 = await axios.get(`http://localhost:3001/api/get-ads?type=${content}`);
//         const postRoll = await axios.get(`http://localhost:3001/api/get-ads?type=${content}`);
//         const onPauseRoll = await axios.get(`http://localhost:3001/api/get-ads?type=${content}`);

//         setVastTags({
//           preRoll: preRoll.data,
//           midRoll1: midRoll1.data,
//           midRoll2: midRoll2.data,
//           postRoll: postRoll.data,
//           onPauseRoll: onPauseRoll.data,
//         });
//       } catch (error) {
//         console.error('Error fetching VAST tags:', error);
//       }
//     };

//     fetchVastTags();
//   }, [content]);

// useEffect(()=> {
//   if(vastTags.preRoll){
//     setPlayerInitialized(true)
//   }
// },[vastTags])

//   useEffect(() => {
//     if (window.fluidPlayer && !playerInitialized && vastTags.preRoll) {
//       window.fluidPlayer('video-id', {
//         layoutControls: {
//           controlBar: {
//             autoHideTimeout: 3,
//             animated: true,
//             autoHide: true,
//           },
//           htmlOnPauseBlock: {
//             html: null,
//             height: '50%',
//             width: '50%',
//           },
//           autoPlay: true,
//           mute: true,
//           allowTheatre: true,
//           playPauseAnimation: false,
//           playbackRateEnabled: false,
//           allowDownload: false,
//           playButtonShowing: false,
//           fillToContainer: false,
//           posterImage: '',
//         },
//         vastOptions: {
//           adList: [
//             {
//               roll: 'preRoll',
//               vastTag: vastTags.preRoll,
//               adText: '',
//             },
//             {
//               roll: 'midRoll',
//               vastTag: vastTags.midRoll1,
//               adText: '',
//               timer: 30, 
//             },
//             {
//               roll: 'midRoll',
//               vastTag: vastTags.midRoll2,
//               adText: '',
//               timer: 60, 
//             },
//             {
//               roll: 'postRoll',
//               vastTag: vastTags.postRoll,
//               adText: '',
//             },
//             {
//               roll: 'onPauseRoll',
//               vastTag: vastTags.onPauseRoll,
//               adText: '',
//             },
//           ],
//           adCTAText: false,
//           adCTATextPosition: '',
//         },
//       });

//       setPlayerInitialized(true);
//     }
//   }, [vastTags, playerInitialized]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">Corporate Media Solutions</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <CurrentDesign />
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 Corporate Media Solutions. All rights reserved.</p>
      </footer>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={prevDesign}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextDesign}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const DesignOne = () => (
  <div className="w-full h-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/4 bg-blue-100 p-4">
        <div className="h-full flex flex-col justify-between">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Featured Product</h3>
            <p className="text-sm text-gray-600">
              Discover our latest innovation in business solutions.
            </p>
          </div>
          <div className="bg-blue-500 text-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Special Offer</h3>
            <p className="text-sm">
              Get 20% off on your first purchase. Limited time only!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center justify-center bg-gray-800">
              <video controls>
                <source
                  src="https://res.cloudinary.com/donhrlmxp/video/upload/v1723887134/aesk9cz6h3bp50m2meu0.mp4"
                  type="video/mp4"
                />
              </video>
            
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Corporate Success Stories</h2>
          <p className="text-gray-600">
            Watch how our solutions have transformed businesses worldwide.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/4 bg-blue-100 p-4">
        <div className="h-full flex flex-col justify-between">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Upcoming Webinar</h3>
            <p className="text-sm text-gray-600">
              Join us for insights on market trends and strategies.
            </p>
          </div>
          <div className="bg-blue-500 text-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-sm">
              24/7 assistance for all your business needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DesignTwo = () => (
  <div className="w-full h-full max-w-6xl bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg shadow-xl overflow-hidden">
    <div className="flex flex-col md:flex-row p-6 h-full">
      <div className="w-full md:w-1/4 pr-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">
            Market Insights
          </h3>
          <p className="text-sm text-gray-600">
            Stay ahead with our expert analysis and predictions.
          </p>
        </div>
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-4 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Product Launch</h3>
          <p className="text-sm">
            Be the first to know about our groundbreaking new service.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4 my-6 md:my-0 flex flex-col justify-center">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <Play size={64} className="text-white opacity-80" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">
            Elevate Your Business
          </h2>
          <p className="text-gray-700">
            Discover how our innovative solutions can propel your company to new
            heights.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/4 pl-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">
            Client Testimonials
          </h3>
          <p className="text-sm text-gray-600">
            See what industry leaders are saying about us.
          </p>
        </div>
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-4 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Book a Demo</h3>
          <p className="text-sm">
            Experience our cutting-edge platform firsthand.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CorporateAds;
