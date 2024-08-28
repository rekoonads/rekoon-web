import { useEffect, useState, useRef } from 'react';
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
      const response = await axios.get(
        'http://localhost:3001/api/get-video?type=Careers',
      );
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
      videoElement.load(); // Reload the video with the new source
      videoElement.play().catch((err) => {
        console.error('Error attempting to play the video:', err);
      });
    }
  }, [videoSrc]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        autoPlay
        muted
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={prevDesign}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={nextDesign}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const DesignOne = () => <div>Design One</div>;

const DesignTwo = () => <div>Design Two</div>;

export default CorporateAds;
