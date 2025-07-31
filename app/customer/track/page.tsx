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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Phone,
  Mail,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Types for tracking data
type TrackingEvent = {
  status: string;
  timestamp: string;
  location: string;
  description: string;
  completed: boolean;
};

type TrackingData = {
  id: string;
  trackingId: string;
  status: string;
  recipient: string;
  recipientPhone: string;
  deliveryAddress: string;
  estimatedDelivery: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  agent: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
  timeline: TrackingEvent[];
  parcelDetails: {
    weight: string;
    dimensions: string;
    type: string;
    paymentMode: string;
    value: string;
  };
};

// Mock tracking data
const mockTrackingData: { [key: string]: TrackingData } = {
  PKG001: {
    id: "PKG001",
    trackingId: "TRK001234567",
    status: "in_transit",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    deliveryAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "2024-01-17 3:30 PM",
    currentLocation: {
      lat: 40.7128,
      lng: -74.006,
      address: "Distribution Center, Brooklyn, NY",
    },
    agent: {
      name: "Mike Johnson",
      phone: "+1 555-0123",
      vehicleNumber: "NYC-1234",
    },
    timeline: [
      {
        status: "Order Placed",
        timestamp: "2024-01-15 10:30 AM",
        location: "New York, NY",
        description: "Your parcel booking has been confirmed",
        completed: true,
      },
      {
        status: "Picked Up",
        timestamp: "2024-01-15 2:15 PM",
        location: "123 Sender St, New York, NY",
        description: "Parcel collected from pickup location",
        completed: true,
      },
      {
        status: "In Transit",
        timestamp: "2024-01-16 9:00 AM",
        location: "Distribution Center, Brooklyn, NY",
        description: "Parcel is being processed at our facility",
        completed: true,
      },
      {
        status: "Out for Delivery",
        timestamp: "Expected: 2024-01-17 1:00 PM",
        location: "Local Delivery Hub",
        description: "Parcel will be out for delivery",
        completed: false,
      },
      {
        status: "Delivered",
        timestamp: "Expected: 2024-01-17 3:30 PM",
        location: "123 Main St, New York, NY",
        description: "Parcel will be delivered to recipient",
        completed: false,
      },
    ],
    parcelDetails: {
      weight: "2.5 kg",
      dimensions: "30 x 20 x 15 cm",
      type: "Electronics",
      paymentMode: "prepaid",
      value: "$299.99",
    },
  },
};

export default function CustomerTrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast({
        title: "Please enter a tracking ID",
        description: "Tracking ID is required to search for your parcel",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data lookup
      const data = mockTrackingData[trackingId.toUpperCase()];

      if (data) {
        setTrackingData(data);
        toast({
          title: "Parcel found!",
          description: `Tracking information loaded for ${data.trackingId}`,
        });
      } else {
        toast({
          title: "Parcel not found",
          description: "Please check your tracking ID and try again",
          variant: "destructive",
        });
        setTrackingData(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tracking information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!trackingData) return;

    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);

    toast({
      title: "Updated",
      description: "Tracking information refreshed",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "picked_up":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout userRole="customer">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Track Your Parcel
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your tracking ID to get real-time updates
          </p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Track Parcel
            </CardTitle>
            <CardDescription>
              Enter your tracking ID (e.g., PKG001, TRK001234567) to view
              current status and location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="trackingId" className="sr-only">
                  Tracking ID
                </Label>
                <Input
                  id="trackingId"
                  placeholder="Enter tracking ID (e.g., PKG001)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                />
              </div>
              <Button
                onClick={handleTrack}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Track Parcel
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Current Status Card */}
            <Card>
              <CardHeader>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      {trackingData.trackingId}
                    </CardTitle>
                    <CardDescription>
                      To: {trackingData.recipient}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(trackingData.status)}>
                      {trackingData.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Current Location */}
                  <div className="space-y-4">
                    <h3 className="flex items-center font-semibold">
                      <MapPin className="w-4 h-4 mr-2 text-red-600" />
                      Current Location
                    </h3>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="font-medium">
                        {trackingData.currentLocation.address}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Last updated: 2 hours ago
                      </p>
                    </div>

                    {/* Mock Map Placeholder */}
                    <div className="flex items-center justify-center h-48 bg-gray-200 rounded-lg dark:bg-gray-700">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Interactive Map
                        </p>
                        <p className="text-xs text-gray-400">
                          Real-time location tracking
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="space-y-4">
                    <h3 className="flex items-center font-semibold">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      Delivery Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Estimated Delivery:
                        </span>
                        <span className="font-medium">
                          {trackingData.estimatedDelivery}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Delivery Address:
                        </span>
                        <span className="font-medium text-right">
                          {trackingData.deliveryAddress}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Delivery Agent:
                        </span>
                        <span className="font-medium">
                          {trackingData.agent.name}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Vehicle:
                        </span>
                        <span className="font-medium">
                          {trackingData.agent.vehicleNumber}
                        </span>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex flex-col gap-2 pt-4 sm:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Agent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Live Track
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
                <CardDescription>
                  Track your parcel's journey from pickup to delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {event.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <p
                              className={`font-medium ${
                                event.completed
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {event.status}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {event.description}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="inline w-3 h-3 mr-1" />
                              {event.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-sm ${
                                event.completed
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {event.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parcel Details */}
            <Card>
              <CardHeader>
                <CardTitle>Parcel Details</CardTitle>
                <CardDescription>
                  Information about your shipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Weight:
                      </span>
                      <span className="font-medium">
                        {trackingData.parcelDetails.weight}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Dimensions:
                      </span>
                      <span className="font-medium">
                        {trackingData.parcelDetails.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Type:
                      </span>
                      <span className="font-medium">
                        {trackingData.parcelDetails.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Declared Value:
                      </span>
                      <span className="font-medium">
                        {trackingData.parcelDetails.value}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Payment Mode:
                      </span>
                      <Badge variant="outline" className="capitalize">
                        {trackingData.parcelDetails.paymentMode}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Recipient Phone:
                      </span>
                      <span className="font-medium">
                        {trackingData.recipientPhone}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact our support team for assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Button
                variant="outline"
                className="flex-col h-16 space-y-2 bg-transparent"
              >
                <Phone className="w-6 h-6" />
                <span>Call Support</span>
                <span className="text-xs text-gray-500">1-800-COURIER</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-16 space-y-2 bg-transparent"
              >
                <Mail className="w-6 h-6" />
                <span>Email Support</span>
                <span className="text-xs text-gray-500">
                  help@couriertrack.com
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
