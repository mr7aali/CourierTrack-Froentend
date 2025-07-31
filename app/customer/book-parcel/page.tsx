"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Package, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function BookParcelPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Pickup Details
    pickupName: "",
    pickupPhone: "",
    pickupAddress: "",
    pickupCity: "",
    pickupPincode: "",

    // Delivery Details
    recipientName: "",
    recipientPhone: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPincode: "",

    // Parcel Details
    parcelType: "",
    weight: "",
    dimensions: "",
    value: "",
    description: "",

    // Payment
    paymentMode: "prepaid",
    codAmount: "",

    // Additional
    fragile: false,
    urgent: false,
  })

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Parcel booked successfully!",
        description:
          "Your parcel has been scheduled for pickup. Tracking ID: PKG" +
          Math.random().toString(36).substr(2, 6).toUpperCase(),
      })

      router.push("/customer/dashboard")
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userRole="customer">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/customer/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book New Parcel</h1>
            <p className="text-gray-600 dark:text-gray-300">Fill in the details to schedule a pickup</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pickup Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Pickup Details
              </CardTitle>
              <CardDescription>Where should we pick up the parcel?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupName">Contact Name</Label>
                <Input
                  id="pickupName"
                  value={formData.pickupName}
                  onChange={(e) => setFormData({ ...formData, pickupName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupPhone">Phone Number</Label>
                <Input
                  id="pickupPhone"
                  type="tel"
                  value={formData.pickupPhone}
                  onChange={(e) => setFormData({ ...formData, pickupPhone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Textarea
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupCity">City</Label>
                <Input
                  id="pickupCity"
                  value={formData.pickupCity}
                  onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupPincode">Pincode</Label>
                <Input
                  id="pickupPincode"
                  value={formData.pickupPincode}
                  onChange={(e) => setFormData({ ...formData, pickupPincode: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Delivery Details
              </CardTitle>
              <CardDescription>Where should we deliver the parcel?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Phone Number</Label>
                <Input
                  id="recipientPhone"
                  type="tel"
                  value={formData.recipientPhone}
                  onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Textarea
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryCity">City</Label>
                <Input
                  id="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryPincode">Pincode</Label>
                <Input
                  id="deliveryPincode"
                  value={formData.deliveryPincode}
                  onChange={(e) => setFormData({ ...formData, deliveryPincode: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Parcel Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-purple-600" />
                Parcel Details
              </CardTitle>
              <CardDescription>Tell us about your parcel</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parcelType">Parcel Type</Label>
                <Select
                  value={formData.parcelType}
                  onValueChange={(value) => setFormData({ ...formData, parcelType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parcel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="food">Food Items</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                <Input
                  id="dimensions"
                  placeholder="e.g., 30 x 20 x 10"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Declared Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the contents"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="fragile"
                  checked={formData.fragile}
                  onCheckedChange={(checked) => setFormData({ ...formData, fragile: checked })}
                />
                <Label htmlFor="fragile">Fragile Item</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked })}
                />
                <Label htmlFor="urgent">Urgent Delivery</Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-orange-600" />
                Payment Details
              </CardTitle>
              <CardDescription>Choose your payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Mode</Label>
                <Select
                  value={formData.paymentMode}
                  onValueChange={(value) => setFormData({ ...formData, paymentMode: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                    <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.paymentMode === "cod" && (
                <div className="space-y-2">
                  <Label htmlFor="codAmount">COD Amount ($)</Label>
                  <Input
                    id="codAmount"
                    type="number"
                    value={formData.codAmount}
                    onChange={(e) => setFormData({ ...formData, codAmount: e.target.value })}
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/customer/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Parcel"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
