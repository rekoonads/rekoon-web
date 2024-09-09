import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PlayCircle } from 'lucide-react';

export default function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-purple-800">
            Thank You for Your Support!
          </h1>

          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden group">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
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
