"use client";
import { useImageContext } from "@/context/image-context";
import { InputSwitch } from "./input-switch";
import { Button } from "./button";
import ResultsDisplay from "./results-display";
import { MoonLoader } from "react-spinners";

export function ImageAnalyzer() {
    const { image, analyzeImage, analysisResponse, analyzing } = useImageContext()!;

    const handleSubmit = async () => {
        await analyzeImage(image);
    }
    return (
        <div className="">
            <InputSwitch />
            <Button className="w-full mt-2" onClick={handleSubmit} disabled={analyzing || !image}>
                {!analyzing && "Analyze"}
                {analyzing && <MoonLoader color="black" size={20}/>}
            </Button>
            { analysisResponse && <ResultsDisplay analysisResponse={analysisResponse}/> }
        </div>
    );
}