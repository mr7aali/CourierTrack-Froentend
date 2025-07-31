"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Users, Truck, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const mockStats = {
  totalParcels: 1247,
  activeAgents: 23,
  todayDeliveries: 89,
  codAmount: 15420,
  pendingParcels: 156,
  inTransit: 234,
  delivered: 857,
  failed: 12,
}

const recentParcels = [
  { id: "PKG001", customer: "John Doe", agent: "Agent Smith", status: "delivered", amount: 250 },
  { id: "PKG002", customer: "Jane Smith", agent: "Agent Johnson", status: "in_transit", amount: 180 },
  { id: "PKG003", customer: "Bob Wilson", agent: "Agent Brown", status: "pending", amount: 320 },
  { id: "PKG004", customer: "Alice Davis", agent: "Agent Davis", status: "failed", amount: 150 },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor and manage your courier operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalParcels.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeAgents}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +2 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.todayDeliveries}</div>
              <p className="text-xs text-muted-foreground">Target: 100 deliveries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">COD Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.codAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                -5% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Parcel Status Overview</CardTitle>
              <CardDescription>Current status distribution of all parcels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{mockStats.pendingParcels}</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                      {((mockStats.pendingParcels / mockStats.totalParcels) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">In Transit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{mockStats.inTransit}</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800">
                      {((mockStats.inTransit / mockStats.totalParcels) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Delivered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{mockStats.delivered}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-800">
                      {((mockStats.delivered / mockStats.totalParcels) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Failed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{mockStats.failed}</span>
                    <Badge variant="outline" className="bg-red-50 text-red-800">
                      {((mockStats.failed / mockStats.totalParcels) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest parcel updates and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentParcels.map((parcel) => (
                  <div key={parcel.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{parcel.id}</span>
                        <Badge
                          variant="outline"
                          className={
                            parcel.status === "delivered"
                              ? "bg-green-50 text-green-800"
                              : parcel.status === "in_transit"
                                ? "bg-blue-50 text-blue-800"
                                : parcel.status === "failed"
                                  ? "bg-red-50 text-red-800"
                                  : "bg-yellow-50 text-yellow-800"
                          }
                        >
                          {parcel.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {parcel.customer} • {parcel.agent}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${parcel.amount}</p>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Package className="h-6 w-6" />
                <span>Assign Parcels</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
