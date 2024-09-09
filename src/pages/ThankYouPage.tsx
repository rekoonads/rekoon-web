'use strict'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PlayCircle } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';


export default function ThankYouPage() {
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const domainName = import.meta.env.VITE_DOMAIN;
 


 

  const fetchNextVideo = async () => {
    try {
      const response = await axios.get(
        `${domainName}/api/get-video?type=Careers`,
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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-purple-800">
            Your Advertisement is ready!
          </h1>

          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden group">
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
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-4">
              We're thrilled to have you as part of our community. Your support
              means the world to us and helps us continue our mission.
            </p>
            <p className="text-lg text-gray-700">
              Check out the video above to see the impact of your contribution
              and what's coming next!
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/manage-advertise')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
