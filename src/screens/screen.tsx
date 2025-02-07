import { Header } from "@/components/ui/header";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  return <div className="flex flex-col h-screen">
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>
    <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 mt-16 py-12 space-y-6">
      {children}
    </div>
  </div>;
};
