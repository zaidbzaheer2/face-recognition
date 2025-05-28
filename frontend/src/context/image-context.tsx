"use client";

import { AnalysisResponse } from "@/types";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface ImageContextProps {
    image: File | null,
    analyzing: boolean,
    analysisResponse: AnalysisResponse | null,
    setImage: (image: File | null) => void,
    setAnalysisResponse: (analysisResponse: AnalysisResponse | null) => void,
    analyzeImage: (image: File | null) => Promise<void>,
}
const ImageContext = createContext<ImageContextProps | undefined>(undefined);
export const ImageContextProvider = ({children} : {children: React.ReactNode}) => {
    const [analyzing, setAnalyzing] = useState<boolean>(false);
    const [analysisResponse, _setAnalysisResponse] = useState<AnalysisResponse | null>(null);
    const [image, _setImage] = useState<File | null>(null);
    
    const setImage = (image: File | null) => {
        _setImage(() => image);
        setAnalysisResponse(null);
    }
    const analyzeImage = async (image: File | null) => {
        if(!image) {
            toast.error("No Image Selected");
            return;
        }
        const formData = new FormData();
        formData.append('image', image);
        try {
            setAnalyzing(() => true);
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            })
            if(!response.ok) {
                toast.error("Bad Request");
            }
            toast.success("Image Analyzed!");
            const data = await response.json();
            setAnalysisResponse(data);
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        } finally {
            setAnalyzing(() => false);
        }
    }

    const setAnalysisResponse = (analysisResponse: AnalysisResponse | null) => {
        _setAnalysisResponse(() => analysisResponse);
    }

    return (
        <ImageContext.Provider value={{analyzing, image, setImage, analysisResponse, setAnalysisResponse, analyzeImage}}>
            {children}
        </ImageContext.Provider>
    );
} 
export const useImageContext = () => useContext(ImageContext);