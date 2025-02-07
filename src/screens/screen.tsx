import { Header } from "@/components/ui/header";

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

export const Screen = ({ children, className }: ScreenProps) => {
  return <div className={`flex flex-col h-screen ${className}`}>
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>
    <div className="flex-1 mt-16">
      {children}
    </div>
  </div>;
};
