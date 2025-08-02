"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Navigation,
  MapPin,
  Clock,
  Route,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock route data
const mockRouteData = {
  optimized: [
    {
      id: "PKG001",
      trackingId: "TRK001234567",
      recipient: "John Smith",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 234-567-8901",
      priority: "normal",
      estimatedTime: "10:30 AM",
      duration: "15 min",
      distance: "2.3 km",
      status: "pending",
      codAmount: 0,
      specialInstructions: "Ring doorbell twice",
    },
    {
      id: "PKG002",
      trackingId: "TRK001234568",
      recipient: "Sarah Johnson",
      address: "789 Oak St, Manhattan, NY 10002",
      phone: "+1 234-567-8902",
      priority: "urgent",
      estimatedTime: "11:00 AM",
      duration: "12 min",
      distance: "1.8 km",
      status: "pending",
      codAmount: 150,
      specialInstructions: "Urgent delivery - customer waiting",
    },
    {
      id: "PKG003",
      trackingId: "TRK001234569",
      recipient: "Mike Wilson",
      address: "555 Pine Ave, Brooklyn, NY 11201",
      phone: "+1 234-567-8903",
      priority: "normal",
      estimatedTime: "11:45 AM",
      duration: "20 min",
      distance: "4.1 km",
      status: "pending",
      codAmount: 0,
      specialInstructions: "Leave at front door if no answer",
    },
    {
      id: "PKG004",
      trackingId: "TRK001234570",
      recipient: "Emily Davis",
      address: "777 Elm St, Queens, NY 11101",
      phone: "+1 234-567-8904",
      priority: "normal",
      estimatedTime: "12:30 PM",
      duration: "18 min",
      distance: "3.5 km",
      status: "pending",
      codAmount: 75,
      specialInstructions: "Call before delivery",
    },
  ],
  summary: {
    totalDistance: "11.7 km",
    totalDuration: "2 hours 15 minutes",
    totalStops: 4,
    fuelCost: "$8.50",
    estimatedCompletion: "1:00 PM",
  },
};

export default function AgentRoutePage() {
  const [routeData, setRouteData] = useState(mockRouteData);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeStarted, setRouteStarted] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [routeMode, setRouteMode] = useState("fastest");
  const [avoidTolls, setAvoidTolls] = useState(false);
  const { toast } = useToast();

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true);

    try {
      // Simulate route optimization API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Route optimized successfully",
        description: `Optimized route for ${routeData.optimized.length} deliveries`,
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Failed to optimize route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleStartRoute = () => {
    setRouteStarted(true);
    toast({
      title: "Route started",
      description: "Navigation has begun. Drive safely!",
    });
  };

  const handlePauseRoute = () => {
    setRouteStarted(false);
    toast({
      title: "Route paused",
      description: "Navigation paused. Resume when ready.",
    });
  };

  const handleResetRoute = () => {
    setRouteStarted(false);
    setCurrentStop(0);
    toast({
      title: "Route reset",
      description: "Route has been reset to the beginning.",
    });
  };

  const handleNavigateToStop = (index: number) => {
    const stop = routeData.optimized[index];
    const encodedAddress = encodeURIComponent(stop.address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  const getPriorityColor = (priority: string) => {
    return priority === "urgent"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  };

  const getStopStatus = (index: number) => {
    if (index < currentStop) return "completed";
    if (index === currentStop && routeStarted) return "current";
    return "pending";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "current":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Delivery Route
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Optimized route for today's deliveries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleOptimizeRoute}
              disabled={isOptimizing}
            >
              <Route
                className={`h-4 w-4 mr-2 ${isOptimizing ? "animate-spin" : ""}`}
              />
              {isOptimizing ? "Optimizing..." : "Re-optimize"}
            </Button>
          </div>
        </div>

        {/* Route Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-blue-600" />
              Route Summary
            </CardTitle>
            <CardDescription>
              Overview of today's optimized delivery route
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-5">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {routeData.summary.totalStops}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Stops
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {routeData.summary.totalDistance}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Distance
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {routeData.summary.totalDuration}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Est. Duration
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {routeData.summary.fuelCost}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Fuel Cost
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">
                  {routeData.summary.estimatedCompletion}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Est. Completion
                </p>
              </div>
            </div>

            {/* Route Controls */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Route Mode:</label>
                  <Select value={routeMode} onValueChange={setRouteMode}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fastest">Fastest</SelectItem>
                      <SelectItem value="shortest">Shortest</SelectItem>
                      <SelectItem value="eco">Eco-friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!routeStarted ? (
                  <Button
                    onClick={handleStartRoute}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Route
                  </Button>
                ) : (
                  <Button
                    onClick={handlePauseRoute}
                    variant="outline"
                    className="bg-transparent"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Route
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleResetRoute}
                  className="bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Route Map
            </CardTitle>
            <CardDescription>
              Interactive map showing your optimized delivery route
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 h-96">
              {/* Mock Map Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="relative">
                    <div className="p-6 bg-white rounded-full shadow-lg dark:bg-gray-800">
                      <Truck className="w-12 h-12 text-blue-600" />
                    </div>
                    {routeStarted && (
                      <div className="absolute w-6 h-6 bg-green-500 rounded-full -top-2 -right-2 animate-ping"></div>
                    )}
                  </div>
                  <div className="max-w-sm p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <p className="text-sm font-medium">
                      {routeStarted ? "Route Active" : "Route Ready"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {routeStarted
                        ? `Next: ${routeData.optimized[currentStop]?.recipient}`
                        : "Click Start Route to begin navigation"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Status Indicator */}
              <div className="absolute top-4 left-4">
                <div className="p-3 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        routeStarted
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">
                      {routeStarted ? "Navigation Active" : "Navigation Paused"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="p-3 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {currentStop} of {routeData.optimized.length} stops
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="h-2 transition-all duration-300 bg-blue-600 rounded-full"
                      style={{
                        width: `${
                          (currentStop / routeData.optimized.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Stops */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Stops</CardTitle>
            <CardDescription>
              Your optimized delivery sequence for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routeData.optimized.map((stop, index) => {
                const status = getStopStatus(index);
                return (
                  <div
                    key={stop.id}
                    className={`border rounded-lg p-4 transition-all ${
                      status === "current"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start flex-1 space-x-4">
                        {/* Stop Number */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            status === "completed"
                              ? "bg-green-600 text-white"
                              : status === "current"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Stop Details */}
                        <div className="flex-1">
                          <div className="flex items-center mb-2 space-x-2">
                            <span className="font-medium">
                              {stop.trackingId}
                            </span>
                            <Badge className={getStatusColor(status)}>
                              {status}
                            </Badge>
                            <Badge className={getPriorityColor(stop.priority)}>
                              {stop.priority}
                            </Badge>
                            {stop.codAmount > 0 && (
                              <Badge
                                variant="outline"
                                className="text-green-800 bg-green-50"
                              >
                                COD ${stop.codAmount}
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Customer:
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {stop.recipient}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {stop.phone}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Delivery Info:
                              </p>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-600 dark:text-gray-300">
                                  {stop.estimatedTime} ({stop.duration})
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">
                                Distance: {stop.distance}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-start space-x-1">
                              <MapPin className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300">
                                {stop.address}
                              </p>
                            </div>
                          </div>

                          {stop.specialInstructions && (
                            <div className="p-2 mt-3 rounded bg-yellow-50 dark:bg-yellow-900/20">
                              <div className="flex items-start space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                  {stop.specialInstructions}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <Button
                          size="sm"
                          onClick={() => handleNavigateToStop(index)}
                          disabled={status === "completed"}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          Call Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Route Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Route Preferences
            </CardTitle>
            <CardDescription>
              Customize your route optimization settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-medium">Optimization Priority</h4>
                <Select value={routeMode} onValueChange={setRouteMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fastest">Fastest Route</SelectItem>
                    <SelectItem value="shortest">Shortest Distance</SelectItem>
                    <SelectItem value="eco">Eco-friendly</SelectItem>
                    <SelectItem value="traffic">Avoid Traffic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Route Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Avoid tolls</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Avoid highways</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      Prioritize urgent deliveries
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Vehicle Settings</h4>
                <Select defaultValue="van">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="van">Delivery Van</SelectItem>
                    <SelectItem value="truck">Small Truck</SelectItem>
                    <SelectItem value="bike">Motorcycle</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Button onClick={handleOptimizeRoute} disabled={isOptimizing}>
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isOptimizing ? "animate-spin" : ""
                  }`}
                />
                Apply & Re-optimize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
