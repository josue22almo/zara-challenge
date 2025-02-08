import { Header } from "@/components/ui/header";
import { LoadingBarRef, LoadingBar } from "@/components/ui/loading.bar";
import { cn } from "@/lib/utils";
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


  return <div id="screen" className={
    cn(
      "flex flex-col h-screen pb-6",
      "xl:pb-none",
      className
    )
  }>
    <Header />
    <LoadingBar 
        isLoading={isLoading}
        ref={loadingBarRef}
        className="absolute top-[84px] left-0 right-0 z-[50]"
        color={mode === 'marvel' ? "red" : 'yellow'}
      />
    <div className="flex-1 mt-[84px]" id="screen-content">
      {children}
    </div>
  </div>;
};
