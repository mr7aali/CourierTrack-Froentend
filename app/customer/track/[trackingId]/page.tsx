"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Phone,
  Navigation,
  RefreshCw,
  User,
  ArrowLeft,
  Share,
  Bell,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";
import { RealTimeMap } from "@/components/real-time-map";
// import { RealTimeMap } from "@/components/real-time-map";

// Mock real-time tracking data
const mockTrackingData = {
  PKG001: {
    id: "PKG001",
    trackingId: "TRK001234567",
    status: "out_for_delivery",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    deliveryAddress: "123 Main St, New York, NY 10001",
    pickupAddress: "456 Sender Ave, Brooklyn, NY 11201",
    estimatedDelivery: "Today, 3:30 PM",
    currentLocation: {
      lat: 40.7589,
      lng: -73.9851,
      address: "5th Avenue, Manhattan, NY",
      lastUpdated: "2 minutes ago",
    },
    agent: {
      name: "Mike Johnson",
      phone: "+1 555-0123",
      vehicleNumber: "NYC-1234",
      vehicleType: "Van",
      photo: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    route: [
      {
        lat: 40.6892,
        lng: -74.0445,
        name: "Distribution Center",
        time: "8:00 AM",
        completed: true,
      },
      {
        lat: 40.7282,
        lng: -73.7949,
        name: "Queens Hub",
        time: "10:30 AM",
        completed: true,
      },
      {
        lat: 40.7589,
        lng: -73.9851,
        name: "Current Location",
        time: "Now",
        completed: false,
      },
      {
        lat: 40.7505,
        lng: -73.9934,
        name: "Delivery Address",
        time: "3:30 PM",
        completed: false,
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        timestamp: "Jan 15, 10:30 AM",
        location: "New York, NY",
        description: "Your parcel booking has been confirmed",
        completed: true,
      },
      {
        status: "Picked Up",
        timestamp: "Jan 15, 2:15 PM",
        location: "456 Sender Ave, Brooklyn, NY",
        description: "Parcel collected from pickup location",
        completed: true,
      },
      {
        status: "In Transit",
        timestamp: "Jan 16, 9:00 AM",
        location: "Distribution Center, Brooklyn, NY",
        description: "Parcel processed and dispatched",
        completed: true,
      },
      {
        status: "Out for Delivery",
        timestamp: "Jan 17, 1:00 PM",
        location: "Local Delivery Hub, Manhattan",
        description: "Parcel is out for delivery with agent Mike Johnson",
        completed: true,
      },
      {
        status: "Delivered",
        timestamp: "Expected: Jan 17, 3:30 PM",
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
      fragile: true,
      urgent: false,
    },
    notifications: [
      { time: "2 min ago", message: "Your parcel is 5 minutes away" },
      { time: "15 min ago", message: "Delivery agent is on the way" },
      { time: "1 hour ago", message: "Parcel out for delivery" },
    ],
  },
};

interface PageProps {
  params: {
    trackingId: string;
  };
}

export default function TrackParcelPage({ params }: PageProps) {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  const trackingId = params.trackingId.toUpperCase();

  // Simulate real-time updates
  useEffect(() => {
    const fetchTrackingData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data =
          mockTrackingData[trackingId as keyof typeof mockTrackingData];
        if (data) {
          setTrackingData(data);
        } else {
          toast({
            title: "Parcel not found",
            description: "Please check your tracking ID and try again",
            variant: "destructive",
          });
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

    fetchTrackingData();

    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      if (trackingData) {
        setLastUpdated(new Date());
        // In real implementation, this would fetch updated location data
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [trackingId, toast]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setLastUpdated(new Date());

    toast({
      title: "Updated",
      description: "Tracking information refreshed",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Tracking link copied to clipboard",
    });
  };

  const handleCallAgent = () => {
    if (trackingData?.agent?.phone) {
      window.open(`tel:${trackingData.agent.phone}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "in_transit":
        return "bg-yellow-100 text-yellow-800";
      case "picked_up":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressPercentage = () => {
    if (!trackingData) return 0;
    const completedSteps = trackingData.timeline.filter(
      (step: any) => step.completed
    ).length;
    return (completedSteps / trackingData.timeline.length) * 100;
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="customer">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 mx-auto mb-4 text-blue-600 animate-spin" />
            <p className="text-gray-600 dark:text-gray-300">
              Loading tracking information...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!trackingData) {
    return (
      <DashboardLayout userRole="customer">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="py-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Parcel Not Found
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We couldn't find a parcel with tracking ID: {trackingId}
            </p>
            <Link href="/customer/track">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="customer">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-4">
            <Link href="/customer/track">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Real-Time Tracking
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {trackingData.trackingId} • To: {trackingData.recipient}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="flex items-center mb-4 space-x-3">
                  <Badge
                    className={`${getStatusColor(
                      trackingData.status
                    )} px-3 py-1 text-lg`}
                  >
                    {trackingData.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Last updated: {trackingData.currentLocation.lastUpdated}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Delivery Progress</span>
                    <span>{Math.round(getProgressPercentage())}% Complete</span>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-2" />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Current Location:
                    </p>
                    <p className="font-medium">
                      {trackingData.currentLocation.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Estimated Delivery:
                    </p>
                    <p className="font-medium text-blue-600">
                      {trackingData.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleCallAgent} className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Agent
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Live Location Tracking
                </CardTitle>
                <CardDescription>
                  Real-time parcel location and delivery route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RealTimeMap
                  currentLocation={trackingData.currentLocation}
                  route={trackingData.route}
                  deliveryAddress={trackingData.deliveryAddress}
                  agentInfo={trackingData.agent}
                />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
                <CardDescription>
                  Track your parcel's journey step by step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {event.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full dark:border-gray-600 dark:bg-gray-800" />
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
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              {event.description}
                            </p>
                            <p className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="w-3 h-3 mr-1" />
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Delivery Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 space-x-3">
                  <img
                    src={trackingData.agent.photo || "/placeholder.svg"}
                    alt={trackingData.agent.name}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{trackingData.agent.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ⭐ {trackingData.agent.rating} rating
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Phone:
                    </span>
                    <span className="font-medium">
                      {trackingData.agent.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Vehicle:
                    </span>
                    <span className="font-medium">
                      {trackingData.agent.vehicleType} -{" "}
                      {trackingData.agent.vehicleNumber}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={handleCallAgent}
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-yellow-600" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackingData.notifications.map(
                    (notification: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Parcel Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-purple-600" />
                  Parcel Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Type:
                    </span>
                    <span className="font-medium">
                      {trackingData.parcelDetails.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Weight:
                    </span>
                    <span className="font-medium">
                      {trackingData.parcelDetails.weight}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Dimensions:
                    </span>
                    <span className="font-medium">
                      {trackingData.parcelDetails.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Value:
                    </span>
                    <span className="font-medium">
                      {trackingData.parcelDetails.value}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Payment:
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {trackingData.parcelDetails.paymentMode}
                    </Badge>
                  </div>

                  {(trackingData.parcelDetails.fragile ||
                    trackingData.parcelDetails.urgent) && (
                    <div className="pt-2">
                      <div className="flex gap-2">
                        {trackingData.parcelDetails.fragile && (
                          <Badge
                            variant="outline"
                            className="text-yellow-800 bg-yellow-50"
                          >
                            Fragile
                          </Badge>
                        )}
                        {trackingData.parcelDetails.urgent && (
                          <Badge
                            variant="outline"
                            className="text-red-800 bg-red-50"
                          >
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="justify-start w-full bg-transparent"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start w-full bg-transparent"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Set Notifications
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start w-full bg-transparent"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
