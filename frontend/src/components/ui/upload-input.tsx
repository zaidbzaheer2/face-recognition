"use client";

import { useImageContext } from "@/context/image-context";
import { Upload, X } from "lucide-react";
import { Button } from "./button";
import { useState, useEffect } from "react";

export function UploadInput() {
    const { setImage } = useImageContext()!;
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    const clearImage = () => {
        setImage(null);
        setPreview(null);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="flex w-full h-full flex-col items-center justify-center p-2 rounded-xl bg-card relative">
            {preview ? (
              <div className="relative w-full h-full flex items-center justify-center">
    <img
        src={preview}
        alt="Preview"
        className="top-0 left-0 w-full h-full object-contain rounded-lg"
    />
    <button
        onClick={clearImage}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
    >
        <X size={20} />
    </button>
</div>

            ) : (
                <>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <Button className="scale-125 mb-5" onClick={triggerFileInput}>
                        <Upload />
                    </Button>

                    Upload from Device
                </>
            )}
        </div>
    );
}
