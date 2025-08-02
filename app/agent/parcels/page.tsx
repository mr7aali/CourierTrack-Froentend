"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  MapPin,
  Clock,
  Phone,
  Navigation,
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Search,
  RefreshCw,
  Camera,
  Upload,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock assigned parcels data
const mockAssignedParcels = [
  {
    id: "PKG001",
    trackingId: "TRK001234567",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    pickupAddress: "456 Sender Ave, Brooklyn, NY 11201",
    deliveryAddress: "123 Main St, New York, NY 10001",
    status: "picked_up",
    priority: "normal",
    parcelType: "Electronics",
    weight: "2.5 kg",
    dimensions: "30x20x15 cm",
    value: 299.99,
    paymentMode: "prepaid",
    codAmount: 0,
    fragile: true,
    urgent: false,
    estimatedDelivery: "2024-01-17 3:30 PM",
    pickupTime: "2024-01-15 2:15 PM",
    specialInstructions: "Handle with care - fragile electronics",
    distance: "5.2 km",
    qrCode: "QR001234567",
  },
  {
    id: "PKG002",
    trackingId: "TRK001234568",
    recipient: "Sarah Johnson",
    recipientPhone: "+1 234-567-8902",
    pickupAddress: "321 Business Rd, Queens, NY 11101",
    deliveryAddress: "789 Oak St, Manhattan, NY 10002",
    status: "in_transit",
    priority: "urgent",
    parcelType: "Documents",
    weight: "0.5 kg",
    dimensions: "25x18x2 cm",
    value: 150.0,
    paymentMode: "cod",
    codAmount: 150.0,
    fragile: false,
    urgent: true,
    estimatedDelivery: "2024-01-17 2:00 PM",
    pickupTime: "2024-01-16 10:30 AM",
    specialInstructions: "Urgent delivery - customer waiting",
    distance: "3.8 km",
    qrCode: "QR001234568",
  },
  {
    id: "PKG003",
    trackingId: "TRK001234569",
    recipient: "Mike Wilson",
    recipientPhone: "+1 234-567-8903",
    pickupAddress: "123 Store St, Bronx, NY 10451",
    deliveryAddress: "555 Pine Ave, Staten Island, NY 10301",
    status: "out_for_delivery",
    priority: "normal",
    parcelType: "Clothing",
    weight: "1.2 kg",
    dimensions: "40x30x10 cm",
    value: 89.99,
    paymentMode: "prepaid",
    codAmount: 0,
    fragile: false,
    urgent: false,
    estimatedDelivery: "2024-01-17 4:15 PM",
    pickupTime: "2024-01-16 3:45 PM",
    specialInstructions: "Leave at front door if no answer",
    distance: "12.5 km",
    qrCode: "QR001234569",
  },
];

export default function AgentParcelsPage() {
  const [parcels, setParcels] = useState(mockAssignedParcels);
  const [filteredParcels, setFilteredParcels] = useState(mockAssignedParcels);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusNotes, setStatusNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  // Apply filters
  const applyFilters = () => {
    let filtered = parcels;

    if (searchTerm) {
      filtered = filtered.filter(
        (parcel) =>
          parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.deliveryAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((parcel) => parcel.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (parcel) => parcel.priority === priorityFilter
      );
    }

    setFilteredParcels(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "picked_up":
        return "bg-blue-100 text-blue-800";
      case "in_transit":
        return "bg-yellow-100 text-yellow-800";
      case "out_for_delivery":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "urgent"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "out_for_delivery":
        return <Package className="w-4 h-4 text-green-600" />;
      case "in_transit":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Package className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedParcel || !newStatus) return;

    setIsUpdating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update parcel status
      const updatedParcels = parcels.map((parcel) =>
        parcel.id === selectedParcel.id
          ? { ...parcel, status: newStatus }
          : parcel
      );

      setParcels(updatedParcels);
      applyFilters();

      toast({
        title: "Status updated successfully",
        description: `Parcel ${
          selectedParcel.trackingId
        } status changed to ${newStatus.replace("_", " ")}`,
      });

      setUpdateStatusDialog(false);
      setNewStatus("");
      setStatusNotes("");
      setSelectedParcel(null);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update parcel status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleScanQR = (parcel: any) => {
    toast({
      title: "QR Code Scanned",
      description: `Scanned parcel ${parcel.trackingId} successfully`,
    });
  };

  const handleGetDirections = (address: string) => {
    // In real implementation, this would open Google Maps with directions
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  const stats = {
    total: parcels.length,
    pickedUp: parcels.filter((p) => p.status === "picked_up").length,
    inTransit: parcels.filter((p) => p.status === "in_transit").length,
    outForDelivery: parcels.filter((p) => p.status === "out_for_delivery")
      .length,
    urgent: parcels.filter((p) => p.priority === "urgent").length,
    codTotal: parcels
      .filter((p) => p.codAmount > 0)
      .reduce((sum, p) => sum + p.codAmount, 0),
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Assigned Parcels
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your delivery assignments
            </p>
          </div>
          <Button
            onClick={() => {
              applyFilters();
              toast({ title: "Refreshed", description: "Parcel list updated" });
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Total Assigned
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.pickedUp}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Picked Up
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.inTransit}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  In Transit
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.outForDelivery}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Out for Delivery
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.urgent}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Urgent
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${stats.codTotal}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  COD Total
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Parcels</Label>
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    id="search"
                    placeholder="Tracking ID, recipient..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      applyFilters();
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status Filter</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority Filter</Label>
                <Select
                  value={priorityFilter}
                  onValueChange={(value) => {
                    setPriorityFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setPriorityFilter("all");
                    setFilteredParcels(parcels);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parcels List */}
        <div className="space-y-4">
          {filteredParcels.map((parcel) => (
            <Card key={parcel.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Parcel Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-3 space-x-2">
                      {getStatusIcon(parcel.status)}
                      <span className="text-lg font-medium">
                        {parcel.trackingId}
                      </span>
                      <Badge className={getStatusColor(parcel.status)}>
                        {parcel.status.replace("_", " ")}
                      </Badge>
                      <Badge className={getPriorityColor(parcel.priority)}>
                        {parcel.priority}
                      </Badge>
                      {parcel.fragile && (
                        <Badge
                          variant="outline"
                          className="text-yellow-800 bg-yellow-50"
                        >
                          Fragile
                        </Badge>
                      )}
                      {parcel.codAmount > 0 && (
                        <Badge
                          variant="outline"
                          className="text-green-800 bg-green-50"
                        >
                          COD ${parcel.codAmount}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Recipient:
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {parcel.recipient}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {parcel.recipientPhone}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Delivery Address:
                          </p>
                          <div className="flex items-start space-x-1">
                            <MapPin className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
                            <p className="text-gray-600 dark:text-gray-300">
                              {parcel.deliveryAddress}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Parcel Details:
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {parcel.parcelType} • {parcel.weight} •{" "}
                            {parcel.dimensions}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            Value: ${parcel.value}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Delivery Info:
                          </p>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <p className="text-gray-600 dark:text-gray-300">
                              {parcel.estimatedDelivery}
                            </p>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            Distance: {parcel.distance}
                          </p>
                        </div>
                      </div>
                    </div>

                    {parcel.specialInstructions && (
                      <div className="p-3 mt-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">
                              Special Instructions:
                            </p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              {parcel.specialInstructions}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <Button
                      onClick={() => {
                        setSelectedParcel(parcel);
                        setUpdateStatusDialog(true);
                      }}
                      className="w-full"
                    >
                      Update Status
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleScanQR(parcel)}
                      className="w-full bg-transparent"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Scan QR Code
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        handleGetDirections(parcel.deliveryAddress)
                      }
                      className="w-full bg-transparent"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Customer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredParcels.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  No parcels found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Update Status Dialog */}
        <Dialog open={updateStatusDialog} onOpenChange={setUpdateStatusDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Parcel Status</DialogTitle>
              <DialogDescription>
                Update the status for parcel {selectedParcel?.trackingId}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about the status update..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                />
              </div>

              {newStatus === "delivered" && (
                <div className="space-y-2">
                  <Label>Proof of Delivery</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setUpdateStatusDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={!newStatus || isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
