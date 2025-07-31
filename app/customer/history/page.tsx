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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  Eye,
  RotateCcw,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock history data
const mockHistoryData = [
  {
    id: "PKG001",
    trackingId: "TRK001234567",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    deliveryAddress: "123 Main St, New York, NY 10001",
    pickupAddress: "456 Sender Ave, New York, NY 10002",
    status: "delivered",
    createdAt: "2024-01-15",
    deliveredAt: "2024-01-17",
    estimatedDelivery: "2024-01-17",
    parcelType: "Electronics",
    weight: "2.5 kg",
    paymentMode: "prepaid",
    value: 299.99,
    codAmount: 0,
    urgent: false,
    fragile: true,
  },
  {
    id: "PKG002",
    trackingId: "TRK001234568",
    recipient: "Sarah Johnson",
    recipientPhone: "+1 234-567-8902",
    deliveryAddress: "789 Oak St, Los Angeles, CA 90001",
    pickupAddress: "321 Business Rd, New York, NY 10003",
    status: "in_transit",
    createdAt: "2024-01-16",
    deliveredAt: null,
    estimatedDelivery: "2024-01-19",
    parcelType: "Documents",
    weight: "0.5 kg",
    paymentMode: "cod",
    value: 150.0,
    codAmount: 150.0,
    urgent: true,
    fragile: false,
  },
  {
    id: "PKG003",
    trackingId: "TRK001234569",
    recipient: "Mike Wilson",
    recipientPhone: "+1 234-567-8903",
    deliveryAddress: "555 Pine Ave, Chicago, IL 60601",
    pickupAddress: "123 Store St, New York, NY 10004",
    status: "failed",
    createdAt: "2024-01-14",
    deliveredAt: null,
    estimatedDelivery: "2024-01-16",
    parcelType: "Clothing",
    weight: "1.2 kg",
    paymentMode: "prepaid",
    value: 89.99,
    codAmount: 0,
    urgent: false,
    fragile: false,
  },
  {
    id: "PKG004",
    trackingId: "TRK001234570",
    recipient: "Emily Davis",
    recipientPhone: "+1 234-567-8904",
    deliveryAddress: "777 Elm St, Miami, FL 33101",
    pickupAddress: "999 Pickup Ln, New York, NY 10005",
    status: "pending",
    createdAt: "2024-01-18",
    deliveredAt: null,
    estimatedDelivery: "2024-01-20",
    parcelType: "Food Items",
    weight: "3.0 kg",
    paymentMode: "cod",
    value: 75.5,
    codAmount: 75.5,
    urgent: false,
    fragile: true,
  },
  {
    id: "PKG005",
    trackingId: "TRK001234571",
    recipient: "Robert Brown",
    recipientPhone: "+1 234-567-8905",
    deliveryAddress: "888 Maple Dr, Seattle, WA 98101",
    pickupAddress: "111 Origin St, New York, NY 10006",
    status: "delivered",
    createdAt: "2024-01-10",
    deliveredAt: "2024-01-12",
    estimatedDelivery: "2024-01-12",
    parcelType: "Electronics",
    weight: "4.5 kg",
    paymentMode: "prepaid",
    value: 599.99,
    codAmount: 0,
    urgent: true,
    fragile: true,
  },
];

export default function CustomerHistoryPage() {
  const [parcels, setParcels] = useState(mockHistoryData);
  const [filteredParcels, setFilteredParcels] = useState(mockHistoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const { toast } = useToast();

  // Filter parcels based on search and filters
  const applyFilters = () => {
    let filtered = parcels;

    // Search filter
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

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((parcel) => parcel.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (parcel) => parcel.paymentMode === paymentFilter
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "7days":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "30days":
          filterDate.setDate(now.getDate() - 30);
          break;
        case "90days":
          filterDate.setDate(now.getDate() - 90);
          break;
      }

      if (dateFilter !== "all") {
        filtered = filtered.filter(
          (parcel) => new Date(parcel.createdAt) >= filterDate
        );
      }
    }

    setFilteredParcels(filtered);
  };

  // Apply filters whenever search term or filters change
  useState(() => {
    applyFilters();
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in_transit":
      case "out_for_delivery":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReorder = (parcel: any) => {
    toast({
      title: "Reorder initiated",
      description: `Creating new booking based on ${parcel.trackingId}`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your booking history will be downloaded as CSV",
    });
  };

  const stats = {
    total: parcels.length,
    delivered: parcels.filter((p) => p.status === "delivered").length,
    inTransit: parcels.filter(
      (p) => p.status === "in_transit" || p.status === "out_for_delivery"
    ).length,
    failed: parcels.filter((p) => p.status === "failed").length,
    totalValue: parcels.reduce((sum, p) => sum + p.value, 0),
  };

  return (
    <DashboardLayout userRole="customer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Booking History
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage all your parcel bookings
            </p>
          </div>
          <Button onClick={handleExport} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Delivered
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.delivered}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    In Transit
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.inTransit}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Failed
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.failed}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold">
                    ${stats.totalValue.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
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
                <Label>Status</Label>
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Payment</Label>
                <Select
                  value={paymentFilter}
                  onValueChange={(value) => {
                    setPaymentFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                    <SelectItem value="cod">COD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select
                  value={dateFilter}
                  onValueChange={(value) => {
                    setDateFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
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
                    setPaymentFilter("all");
                    setDateFilter("all");
                    setFilteredParcels(parcels);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              Booking History ({filteredParcels.length} results)
            </CardTitle>
            <CardDescription>
              {filteredParcels.length === parcels.length
                ? "Showing all bookings"
                : `Filtered from ${parcels.length} total bookings`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredParcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className="p-4 transition-colors border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        {getStatusIcon(parcel.status)}
                        <span className="font-medium">{parcel.trackingId}</span>
                        <Badge className={getStatusColor(parcel.status)}>
                          {parcel.status.replace("_", " ")}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {parcel.paymentMode}
                        </Badge>
                        {parcel.urgent && (
                          <Badge
                            variant="outline"
                            className="text-red-800 bg-red-50"
                          >
                            Urgent
                          </Badge>
                        )}
                        {parcel.fragile && (
                          <Badge
                            variant="outline"
                            className="text-yellow-800 bg-yellow-50"
                          >
                            Fragile
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2 dark:text-gray-300">
                        <div>
                          <p>
                            <strong>To:</strong> {parcel.recipient}
                          </p>
                          <p>
                            <strong>Phone:</strong> {parcel.recipientPhone}
                          </p>
                          <div className="flex items-start mt-1 space-x-1">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{parcel.deliveryAddress}</span>
                          </div>
                        </div>
                        <div>
                          <p>
                            <strong>Booked:</strong>{" "}
                            {new Date(parcel.createdAt).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Type:</strong> {parcel.parcelType} (
                            {parcel.weight})
                          </p>
                          <p>
                            <strong>Value:</strong> ${parcel.value.toFixed(2)}
                            {parcel.codAmount > 0 &&
                              ` (COD: $${parcel.codAmount.toFixed(2)})`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedParcel(parcel)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(parcel)}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredParcels.length === 0 && (
                <div className="py-12 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    No bookings found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed View Modal (simplified as card for now) */}
        {selectedParcel && (
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    Parcel Details - {selectedParcel.trackingId}
                  </CardTitle>
                  <CardDescription>
                    Complete information about this booking
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedParcel(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Pickup Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>From:</strong> {selectedParcel.pickupAddress}
                    </p>
                    <p>
                      <strong>Booked:</strong>{" "}
                      {new Date(selectedParcel.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <h4 className="font-semibold">Delivery Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>To:</strong> {selectedParcel.recipient}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedParcel.recipientPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedParcel.deliveryAddress}
                    </p>
                    <p>
                      <strong>Estimated:</strong>{" "}
                      {new Date(
                        selectedParcel.estimatedDelivery
                      ).toLocaleString()}
                    </p>
                    {selectedParcel.deliveredAt && (
                      <p>
                        <strong>Delivered:</strong>{" "}
                        {new Date(selectedParcel.deliveredAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Parcel Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Type:</strong> {selectedParcel.parcelType}
                    </p>
                    <p>
                      <strong>Weight:</strong> {selectedParcel.weight}
                    </p>
                    <p>
                      <strong>Declared Value:</strong> $
                      {selectedParcel.value.toFixed(2)}
                    </p>
                    <p>
                      <strong>Payment Mode:</strong>{" "}
                      {selectedParcel.paymentMode.toUpperCase()}
                    </p>
                    {selectedParcel.codAmount > 0 && (
                      <p>
                        <strong>COD Amount:</strong> $
                        {selectedParcel.codAmount.toFixed(2)}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {selectedParcel.urgent && (
                        <Badge
                          variant="outline"
                          className="text-red-800 bg-red-50"
                        >
                          Urgent
                        </Badge>
                      )}
                      {selectedParcel.fragile && (
                        <Badge
                          variant="outline"
                          className="text-yellow-800 bg-yellow-50"
                        >
                          Fragile
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
