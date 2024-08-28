import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const CorporateAds = () => {
  const [currentDesign, setCurrentDesign] = useState(0);
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);
  const designs = [DesignOne, DesignTwo];

  const nextDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % designs.length);
  };

  const prevDesign = () => {
    setCurrentDesign((prev) => (prev - 1 + designs.length) % designs.length);
  };

  const CurrentDesign = designs[currentDesign];

  const fetchNextVideo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-video?type=Careers');
      const newVideoSrc = response.data;
      setVideoSrc(newVideoSrc);
    } catch (error) {
      console.error('Error fetching next video:', error);
    }
  };

  useEffect(() => {
    fetchNextVideo();
  }, []);

  useEffect(() => {
    const handleVideoEnd = () => {
      fetchNextVideo();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && videoSrc) {
      videoElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
      videoElement.load(); // Ensure the video is reloaded
      videoElement.play().catch(err => {
        console.error('Error attempting to play the video:', err);
      });
    }
  }, [videoSrc]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">Corporate Media Solutions</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <CurrentDesign />
        <div className="w-full max-w-6xl mt-4">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <video ref={videoRef} controls autoPlay muted>
              {videoSrc && (
                <source src={videoSrc} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
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
  // DesignOne component code
  <div>Design One</div>
);

const DesignTwo = () => (
  // DesignTwo component code
  <div>Design Two</div>
);

export default CorporateAds;
