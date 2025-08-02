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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  Clock,
  RefreshCw,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalParcels: 1247,
    totalRevenue: 45680.75,
    totalCustomers: 342,
    totalAgents: 23,
    avgDeliveryTime: 28.5,
    successRate: 94.2,
    codCollection: 15420.5,
    failedDeliveries: 72,
  },
  trends: {
    parcelsGrowth: 12.5,
    revenueGrowth: 8.3,
    customerGrowth: 15.2,
    deliveryTimeImprovement: -5.8,
  },
  dailyBookings: [
    { date: "2024-01-10", bookings: 45, revenue: 1250.75 },
    { date: "2024-01-11", bookings: 52, revenue: 1480.25 },
    { date: "2024-01-12", bookings: 38, revenue: 980.5 },
    { date: "2024-01-13", bookings: 61, revenue: 1750.8 },
    { date: "2024-01-14", bookings: 47, revenue: 1320.45 },
    { date: "2024-01-15", bookings: 55, revenue: 1590.3 },
    { date: "2024-01-16", bookings: 49, revenue: 1380.65 },
  ],
  statusDistribution: [
    { status: "Delivered", count: 857, percentage: 68.7 },
    { status: "In Transit", count: 234, percentage: 18.8 },
    { status: "Pending", count: 156, percentage: 12.5 },
  ],
  topAgents: [
    { name: "Mike Johnson", deliveries: 245, successRate: 96.8, rating: 4.9 },
    { name: "Sarah Davis", deliveries: 189, successRate: 94.2, rating: 4.7 },
    { name: "Robert Brown", deliveries: 167, successRate: 92.1, rating: 4.6 },
    { name: "Emily Wilson", deliveries: 143, successRate: 95.8, rating: 4.8 },
  ],
  topCustomers: [
    { name: "John Smith", parcels: 15, spent: 1250.75, rating: 4.8 },
    { name: "Sarah Johnson", parcels: 12, spent: 980.25, rating: 4.5 },
    { name: "Mike Wilson", parcels: 10, spent: 750.5, rating: 4.2 },
    { name: "Emily Davis", parcels: 8, spent: 650.75, rating: 4.6 },
  ],
  regionData: [
    { region: "Manhattan", parcels: 425, revenue: 15680.25, agents: 8 },
    { region: "Brooklyn", parcels: 312, revenue: 11250.75, agents: 6 },
    { region: "Queens", parcels: 298, revenue: 10890.5, agents: 5 },
    { region: "Bronx", parcels: 156, revenue: 5680.25, agents: 3 },
    { region: "Staten Island", parcels: 56, revenue: 2179.0, agents: 1 },
  ],
};

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("parcels");
  const { toast } = useToast();

  const handleExportReport = (type: string) => {
    toast({
      title: "Export started",
      description: `${type} report will be downloaded as PDF`,
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Analytics data has been updated",
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive business insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleRefreshData}
              variant="outline"
              className="bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Parcels
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyticsData.overview.totalParcels.toLocaleString()}
              </div>
              <p className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-600" />+
                {mockAnalyticsData.trends.parcelsGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAnalyticsData.overview.totalRevenue.toLocaleString()}
              </div>
              <p className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-600" />+
                {mockAnalyticsData.trends.revenueGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyticsData.overview.successRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                {mockAnalyticsData.overview.failedDeliveries} failed deliveries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Avg Delivery Time
              </CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyticsData.overview.avgDeliveryTime} min
              </div>
              <p className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="w-3 h-3 mr-1 text-green-600" />
                {Math.abs(mockAnalyticsData.trends.deliveryTimeImprovement)}%
                improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Daily Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Bookings Trend</CardTitle>
              <CardDescription>
                Parcel bookings over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Interactive Chart
                  </p>
                  <p className="text-xs text-gray-500">
                    Daily bookings visualization
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-4 text-xs">
                {mockAnalyticsData.dailyBookings.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="font-medium">{day.bookings}</p>
                    <p className="text-gray-500">
                      {new Date(day.date).toLocaleDateString("en", {
                        weekday: "short",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Parcel Status Distribution</CardTitle>
              <CardDescription>
                Current status breakdown of all parcels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.statusDistribution.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "Delivered"
                            ? "bg-green-500"
                            : item.status === "In Transit"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.count}</span>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center h-32 mt-4 rounded-lg bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 dark:from-green-900 dark:via-blue-900 dark:to-yellow-900">
                <div className="text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status Distribution Chart
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Performing Agents */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Agents</CardTitle>
              <CardDescription>
                Agents with highest delivery success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.topAgents.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full dark:bg-blue-900">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {agent.deliveries} deliveries • {agent.successRate}%
                          success
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(agent.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{agent.rating}/5</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>
                Customers with highest parcel volume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.topCustomers.map((customer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full dark:bg-green-900">
                        <span className="text-sm font-bold text-green-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {customer.parcels} parcels • $
                          {customer.spent.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(customer.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        {customer.rating}/5
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>Delivery performance by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {mockAnalyticsData.regionData.map((region, index) => (
                <div key={index} className="p-4 text-center border rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">{region.region}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <p>{region.parcels} parcels</p>
                    <p>${region.revenue.toLocaleString()}</p>
                    <p>{region.agents} agents</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
            <CardDescription>
              Download detailed reports for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button
                variant="outline"
                className="flex-col h-20 space-y-2 bg-transparent"
                onClick={() => handleExportReport("Daily Bookings")}
              >
                <Calendar className="w-6 h-6" />
                <span>Daily Bookings Report</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-20 space-y-2 bg-transparent"
                onClick={() => handleExportReport("Agent Performance")}
              >
                <Users className="w-6 h-6" />
                <span>Agent Performance Report</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-20 space-y-2 bg-transparent"
                onClick={() => handleExportReport("Financial")}
              >
                <DollarSign className="w-6 h-6" />
                <span>Financial Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Important notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start p-3 space-x-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    High COD Amount Pending
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    ${mockAnalyticsData.overview.codCollection.toLocaleString()}{" "}
                    in COD payments pending collection
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 space-x-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">
                    Failed Deliveries Alert
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {mockAnalyticsData.overview.failedDeliveries} failed
                    deliveries require attention
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 space-x-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Agent Capacity Alert
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    3 agents are at maximum capacity - consider redistributing
                    parcels
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
