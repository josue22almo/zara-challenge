import { Header } from "@/components/ui/header";
import { LoadingBarRef, LoadingBar } from "@/components/ui/loading.bar";
import { useCharacterApiContext } from "@/use-character.api.context";
import { useRef, useEffect } from "react";

interface ScreenProps {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

export const Screen = ({ children, className, isLoading }: ScreenProps) => {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const { mode } = useCharacterApiContext();

  useEffect(() => {
    if (isLoading) {
      loadingBarRef.current?.start();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [isLoading]);


  return <div className={`flex flex-col h-screen ${className}`}>
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>
    <LoadingBar 
        isLoading={isLoading}
        ref={loadingBarRef}
        className="absolute top-[68px] left-0 right-0 z-[50]"
        color={mode === 'marvel' ? "red" : 'yellow'}
      />
    <div className="flex-1 mt-16">
      {children}
    </div>
  </div>;
};
