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
  Search,
  Filter,
  UserPlus,
  Edit,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock parcels data
const mockParcelsData = [
  {
    id: "PKG001",
    trackingId: "TRK001234567",
    customerId: "CUST001",
    customerName: "John Smith",
    customerPhone: "+1 234-567-8901",
    agentId: "AGT001",
    agentName: "Mike Johnson",
    recipient: "John Smith",
    recipientPhone: "+1 234-567-8901",
    pickupAddress: "456 Sender Ave, Brooklyn, NY 11201",
    deliveryAddress: "123 Main St, New York, NY 10001",
    status: "in_transit",
    priority: "normal",
    parcelType: "Electronics",
    weight: "2.5 kg",
    dimensions: "30x20x15 cm",
    value: 299.99,
    paymentMode: "prepaid",
    codAmount: 0,
    fragile: true,
    urgent: false,
    createdAt: "2024-01-15 10:30 AM",
    estimatedDelivery: "2024-01-17 3:30 PM",
    specialInstructions: "Handle with care - fragile electronics",
  },
  {
    id: "PKG002",
    trackingId: "TRK001234568",
    customerId: "CUST002",
    customerName: "Sarah Johnson",
    customerPhone: "+1 234-567-8902",
    agentId: null,
    agentName: null,
    recipient: "Sarah Johnson",
    recipientPhone: "+1 234-567-8902",
    pickupAddress: "321 Business Rd, Queens, NY 11101",
    deliveryAddress: "789 Oak St, Manhattan, NY 10002",
    status: "pending",
    priority: "urgent",
    parcelType: "Documents",
    weight: "0.5 kg",
    dimensions: "25x18x2 cm",
    value: 150.0,
    paymentMode: "cod",
    codAmount: 150.0,
    fragile: false,
    urgent: true,
    createdAt: "2024-01-16 2:15 PM",
    estimatedDelivery: "2024-01-17 2:00 PM",
    specialInstructions: "Urgent delivery - customer waiting",
  },
  {
    id: "PKG003",
    trackingId: "TRK001234569",
    customerId: "CUST003",
    customerName: "Mike Wilson",
    customerPhone: "+1 234-567-8903",
    agentId: "AGT002",
    agentName: "Sarah Davis",
    recipient: "Mike Wilson",
    recipientPhone: "+1 234-567-8903",
    pickupAddress: "123 Store St, Bronx, NY 10451",
    deliveryAddress: "555 Pine Ave, Staten Island, NY 10301",
    status: "delivered",
    priority: "normal",
    parcelType: "Clothing",
    weight: "1.2 kg",
    dimensions: "40x30x10 cm",
    value: 89.99,
    paymentMode: "prepaid",
    codAmount: 0,
    fragile: false,
    urgent: false,
    createdAt: "2024-01-14 9:45 AM",
    estimatedDelivery: "2024-01-16 4:15 PM",
    specialInstructions: "Leave at front door if no answer",
  },
];

// Mock agents data
const mockAgentsData = [
  {
    id: "AGT001",
    name: "Mike Johnson",
    phone: "+1 555-0123",
    status: "active",
    currentParcels: 3,
  },
  {
    id: "AGT002",
    name: "Sarah Davis",
    phone: "+1 555-0124",
    status: "active",
    currentParcels: 2,
  },
  {
    id: "AGT003",
    name: "Robert Brown",
    phone: "+1 555-0125",
    status: "active",
    currentParcels: 1,
  },
  {
    id: "AGT004",
    name: "Emily Wilson",
    phone: "+1 555-0126",
    status: "inactive",
    currentParcels: 0,
  },
];

export default function AdminParcelsPage() {
  const [parcels, setParcels] = useState(mockParcelsData);
  const [filteredParcels, setFilteredParcels] = useState(mockParcelsData);
  const [agents] = useState(mockAgentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [assignAgentDialog, setAssignAgentDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [bulkActions, setBulkActions] = useState<string[]>([]);
  const { toast } = useToast();

  // Apply filters
  const applyFilters = () => {
    let filtered = parcels;

    if (searchTerm) {
      filtered = filtered.filter(
        (parcel) =>
          parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.deliveryAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((parcel) => parcel.status === statusFilter);
    }

    if (agentFilter !== "all") {
      if (agentFilter === "unassigned") {
        filtered = filtered.filter((parcel) => !parcel.agentId);
      } else {
        filtered = filtered.filter((parcel) => parcel.agentId === agentFilter);
      }
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
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Package className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "urgent"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  };

  const handleAssignAgent = async () => {
    if (!selectedParcel || !selectedAgent) return;

    setIsAssigning(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update parcel with assigned agent
      const agent = agents.find((a) => a.id === selectedAgent);
      const updatedParcels = parcels.map((parcel) =>
        parcel.id === selectedParcel.id
          ? {
              ...parcel,
              agentId: selectedAgent,
              agentName: agent?.name || null,
            }
          : parcel
      );

      setParcels(updatedParcels);
      applyFilters();

      toast({
        title: "Agent assigned successfully",
        description: `${agent?.name} has been assigned to parcel ${selectedParcel.trackingId}`,
      });

      setAssignAgentDialog(false);
      setSelectedAgent("");
      setSelectedParcel(null);
    } catch (error) {
      toast({
        title: "Assignment failed",
        description: "Failed to assign agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleBulkAssign = () => {
    if (bulkActions.length === 0) {
      toast({
        title: "No parcels selected",
        description: "Please select parcels to assign agents",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk assignment",
      description: `${bulkActions.length} parcels selected for bulk assignment`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Parcel data will be exported to CSV",
    });
  };

  const stats = {
    total: parcels.length,
    pending: parcels.filter((p) => p.status === "pending").length,
    inTransit: parcels.filter(
      (p) => p.status === "in_transit" || p.status === "out_for_delivery"
    ).length,
    delivered: parcels.filter((p) => p.status === "delivered").length,
    failed: parcels.filter((p) => p.status === "failed").length,
    unassigned: parcels.filter((p) => !p.agentId).length,
    urgent: parcels.filter((p) => p.priority === "urgent").length,
    codTotal: parcels
      .filter((p) => p.codAmount > 0)
      .reduce((sum, p) => sum + p.codAmount, 0),
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Parcel Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage all parcels and assign delivery agents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExport}
              variant="outline"
              className="bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={() => {
                applyFilters();
                toast({
                  title: "Refreshed",
                  description: "Parcel data updated",
                });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Total Parcels
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Pending
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
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
                  {stats.delivered}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Delivered
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
                <p className="text-2xl font-bold text-orange-600">
                  {stats.unassigned}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Unassigned
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="search">Search Parcels</Label>
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    id="search"
                    placeholder="Tracking ID, customer..."
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
                    <SelectItem value="pending">Pending</SelectItem>
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
                <Label>Agent Filter</Label>
                <Select
                  value={agentFilter}
                  onValueChange={(value) => {
                    setAgentFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
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
                    setAgentFilter("all");
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

        {/* Bulk Actions */}
        {bulkActions.length > 0 && (
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {bulkActions.length} parcels selected
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={handleBulkAssign}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Bulk Assign Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBulkActions([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Parcels List */}
        <Card>
          <CardHeader>
            <CardTitle>
              All Parcels ({filteredParcels.length} results)
            </CardTitle>
            <CardDescription>
              {filteredParcels.length === parcels.length
                ? "Showing all parcels"
                : `Filtered from ${parcels.length} total parcels`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredParcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className="p-4 transition-colors border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox for bulk actions */}
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={bulkActions.includes(parcel.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkActions([...bulkActions, parcel.id]);
                        } else {
                          setBulkActions(
                            bulkActions.filter((id) => id !== parcel.id)
                          );
                        }
                      }}
                    />

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
                        {!parcel.agentId && (
                          <Badge
                            variant="outline"
                            className="text-red-800 bg-red-50"
                          >
                            Unassigned
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Customer:
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {parcel.customerName}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {parcel.customerPhone}
                            </p>
                          </div>
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
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Pickup Address:
                            </p>
                            <div className="flex items-start space-x-1">
                              <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300">
                                {parcel.pickupAddress}
                              </p>
                            </div>
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
                              {parcel.parcelType} • {parcel.weight}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Value: ${parcel.value}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Payment: {parcel.paymentMode}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Assigned Agent:
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {parcel.agentName || "Not assigned"}
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
                    <div className="flex flex-col gap-2 min-w-[150px]">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setAssignAgentDialog(true);
                        }}
                        disabled={parcel.status === "delivered"}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {parcel.agentId ? "Reassign" : "Assign"} Agent
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Parcel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredParcels.length === 0 && (
                <div className="py-12 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    No parcels found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assign Agent Dialog */}
        <Dialog open={assignAgentDialog} onOpenChange={setAssignAgentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Delivery Agent</DialogTitle>
              <DialogDescription>
                Assign a delivery agent to parcel {selectedParcel?.trackingId}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent">Select Agent</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents
                      .filter((agent) => agent.status === "active")
                      .map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{agent.name}</span>
                            <span className="ml-2 text-xs text-gray-500">
                              ({agent.currentParcels} parcels)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedParcel && (
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="mb-2 font-medium">Parcel Details:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Customer:</strong> {selectedParcel.customerName}
                    </p>
                    <p>
                      <strong>Delivery:</strong>{" "}
                      {selectedParcel.deliveryAddress}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedParcel.parcelType} (
                      {selectedParcel.weight})
                    </p>
                    <p>
                      <strong>Priority:</strong> {selectedParcel.priority}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setAssignAgentDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignAgent}
                  disabled={!selectedAgent || isAssigning}
                >
                  {isAssigning ? "Assigning..." : "Assign Agent"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
