
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const QrScanButton = () => {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Book Scanned",
        description: "Harry Potter and the Philosopher's Stone (#BK123456)",
      });
    }, 1500);
  };

  return (
    <Button 
      onClick={handleScan} 
      disabled={isScanning}
      className="gap-2"
    >
      <QrCode className="h-4 w-4" />
      {isScanning ? "Scanning..." : "Scan Book QR"}
    </Button>
  );
};

export default QrScanButton;
