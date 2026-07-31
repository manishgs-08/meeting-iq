import UploadPage from "./pages/UploadPage";
import TopNavigation from "./components/layout/TopNavigation";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans transition-colors duration-200">
      <TopNavigation />
      <UploadPage />
    </div>
  );
}
