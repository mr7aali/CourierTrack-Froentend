import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Truck, Users, BarChart3, MapPin, Shield } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      {/* Hero Section */}
      <section className="container px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
          Modern Courier & Parcel Management
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300">
          Streamline your logistics operations with real-time tracking,
          automated routing, and comprehensive management tools for customers,
          agents, and administrators.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/auth/register">
            <Button size="lg" className="w-full sm:w-auto">
              Start Tracking
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent sm:w-auto"
            >
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Powerful Features for Every User
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Customer Portal</CardTitle>
              <CardDescription>
                Book parcels, track deliveries, and manage your shipping history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Easy parcel booking</li>
                <li>• Real-time tracking</li>
                <li>• Delivery history</li>
                <li>• COD & prepaid options</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Truck className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Delivery Agent</CardTitle>
              <CardDescription>
                Manage deliveries with optimized routes and status updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Assigned parcel view</li>
                <li>• Status updates</li>
                <li>• Route optimization</li>
                <li>• QR code scanning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Comprehensive analytics and management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Performance metrics</li>
                <li>• Agent assignment</li>
                <li>• User management</li>
                <li>• Report generation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
            Built with Modern Technology
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="mb-2 text-xl font-semibold">Real-time Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Google Maps integration for live parcel tracking and route
                optimization
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Secure & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                JWT authentication with role-based access control
              </p>
            </div>
            <div className="text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="mb-2 text-xl font-semibold">Smart Automation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                QR codes, barcode scanning, and automated notifications
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
