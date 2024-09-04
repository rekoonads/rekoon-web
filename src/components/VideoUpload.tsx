import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { CheckIcon } from 'lucide-react';
import mobileMock from '../assets/images/mobile_mock.jpg';
import tabletMock from '../assets/images/tablet_mock.jpg';
import televisionMock from '../assets/images/tv_mock.jpg';

interface VideoUploadProps {
  onURLSet: (url: string | null) => void;
  onVideoDuration: (videoDuration: number | null) => void;
  vidUrl: string;
}

export default function VideoUpload({
  onURLSet,
  onVideoDuration,
  vidUrl,
}: VideoUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<string>('mobile');
  const domainName = import.meta.env.VITE_DOMAIN;

  useEffect(() => {
    setUrl(vidUrl);
  }, [vidUrl]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const allowedFormats = ['video/mp4'];
      if (!allowedFormats.includes(file.type)) {
        setErrorMessage('Invalid file format. Only .mp4 is allowed.');
        return;
      }

      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrorMessage('File size exceeds the maximum limit of 500MB.');
        return;
      }

      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);

      videoElement.onloadedmetadata = () => {
        const { videoWidth, videoHeight, duration } = videoElement;

        if (videoWidth !== 1920 || videoHeight !== 1080) {
          setErrorMessage(
            'Invalid resolution. Only 1080p (1920x1080) is allowed.',
          );
          return;
        }

        if (videoWidth / videoHeight !== 16 / 9) {
          setErrorMessage('Invalid aspect ratio. Only 16:9 is allowed.');
          return;
        }

        if (duration < 5 || duration > 30) {
          setErrorMessage(
            'Invalid video length. Must be between 5 and 30 seconds.',
          );
          return;
        }

        setVideoDuration(Math.round(duration));

        setErrorMessage(null);
        setIsUploading(true);
        const formData = new FormData();
        formData.append('video', file);

        axios
          .post(`${domainName}/upload_video`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress(progress);
              }
            },
          })
          .then((response) => {
            setFileName(file.name);
            setIsUploadComplete(true);
            setIsUploading(false);
            setUrl(response.data?.url);
            onURLSet(response.data?.url);
          })
          .catch((error) => {
            setErrorMessage('Upload failed. Please try again.');
            setIsUploading(false);
          });
      };

      videoElement.onloadeddata = () => {
        if (videoElement.duration) {
          setVideoDuration(Math.round(videoElement.duration));
        }
      };
    } else {
      setFileName(null);
      setIsUploading(false);
      setIsUploadComplete(false);
      setVideoDuration(null);
      onURLSet(null);
    }
  };

  useEffect(() => {
    if (videoDuration) {
      onVideoDuration(videoDuration);
    }
  }, [videoDuration]);

  const renderPreview = () => {
    const deviceMockups = {
      mobile: `url(${mobileMock})`,
      tablet: `url(${tabletMock})`,
      television: `url(${televisionMock})`,
    };

    const deviceStyles = {
      mobile: {
        width: '375px',
        height: '667px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: deviceMockups[deviceType],
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      },
      tablet: {
        width: '500px',
        height: '758px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: deviceMockups[deviceType],
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      },
      television: {
        width: '640px',
        height: '540px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: deviceMockups[deviceType],
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      },
    };

    const videoStyles = {
      mobile: {
        position: 'absolute',
        top: '12%', // Adjust these values to properly position the video inside the mockup
        left: '15%',
        width: '70%', // Adjust these values based on the mockup design
        height: '76%',
        objectFit: 'contain',
        borderRadius: 'inherit',
      },
      tablet: {
        position: 'absolute',
        top: '12%',
        left: '12%',
        width: '76%',
        height: '76%',
        objectFit: 'contain',
        borderRadius: 'inherit',
      },
      television: {
        position: 'absolute',
        top: '0%',
        left: '9%',
        width: '79%',
        height: '68%',
        objectFit: 'contain',
        borderRadius: 'inherit',
      },
    };

    return (
      <div className="relative" style={deviceStyles[deviceType]}>
        <video
          src={url}
          controls
          className="absolute"
          style={videoStyles[deviceType]}
        />
        {videoDuration !== null && (
          <div className="text-sm mt-2 text-white absolute bottom-2 left-2">
            Duration: {videoDuration} seconds
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="text-blue-900 font-semibold text-[20px] dark:text-white">
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>
          Add images or videos to your account by uploading them here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="file">Select file</Label>
          <Input
            id="file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Guidelines for video creatives</Label>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" /> Resolution:
                1080p (HD): 1920x1080
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" /> Aspect ratio:
                16:9
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" /> Format: .mp4
              </li>
            </ul>
          </div>
          <div className="grid gap-2">
            <Label>Additional guidelines</Label>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" /> Maximum file
                size: Up to 500MB
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" /> Length between
                5 and 30 seconds
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="deviceType">Choose Device Preview</Label>
          <select
            id="deviceType"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="p-2 border rounded text-blue-900 font-semibold text-[15px] dark:text-black"
          >
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="television">Television</option>
          </select>
        </div>
        {isUploading && (
          <div>
            <Progress value={uploadProgress} />
            <p>Uploading... {uploadProgress}%</p>
          </div>
        )}
        {url && renderPreview()}
      </CardContent>
    </Card>
  );
}
