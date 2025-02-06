import { Header } from "@/components/ui/header";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  return <div className="flex flex-col h-screen">
    <Header />
    <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12">
      {children}
    </div>
  </div>;
};
