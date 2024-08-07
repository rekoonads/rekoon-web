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
import { useState } from 'react';
import axios from 'axios';

export default function VideoUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Check file format
      const allowedFormats = ['video/mp4'];
      if (!allowedFormats.includes(file.type)) {
        setErrorMessage('Invalid file format. Only .mp4 is allowed.');
        return;
      }

      // Check file size (max 500MB)
      const maxSize = 500 * 1024 * 1024; // 500MB in bytes
      if (file.size > maxSize) {
        setErrorMessage('File size exceeds the maximum limit of 500MB.');
        return;
      }

      // Validate video properties
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        const { videoWidth, videoHeight, duration } = videoElement;

        // Check resolution (1080p)
        if (videoWidth !== 1920 || videoHeight !== 1080) {
          setErrorMessage(
            'Invalid resolution. Only 1080p (1920x1080) is allowed.',
          );
          return;
        }

        // Check aspect ratio (16:9)
        if (videoWidth / videoHeight !== 16 / 9) {
          setErrorMessage('Invalid aspect ratio. Only 16:9 is allowed.');
          return;
        }

        // Check video length (5 to 30 seconds)
        if (duration < 5 || duration > 30) {
          setErrorMessage(
            'Invalid video length. Must be between 5 and 30 seconds.',
          );
          return;
        }

        // If all validations pass, upload the video
        setErrorMessage(null);
        setIsUploading(true);
        const formData = new FormData();
        formData.append('video', file);

        axios
          .post('http://localhost:3001/upload_video', formData, {
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
            console.log(response);
          })
          .catch((error) => {
            setErrorMessage('Upload failed. Please try again.');
            setIsUploading(false);
          });
      };
    } else {
      setFileName(null);
      setIsUploading(false);
      setIsUploadComplete(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
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
          />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Guidelines for video creatives</Label>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Resolution: 1080p (HD): 1920x1080
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Aspect ratio: 16:9
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Format: .mp4
              </li>
            </ul>
          </div>
          <div className="grid gap-2">
            <Label>Guidelines for video creatives</Label>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Maximum file size: Up to 500MB
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Length between 5 and 30 seconds
              </li>
            </ul>
          </div>
        </div>
        {isUploading && (
          <div className="grid gap-2">
            <Label>Upload Progress</Label>
            <Progress value={uploadProgress} aria-label="Upload progress" />
          </div>
        )}
        {isUploadComplete && (
          <div className="aspect-video bg-muted rounded-md overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Preview"
              width={800}
              height={450}
              className="object-cover w-full h-full"
              style={{ aspectRatio: '800/450', objectFit: 'cover' }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
