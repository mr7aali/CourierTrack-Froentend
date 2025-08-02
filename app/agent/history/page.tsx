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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock delivery history data
const mockHistoryData = [
  {
    id: "PKG001",
    trackingId: "TRK001234567",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    deliveryAddress: "123 Main St, New York, NY 10001",
    status: "delivered",
    deliveredAt: "2024-01-15 3:30 PM",
    deliveryDate: "2024-01-15",
    parcelType: "Electronics",
    weight: "2.5 kg",
    paymentMode: "prepaid",
    codAmount: 0,
    deliveryTime: "25 minutes",
    rating: 5,
    feedback: "Great service, on time delivery!",
    proofOfDelivery: "signature",
  },
  {
    id: "PKG002",
    trackingId: "TRK001234568",
    recipient: "Sarah Johnson",
    recipientPhone: "+1 234-567-8902",
    deliveryAddress: "789 Oak St, Manhattan, NY 10002",
    status: "delivered",
    deliveredAt: "2024-01-14 2:15 PM",
    deliveryDate: "2024-01-14",
    parcelType: "Documents",
    weight: "0.5 kg",
    paymentMode: "cod",
    codAmount: 150,
    deliveryTime: "18 minutes",
    rating: 4,
    feedback: "Good service, but could be faster",
    proofOfDelivery: "photo",
  },
  {
    id: "PKG003",
    trackingId: "TRK001234569",
    recipient: "Mike Wilson",
    recipientPhone: "+1 234-567-8903",
    deliveryAddress: "555 Pine Ave, Brooklyn, NY 11201",
    status: "failed",
    deliveredAt: null,
    deliveryDate: "2024-01-13",
    parcelType: "Clothing",
    weight: "1.2 kg",
    paymentMode: "prepaid",
    codAmount: 0,
    deliveryTime: null,
    rating: null,
    feedback: null,
    failureReason: "Customer not available",
    proofOfDelivery: null,
  },
  {
    id: "PKG004",
    trackingId: "TRK001234570",
    recipient: "Emily Davis",
    recipientPhone: "+1 234-567-8904",
    deliveryAddress: "777 Elm St, Queens, NY 11101",
    status: "delivered",
    deliveredAt: "2024-01-12 4:45 PM",
    deliveryDate: "2024-01-12",
    parcelType: "Food Items",
    weight: "3.0 kg",
    paymentMode: "cod",
    codAmount: 75,
    deliveryTime: "32 minutes",
    rating: 5,
    feedback: "Excellent service, very professional!",
    proofOfDelivery: "signature",
  },
  {
    id: "PKG005",
    trackingId: "TRK001234571",
    recipient: "Robert Brown",
    recipientPhone: "+1 234-567-8905",
    deliveryAddress: "888 Maple Dr, Staten Island, NY 10301",
    status: "delivered",
    deliveredAt: "2024-01-11 1:20 PM",
    deliveryDate: "2024-01-11",
    parcelType: "Electronics",
    weight: "4.5 kg",
    paymentMode: "prepaid",
    codAmount: 0,
    deliveryTime: "40 minutes",
    rating: 4,
    feedback: "Good delivery, package was safe",
    proofOfDelivery: "photo",
  },
];

export default function AgentHistoryPage() {
  const [deliveries, setDeliveries] = useState(mockHistoryData);
  const [filteredDeliveries, setFilteredDeliveries] = useState(mockHistoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const { toast } = useToast();

  // Apply filters
  const applyFilters = () => {
    let filtered = deliveries;

    if (searchTerm) {
      filtered = filtered.filter(
        (delivery) =>
          delivery.trackingId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          delivery.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.deliveryAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (delivery) => delivery.status === statusFilter
      );
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (delivery) => delivery.paymentMode === paymentFilter
      );
    }

    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setDate(now.getDate() - 30);
          break;
      }

      if (dateFilter !== "all") {
        filtered = filtered.filter(
          (delivery) => new Date(delivery.deliveryDate) >= filterDate
        );
      }
    }

    setFilteredDeliveries(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your delivery history will be downloaded as CSV",
    });
  };

  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    failed: deliveries.filter((d) => d.status === "failed").length,
    codCollected: deliveries
      .filter((d) => d.status === "delivered" && d.codAmount > 0)
      .reduce((sum, d) => sum + d.codAmount, 0),
    avgRating:
      deliveries
        .filter((d) => d.rating)
        .reduce((sum, d) => sum + (d.rating || 0), 0) /
      deliveries.filter((d) => d.rating).length,
    avgDeliveryTime:
      deliveries
        .filter((d) => d.deliveryTime)
        .reduce(
          (sum, d) =>
            sum + Number.parseInt(d.deliveryTime?.split(" ")[0] || "0"),
          0
        ) / deliveries.filter((d) => d.deliveryTime).length,
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Delivery History
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View your completed deliveries and performance
            </p>
          </div>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Total Deliveries
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.delivered}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Successful
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.failed}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Failed
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${stats.codCollected}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  COD Collected
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.avgRating.toFixed(1)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Avg Rating
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(stats.avgDeliveryTime)}m
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Avg Time
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
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
                    setFilteredDeliveries(deliveries);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery History List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Delivery History ({filteredDeliveries.length} results)
            </CardTitle>
            <CardDescription>
              {filteredDeliveries.length === deliveries.length
                ? "Showing all deliveries"
                : `Filtered from ${deliveries.length} total deliveries`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="p-4 transition-colors border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        {getStatusIcon(delivery.status)}
                        <span className="font-medium">
                          {delivery.trackingId}
                        </span>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status === "delivered"
                            ? "Delivered"
                            : "Failed"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {delivery.paymentMode}
                        </Badge>
                        {delivery.codAmount > 0 && (
                          <Badge
                            variant="outline"
                            className="text-green-800 bg-green-50"
                          >
                            COD ${delivery.codAmount}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2 dark:text-gray-300">
                        <div>
                          <p>
                            <strong>Customer:</strong> {delivery.recipient}
                          </p>
                          <p>
                            <strong>Phone:</strong> {delivery.recipientPhone}
                          </p>
                          <div className="flex items-start mt-1 space-x-1">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{delivery.deliveryAddress}</span>
                          </div>
                        </div>
                        <div>
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                              delivery.deliveryDate
                            ).toLocaleDateString()}
                          </p>
                          {delivery.deliveredAt && (
                            <p>
                              <strong>Delivered:</strong> {delivery.deliveredAt}
                            </p>
                          )}
                          {delivery.deliveryTime && (
                            <p>
                              <strong>Delivery Time:</strong>{" "}
                              {delivery.deliveryTime}
                            </p>
                          )}
                          <p>
                            <strong>Type:</strong> {delivery.parcelType} (
                            {delivery.weight})
                          </p>
                        </div>
                      </div>

                      {/* Rating and Feedback */}
                      {delivery.rating && (
                        <div className="p-3 mt-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="flex items-center mb-1 space-x-2">
                            <span className="text-sm font-medium">
                              Customer Rating:
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < delivery.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                                ({delivery.rating}/5)
                              </span>
                            </div>
                          </div>
                          {delivery.feedback && (
                            <p className="text-sm italic text-gray-700 dark:text-gray-300">
                              "{delivery.feedback}"
                            </p>
                          )}
                        </div>
                      )}

                      {/* Failure Reason */}
                      {delivery.status === "failed" &&
                        delivery.failureReason && (
                          <div className="p-3 mt-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <div className="flex items-start space-x-2">
                              <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-red-800 dark:text-red-200">
                                  Delivery Failed:
                                </p>
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  {delivery.failureReason}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDelivery(delivery)}
                        className="bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {delivery.proofOfDelivery && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          View Proof
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredDeliveries.length === 0 && (
                <div className="py-12 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    No deliveries found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Your delivery performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {((stats.delivered / stats.total) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Success Rate
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(stats.avgDeliveryTime)} min
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Delivery Time
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${stats.codCollected}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  COD Collected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed View Modal (simplified as card for now) */}
        {selectedDelivery && (
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    Delivery Details - {selectedDelivery.trackingId}
                  </CardTitle>
                  <CardDescription>
                    Complete information about this delivery
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDelivery(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedDelivery.recipient}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedDelivery.recipientPhone}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedDelivery.deliveryAddress}
                    </p>
                  </div>

                  <h4 className="font-semibold">Parcel Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Type:</strong> {selectedDelivery.parcelType}
                    </p>
                    <p>
                      <strong>Weight:</strong> {selectedDelivery.weight}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {selectedDelivery.paymentMode.toUpperCase()}
                    </p>
                    {selectedDelivery.codAmount > 0 && (
                      <p>
                        <strong>COD Amount:</strong> $
                        {selectedDelivery.codAmount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Delivery Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Status:</strong>{" "}
                      <Badge
                        className={getStatusColor(selectedDelivery.status)}
                      >
                        {selectedDelivery.status === "delivered"
                          ? "Delivered"
                          : "Failed"}
                      </Badge>
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        selectedDelivery.deliveryDate
                      ).toLocaleDateString()}
                    </p>
                    {selectedDelivery.deliveredAt && (
                      <p>
                        <strong>Delivered At:</strong>{" "}
                        {selectedDelivery.deliveredAt}
                      </p>
                    )}
                    {selectedDelivery.deliveryTime && (
                      <p>
                        <strong>Delivery Time:</strong>{" "}
                        {selectedDelivery.deliveryTime}
                      </p>
                    )}
                    {selectedDelivery.proofOfDelivery && (
                      <p>
                        <strong>Proof of Delivery:</strong>{" "}
                        {selectedDelivery.proofOfDelivery}
                      </p>
                    )}
                  </div>

                  {selectedDelivery.rating && (
                    <div>
                      <h4 className="mb-2 font-semibold">Customer Feedback</h4>
                      <div className="flex items-center mb-2 space-x-2">
                        <span className="text-sm">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < selectedDelivery.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                            ({selectedDelivery.rating}/5)
                          </span>
                        </div>
                      </div>
                      {selectedDelivery.feedback && (
                        <p className="text-sm italic text-gray-700 dark:text-gray-300">
                          "{selectedDelivery.feedback}"
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDelivery.failureReason && (
                    <div>
                      <h4 className="mb-2 font-semibold text-red-600">
                        Failure Reason
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {selectedDelivery.failureReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
