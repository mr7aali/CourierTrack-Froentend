"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Truck,
  Home,
  Building,
  RefreshCw,
} from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  name: string;
  time: string;
  completed: boolean;
}

interface RealTimeMapProps {
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    lastUpdated: string;
  };
  route: Location[];
  deliveryAddress: string;
  agentInfo: {
    name: string;
    vehicleNumber: string;
    vehicleType: string;
  };
}

export function RealTimeMap({
  currentLocation,
  route,
  deliveryAddress,
  agentInfo,
}: RealTimeMapProps) {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setLastUpdate(new Date());
        // In real implementation, this would update the map with new coordinates
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getLocationIcon = (location: Location, index: number) => {
    if (index === 0) return <Building className="w-4 h-4 text-blue-600" />;
    if (index === route.length - 1)
      return <Home className="w-4 h-4 text-green-600" />;
    if (location.name === "Current Location")
      return <Truck className="w-4 h-4 text-red-600" />;
    return <MapPin className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 h-96">
        {/* Mock Map Interface */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="relative">
              {/* Animated delivery truck */}
              <div className="p-4 bg-white rounded-full shadow-lg dark:bg-gray-800 animate-pulse">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              {/* Pulsing location indicator */}
              <div className="absolute w-4 h-4 bg-red-500 rounded-full -top-2 -right-2 animate-ping"></div>
            </div>
            <div className="max-w-sm p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <p className="text-sm font-medium">{agentInfo.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {agentInfo.vehicleType} - {agentInfo.vehicleNumber}
              </p>
              <p className="mt-1 text-xs text-blue-600">
                {currentLocation.address}
              </p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute space-y-2 top-4 right-4">
          <Button
            size="sm"
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className="bg-white shadow-lg dark:bg-gray-800"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLive ? "animate-spin" : ""}`}
            />
            {isLive ? "Live" : "Paused"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white shadow-lg dark:bg-gray-800"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Directions
          </Button>
        </div>

        {/* Live Status Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className="p-3 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
              <span className="text-xs font-medium">
                {isLive ? "Live Tracking" : "Tracking Paused"}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              Updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Route Overlay */}
        <div className="absolute max-w-xs bottom-4 right-4">
          <div className="p-3 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <p className="mb-2 text-xs font-medium">Delivery Route</p>
            <div className="space-y-1">
              {route.slice(-2).map((location, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-xs"
                >
                  {getLocationIcon(location, index)}
                  <span
                    className={
                      location.completed
                        ? "text-green-600"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  >
                    {location.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h4 className="flex items-center mb-3 font-medium">
            <MapPin className="w-4 h-4 mr-2 text-red-600" />
            Current Location
          </h4>
          <div className="space-y-2 text-sm">
            <p className="font-medium">{currentLocation.address}</p>
            <p className="text-gray-600 dark:text-gray-300">
              Coordinates: {currentLocation.lat.toFixed(4)},{" "}
              {currentLocation.lng.toFixed(4)}
            </p>
            <p className="text-xs text-gray-500">
              Last updated: {currentLocation.lastUpdated}
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="flex items-center mb-3 font-medium">
            <Navigation className="w-4 h-4 mr-2 text-blue-600" />
            Route Progress
          </h4>
          <div className="space-y-2">
            {route.map((location, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  {getLocationIcon(location, index)}
                  <span
                    className={
                      location.completed
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500"
                    }
                  >
                    {location.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{location.time}</span>
                  {location.completed && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-800 bg-green-50"
                    >
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Map Legend */}
      <Card className="p-4">
        <h4 className="mb-3 font-medium">Map Legend</h4>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Distribution Center</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-red-600" />
            <span>Current Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 text-green-600" />
            <span>Delivery Address</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Tracking</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
