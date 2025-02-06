import { Header } from "@/components/ui/header";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  return <div className="flex flex-col h-screen">
    <Header />
    {children}
  </div>;
};
