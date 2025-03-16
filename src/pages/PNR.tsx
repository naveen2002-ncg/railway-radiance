
import { useState } from "react";
import { FileSearch, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PNR = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnrNumber.trim().length === 10) {
      setIsSubmitted(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-irctc-blue mb-6">PNR Status Enquiry</h1>
          
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-irctc-red" />
                Check PNR Status
              </CardTitle>
              <CardDescription>
                Enter your 10-digit PNR number to check the current status of your ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="pnr" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    PNR Number
                  </label>
                  <Input
                    id="pnr"
                    placeholder="Enter 10-digit PNR number"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value)}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="w-full"
                    required
                  />
                  <p className="text-xs text-gray-500">Example: 4513659871</p>
                </div>
                
                <Button type="submit" className="w-full bg-irctc-blue hover:bg-irctc-blue/90">
                  Check Status
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {isSubmitted && (
            <Alert className="bg-yellow-50 border-irctc-yellow">
              <Info className="h-4 w-4 text-irctc-blue" />
              <AlertTitle className="text-irctc-blue">PNR Status Demo</AlertTitle>
              <AlertDescription className="text-irctc-blue/80">
                This is a demo. In a real application, this would show the actual status
                of your ticket for PNR number {pnrNumber}.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-8">
            <h2 className="text-lg font-medium text-irctc-blue mb-4">How to find your PNR Number?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Your PNR number is printed on the top left corner of your ticket.</li>
              <li>If you booked online, check your booking confirmation email.</li>
              <li>You can also find it in the SMS sent to you after booking.</li>
              <li>For e-tickets, the PNR is displayed on the top of the ticket PDF.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PNR;
