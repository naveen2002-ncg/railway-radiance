
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Train, ArrowRightLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Mock data for popular stations
const popularStations = [
  { code: "NDLS", name: "New Delhi" },
  { code: "MAS", name: "Chennai Central" },
  { code: "HWH", name: "Howrah Junction" },
  { code: "BCT", name: "Mumbai Central" },
  { code: "SBC", name: "Bengaluru" },
  { code: "JAT", name: "Jammu Tawi" },
  { code: "LKO", name: "Lucknow" },
  { code: "ADI", name: "Ahmedabad" },
];

// Mock data for quota types
const quotaTypes = [
  { value: "GN", label: "General" },
  { value: "TQ", label: "Tatkal" },
  { value: "PT", label: "Premium Tatkal" },
  { value: "LD", label: "Ladies" },
  { value: "SS", label: "Senior Citizen" },
  { value: "DF", label: "Duty Pass" },
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [quota, setQuota] = useState("GN");

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results with query params
    navigate(
      `/search-results?from=${fromStation}&to=${toStation}&date=${format(
        date,
        "yyyy-MM-dd"
      )}&quota=${quota}`
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border-none">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="fromStation" className="block text-sm font-medium text-gray-700">
                  From
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select value={fromStation} onValueChange={setFromStation}>
                    <SelectTrigger id="fromStation" className="pl-10 w-full">
                      <SelectValue placeholder="From Station" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularStations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-end justify-center md:pt-7">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-dashed border-gray-300"
                  onClick={handleSwapStations}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="sr-only">Swap stations</span>
                </Button>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="toStation" className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select value={toStation} onValueChange={setToStation}>
                    <SelectTrigger id="toStation" className="pl-10 w-full">
                      <SelectValue placeholder="To Station" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularStations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Journey
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quota" className="block text-sm font-medium text-gray-700">
                  Quota
                </label>
                <Select value={quota} onValueChange={setQuota}>
                  <SelectTrigger id="quota">
                    <SelectValue placeholder="Select Quota" />
                  </SelectTrigger>
                  <SelectContent>
                    {quotaTypes.map((quotaType) => (
                      <SelectItem key={quotaType.value} value={quotaType.value}>
                        {quotaType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-irctc-blue hover:bg-irctc-blue/90"
                  disabled={!fromStation || !toStation}
                >
                  <Train className="mr-2 h-4 w-4" />
                  Search Trains
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
