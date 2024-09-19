import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const CorporateAds = () => {
  let count = 0;
  const [currentDesign, setCurrentDesign] = useState(0);
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);
  const designs = [DesignOne, DesignTwo];
  const domainName = import.meta.env.VITE_DOMAIN;

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
        `${domainName}/api/get-video?type=Careers`
      );
      const newVideoSrc = response.data;
      if (count === 0) {
        const meta_ads_res = await fetch(`${domainName}/api/create-meta-ads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoUrl: "https://res.cloudinary.com/donhrlmxp/video/upload/v1725860546/lbu8dh9orddjab04fnew.mp4",
          }),
        });
        console.log("meta ads created:- ", meta_ads_res);
        count++;
      }
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

  // Fullscreen for the entire page (like pressing F11)
  const requestFullScreen = () => {
    const documentElement = document.documentElement; // Refers to the entire page
    if (documentElement.requestFullscreen) {
      documentElement.requestFullscreen();
    } else if (documentElement.mozRequestFullScreen) { // For Firefox
      documentElement.mozRequestFullScreen();
    } else if (documentElement.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
      documentElement.webkitRequestFullscreen();
    } else if (documentElement.msRequestFullscreen) { // For Internet Explorer/Edge
      documentElement.msRequestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      requestFullScreen(); // Re-enter fullscreen if it gets exited
    }
  };

  useEffect(() => {
    requestFullScreen(); // Enter fullscreen on component mount

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noplaybackrate"
        onContextMenu={(e) => e.preventDefault()} // Disable right-click menu
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const DesignOne = () => <div>Design One</div>;

const DesignTwo = () => <div>Design Two</div>;

export default CorporateAds;
