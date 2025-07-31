export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: "customer" | "agent" | "admin"
  createdAt: string
  updatedAt: string
}

export interface Parcel {
  id: string
  trackingId: string
  customerId: string
  agentId?: string

  // Pickup details
  pickupName: string
  pickupPhone: string
  pickupAddress: string
  pickupCity: string
  pickupPincode: string

  // Delivery details
  recipientName: string
  recipientPhone: string
  deliveryAddress: string
  deliveryCity: string
  deliveryPincode: string

  // Parcel details
  parcelType: string
  weight: number
  dimensions?: string
  value: number
  description?: string
  fragile: boolean
  urgent: boolean

  // Payment
  paymentMode: "prepaid" | "cod"
  codAmount?: number

  // Status and tracking
  status: "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed" | "returned"
  currentLocation?: {
    lat: number
    lng: number
    address: string
  }

  // Timestamps
  createdAt: string
  updatedAt: string
  pickedUpAt?: string
  deliveredAt?: string
  estimatedDelivery: string
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  vehicleType: string
  vehicleNumber: string
  currentLocation?: {
    lat: number
    lng: number
  }
  isActive: boolean
  assignedParcels: string[]
  createdAt: string
}

export interface ParcelStatusUpdate {
  id: string
  parcelId: string
  status: Parcel["status"]
  location?: {
    lat: number
    lng: number
    address: string
  }
  notes?: string
  timestamp: string
  updatedBy: string
}
