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
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Truck,
  Shield,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock users data
const mockUsersData = [
  {
    id: "CUST001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234-567-8901",
    role: "customer",
    status: "active",
    address: "123 Main St, New York, NY 10001",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-16",
    totalParcels: 15,
    totalSpent: 1250.75,
    rating: 4.8,
  },
  {
    id: "AGT001",
    name: "Mike Johnson",
    email: "mike.johnson@couriertrack.com",
    phone: "+1 555-0123",
    role: "agent",
    status: "active",
    address: "456 Agent St, Brooklyn, NY 11201",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-16",
    totalDeliveries: 245,
    successRate: 96.8,
    rating: 4.9,
    vehicleType: "Van",
    vehicleNumber: "NYC-1234",
  },
  {
    id: "CUST002",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 234-567-8902",
    role: "customer",
    status: "active",
    address: "789 Oak St, Manhattan, NY 10002",
    createdAt: "2024-01-12",
    lastLogin: "2024-01-15",
    totalParcels: 8,
    totalSpent: 650.25,
    rating: 4.5,
  },
  {
    id: "AGT002",
    name: "Sarah Davis",
    email: "sarah.davis@couriertrack.com",
    phone: "+1 555-0124",
    role: "agent",
    status: "active",
    address: "321 Delivery Ave, Queens, NY 11101",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-16",
    totalDeliveries: 189,
    successRate: 94.2,
    rating: 4.7,
    vehicleType: "Motorcycle",
    vehicleNumber: "NYC-5678",
  },
  {
    id: "CUST003",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    phone: "+1 234-567-8903",
    role: "customer",
    status: "inactive",
    address: "555 Pine Ave, Staten Island, NY 10301",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-10",
    totalParcels: 3,
    totalSpent: 125.5,
    rating: 4.2,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsersData);
  const [filteredUsers, setFilteredUsers] = useState(mockUsersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
    address: "",
    vehicleType: "",
    vehicleNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Apply filters
  const applyFilters = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 text-purple-600" />;
      case "agent":
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return <Users className="w-4 h-4 text-green-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "agent":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
      vehicleType: user.vehicleType || "",
      vehicleNumber: user.vehicleNumber || "",
    });
    setEditUserDialog(true);
  };

  const handleAddUser = () => {
    setUserFormData({
      name: "",
      email: "",
      phone: "",
      role: "customer",
      address: "",
      vehicleType: "",
      vehicleNumber: "",
    });
    setAddUserDialog(true);
  };

  const handleSaveUser = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedUser) {
        // Update existing user
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userFormData } : user
        );
        setUsers(updatedUsers);
        toast({
          title: "User updated successfully",
          description: `${userFormData.name}'s information has been updated`,
        });
        setEditUserDialog(false);
      } else {
        // Add new user
        const newUser = {
          id: `${userFormData.role.toUpperCase()}${Date.now()}`,
          ...userFormData,
          status: "active",
          createdAt: new Date().toISOString().split("T")[0],
          lastLogin: "Never",
          totalParcels: 0,
          totalSpent: 0,
          totalDeliveries: 0,
          successRate: 0,
          rating: 0,
        };
        setUsers([...users, newUser]);
        toast({
          title: "User added successfully",
          description: `${userFormData.name} has been added to the system`,
        });
        setAddUserDialog(false);
      }

      applyFilters();
    } catch (error) {
      toast({
        title: "Operation failed",
        description: "Failed to save user information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      applyFilters();

      toast({
        title: "User deleted",
        description: "User has been removed from the system",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "User data will be exported to CSV",
    });
  };

  const stats = {
    total: users.length,
    customers: users.filter((u) => u.role === "customer").length,
    agents: users.filter((u) => u.role === "agent").length,
    admins: users.filter((u) => u.role === "admin").length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage customers, agents, and administrators
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
            <Button onClick={handleAddUser}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Total Users
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.customers}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Customers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.agents}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Agents
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.admins}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Admins
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.inactive}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Inactive
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
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    id="search"
                    placeholder="Name, email, phone..."
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
                <Label>Role Filter</Label>
                <Select
                  value={roleFilter}
                  onValueChange={(value) => {
                    setRoleFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="customer">Customers</SelectItem>
                    <SelectItem value="agent">Agents</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
                    setRoleFilter("all");
                    setStatusFilter("all");
                    setFilteredUsers(users);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length} results)</CardTitle>
            <CardDescription>
              {filteredUsers.length === users.length
                ? "Showing all users"
                : `Filtered from ${users.length} total users`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 transition-colors border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-3 space-x-2">
                        {getRoleIcon(user.role)}
                        <span className="text-lg font-medium">{user.name}</span>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {user.email}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {user.phone}
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {user.address}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p>
                            <strong>Joined:</strong>{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Last Login:</strong> {user.lastLogin}
                          </p>
                          <p>
                            <strong>Rating:</strong>{" "}
                            {user.rating ? `${user.rating}/5 ⭐` : "No rating"}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {user.role === "customer" ? (
                            <>
                              <p>
                                <strong>Total Parcels:</strong>{" "}
                                {user.totalParcels}
                              </p>
                              <p>
                                <strong>Total Spent:</strong> $
                                {user.totalSpent?.toFixed(2)}
                              </p>
                            </>
                          ) : user.role === "agent" ? (
                            <>
                              <p>
                                <strong>Deliveries:</strong>{" "}
                                {user.totalDeliveries}
                              </p>
                              <p>
                                <strong>Success Rate:</strong>{" "}
                                {user.successRate}%
                              </p>
                              {user.vehicleType && (
                                <p>
                                  <strong>Vehicle:</strong> {user.vehicleType} (
                                  {user.vehicleNumber})
                                </p>
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 min-w-[200px]">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        className="bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
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
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 bg-transparent hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="py-12 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    No users found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit User Dialog */}
        <Dialog
          open={addUserDialog || editUserDialog}
          onOpenChange={(open) => {
            if (!open) {
              setAddUserDialog(false);
              setEditUserDialog(false);
              setSelectedUser(null);
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Edit User" : "Add New User"}
              </DialogTitle>
              <DialogDescription>
                {selectedUser
                  ? "Update user information"
                  : "Create a new user account"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userFormData.name}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={userFormData.phone}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={userFormData.role}
                  onValueChange={(value) =>
                    setUserFormData({ ...userFormData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="agent">Delivery Agent</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={userFormData.address}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter full address"
                />
              </div>

              {userFormData.role === "agent" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={userFormData.vehicleType}
                      onValueChange={(value) =>
                        setUserFormData({ ...userFormData, vehicleType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                        <SelectItem value="Car">Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      value={userFormData.vehicleNumber}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          vehicleNumber: e.target.value,
                        })
                      }
                      placeholder="Enter vehicle number"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAddUserDialog(false);
                  setEditUserDialog(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveUser} disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : selectedUser
                  ? "Update User"
                  : "Add User"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
