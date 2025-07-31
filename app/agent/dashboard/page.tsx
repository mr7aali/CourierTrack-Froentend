"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MapPin, Clock, CheckCircle, Navigation, QrCode } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const mockAssignedParcels = [
  {
    id: "PKG001",
    trackingId: "TRK001",
    recipient: "John Smith",
    address: "123 Main St, New York, NY 10001",
    phone: "+1 234-567-8901",
    status: "picked_up",
    priority: "normal",
    cod: false,
    estimatedTime: "2:30 PM",
  },
  {
    id: "PKG002",
    trackingId: "TRK002",
    recipient: "Sarah Johnson",
    address: "456 Oak Ave, New York, NY 10002",
    phone: "+1 234-567-8902",
    status: "in_transit",
    priority: "urgent",
    cod: true,
    codAmount: 150,
    estimatedTime: "3:15 PM",
  },
  {
    id: "PKG003",
    trackingId: "TRK003",
    recipient: "Mike Wilson",
    address: "789 Pine St, New York, NY 10003",
    phone: "+1 234-567-8903",
    status: "out_for_delivery",
    priority: "normal",
    cod: false,
    estimatedTime: "4:00 PM",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "picked_up":
      return "bg-blue-100 text-blue-800"
    case "in_transit":
      return "bg-yellow-100 text-yellow-800"
    case "out_for_delivery":
      return "bg-green-100 text-green-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  return priority === "urgent" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
}

export default function AgentDashboard() {
  const [parcels] = useState(mockAssignedParcels)

  const stats = {
    assigned: parcels.length,
    completed: parcels.filter((p) => p.status === "delivered").length,
    pending: parcels.filter((p) => p.status !== "delivered").length,
    codTotal: parcels.filter((p) => p.cod).reduce((sum, p) => sum + (p.codAmount || 0), 0),
  }

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your assigned deliveries</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Navigation className="h-4 w-4 mr-2" />
            View Route Map
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Today</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assigned}</div>
              <p className="text-xs text-muted-foreground">Total parcels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Delivered successfully</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Remaining deliveries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">COD Amount</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.codTotal}</div>
              <p className="text-xs text-muted-foreground">To collect</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Parcels */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Parcels</CardTitle>
            <CardDescription>Your delivery assignments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parcels.map((parcel) => (
                <div key={parcel.id} className="border rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{parcel.trackingId}</span>
                        <Badge className={getStatusColor(parcel.status)}>{parcel.status.replace("_", " ")}</Badge>
                        <Badge className={getPriorityColor(parcel.priority)}>{parcel.priority}</Badge>
                        {parcel.cod && <Badge variant="outline">COD ${parcel.codAmount}</Badge>}
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>
                          <strong>To:</strong> {parcel.recipient}
                        </p>
                        <p>
                          <strong>Phone:</strong> {parcel.phone}
                        </p>
                        <div className="flex items-start space-x-1">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{parcel.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Est. delivery: {parcel.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4 mr-2" />
                        Scan QR
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common delivery tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
                <QrCode className="h-6 w-6" />
                <span>Scan Parcel</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
                <Navigation className="h-6 w-6" />
                <span>Get Directions</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
                <CheckCircle className="h-6 w-6" />
                <span>Mark Delivered</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
