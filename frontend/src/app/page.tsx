import { ImageAnalyzer } from "@/components/ui/image-analyzer";
import { ImageContextProvider } from "@/context/image-context";

export default function HomePage() {
  return (
    <ImageContextProvider>
      <ImageAnalyzer/>
    </ImageContextProvider>
  );
}
