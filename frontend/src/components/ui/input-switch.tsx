"use client";

import { useState } from "react";
import { CameraInput } from "./camera-input";
import { UploadInput } from "./upload-input";
import { Button } from "./button";
import { Camera, Upload } from "lucide-react";

export function InputSwitch() {
    const [useCamera, setUseCamera] = useState<boolean>(false);
    return (
        <div className="w-[60vw] h-[400px] relative">
            {
                useCamera
                ?   <CameraInput/>
                :   <UploadInput/>
            }
            <Button className="absolute top-1 right-[-45px]" variant={"outline"} onClick={() => setUseCamera(prev=> !prev)}>
                {!useCamera && <Camera/>}
                {useCamera && <Upload/>}
            </Button>
        </div>
    );
}