import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { CheckIcon } from 'lucide-react';

interface BannerUploadProps {
  onURLSet: (url: string | null) => void;
}

export default function BannerUpload({ onURLSet }: BannerUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const allowedFormats = ['image/jpeg', 'image/png'];
      if (!allowedFormats.includes(file.type)) {
        setErrorMessage('Invalid file format. Only .jpg and .png are allowed.');
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrorMessage('File size exceeds the maximum limit of 5MB.');
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const { width, height } = img;

        if (width !== 1920 || height !== 1080) {
          setErrorMessage('Invalid resolution. Only 1920x1080 is allowed.');
          return;
        }

        setErrorMessage(null);
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cfwxrnl4'); // Replace with your preset

        axios
          .post(
            'https://api.cloudinary.com/v1_1/donhrlmxp/image/upload',
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress(progress);
              },
            },
          )
          .then((response) => {
            setIsUploading(false);
            setIsUploadComplete(true);
            setUrl(response.data.secure_url);
            onURLSet(response.data.secure_url);
          })
          .catch((error) => {
            setErrorMessage('Upload failed. Please try again.');
            setIsUploading(false);
          });
      };
    } else {
      setIsUploading(false);
      setIsUploadComplete(false);
      onURLSet(null);
    }
  };

  return (
    <Card className="text-blue-900 font-semibold text-[20px] dark:text-white">
      <CardHeader>
        <CardTitle>Upload Banner</CardTitle>
        <CardDescription>
          Add a banner image to your campaign by uploading it here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="file">Select file</Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="grid gap-2">
          <Label>Guidelines for banner images</Label>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 fill-green-500" /> Resolution:
              1920x1080 pixels
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 fill-green-500" /> Format: .jpg or
              .png
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 fill-green-500" /> Maximum file
              size: 5MB
            </li>
          </ul>
        </div>
        {isUploading && (
          <div>
            <Progress value={uploadProgress} />
            <p>Uploading... {uploadProgress}%</p>
          </div>
        )}
        {url && (
          <div className="mt-4">
            <img
              src={url}
              alt="Uploaded banner"
              className="max-w-full h-auto"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
