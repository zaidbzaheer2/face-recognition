"use client";

import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useImageContext } from "@/context/image-context";
import { Button } from "./button";
import { X, Camera } from "lucide-react";

export function CameraInput() {
  const { setImage } = useImageContext()!;
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Capture image as a base64 data URL
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);

        // Convert base64 to a File object and call setImage
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setImage(file);
          });
      }
    }
  };

  // Clear captured image and reset
  const clearImage = () => {
    setCapturedImage(null);
    setImage(null as any); // Adjust if setImage accepts nullable
  };

  // Webcam constraints (optional)
  const videoConstraints = {
    facingMode: "user", // front camera, use 'environment' for rear camera
  };

  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-2 rounded-xl bg-card relative">
      {capturedImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
          />
          <Button className="mt-4 absolute left-[50%] translate-[-50%] bottom-1 " onClick={capture}>
            <Camera size={16} className="mr-2" />
            Capture
          </Button>
        </div>
      )}
    </div>
  );
}