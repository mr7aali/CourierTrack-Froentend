"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, MapPin, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const mockParcels = [
  {
    id: "PKG001",
    recipient: "John Smith",
    address: "123 Main St, New York, NY",
    status: "in_transit",
    createdAt: "2024-01-15",
    estimatedDelivery: "2024-01-17",
    type: "Standard",
    cod: false,
  },
  {
    id: "PKG002",
    recipient: "Sarah Johnson",
    address: "456 Oak Ave, Los Angeles, CA",
    status: "delivered",
    createdAt: "2024-01-14",
    estimatedDelivery: "2024-01-16",
    type: "Express",
    cod: true,
  },
  {
    id: "PKG003",
    recipient: "Mike Wilson",
    address: "789 Pine St, Chicago, IL",
    status: "pending",
    createdAt: "2024-01-16",
    estimatedDelivery: "2024-01-18",
    type: "Standard",
    cod: false,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "in_transit":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <Package className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "in_transit":
      return "bg-blue-100 text-blue-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CustomerDashboard() {
  const [parcels] = useState(mockParcels)

  return (
    <DashboardLayout userRole="customer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your parcels and track deliveries</p>
          </div>
          <Link href="/customer/book-parcel">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Book New Parcel
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parcels.length}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {parcels.filter((p) => p.status === "in_transit").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently shipping</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {parcels.filter((p) => p.status === "delivered").length}
              </div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {parcels.filter((p) => p.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting pickup</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Parcels */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Parcels</CardTitle>
            <CardDescription>Your latest parcel bookings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parcels.map((parcel) => (
                <div key={parcel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(parcel.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{parcel.id}</span>
                        <Badge className={getStatusColor(parcel.status)}>{parcel.status.replace("_", " ")}</Badge>
                        {parcel.cod && <Badge variant="outline">COD</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">To: {parcel.recipient}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {parcel.address}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Est. Delivery</p>
                    <p className="text-xs text-gray-500">{parcel.estimatedDelivery}</p>
                    <Link href={`/customer/track/${parcel.id}`}>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Track
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
