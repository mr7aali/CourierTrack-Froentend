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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  RefreshCw,
  Bell,
  Shield,
  Globe,
  Truck,
  MapPin,
  Database,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "CourierTrack",
    companyEmail: "admin@couriertrack.com",
    companyPhone: "+1 800-COURIER",
    companyAddress: "123 Business Ave, New York, NY 10001",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",

    // Delivery Settings
    defaultDeliveryTime: "24",
    maxDeliveryDistance: "50",
    deliveryFee: "5.00",
    codFee: "2.00",
    urgentDeliveryMultiplier: "1.5",
    fragileHandlingFee: "3.00",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    customerNotifications: true,
    agentNotifications: true,
    adminNotifications: true,

    // Security Settings
    passwordMinLength: "8",
    sessionTimeout: "30",
    twoFactorAuth: false,
    loginAttempts: "5",
    accountLockoutTime: "15",

    // Integration Settings
    googleMapsApiKey: "",
    twilioApiKey: "",
    stripeApiKey: "",
    firebaseApiKey: "",

    // System Settings
    maintenanceMode: false,
    debugMode: false,
    dataRetentionDays: "365",
    backupFrequency: "daily",
    logLevel: "info",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Settings saved successfully",
        description: "All system settings have been updated",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (
      confirm("Are you sure you want to reset all settings to default values?")
    ) {
      // Reset to default values
      toast({
        title: "Settings reset",
        description: "All settings have been reset to default values",
      });
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              System Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Configure system-wide settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleResetSettings}
              variant="outline"
              className="bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic company and system information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, companyEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, companyPhone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    setSettings({ ...settings, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time (CT)
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time (MT)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time (PT)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) =>
                    setSettings({ ...settings, currency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) =>
                    setSettings({ ...settings, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="bn">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) =>
                  setSettings({ ...settings, companyAddress: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Delivery Settings
            </CardTitle>
            <CardDescription>
              Configure delivery parameters and pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="defaultDeliveryTime">
                  Default Delivery Time (hours)
                </Label>
                <Input
                  id="defaultDeliveryTime"
                  type="number"
                  value={settings.defaultDeliveryTime}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultDeliveryTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDeliveryDistance">
                  Max Delivery Distance (km)
                </Label>
                <Input
                  id="maxDeliveryDistance"
                  type="number"
                  value={settings.maxDeliveryDistance}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxDeliveryDistance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryFee">Base Delivery Fee ($)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  step="0.01"
                  value={settings.deliveryFee}
                  onChange={(e) =>
                    setSettings({ ...settings, deliveryFee: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codFee">COD Processing Fee ($)</Label>
                <Input
                  id="codFee"
                  type="number"
                  step="0.01"
                  value={settings.codFee}
                  onChange={(e) =>
                    setSettings({ ...settings, codFee: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgentDeliveryMultiplier">
                  Urgent Delivery Multiplier
                </Label>
                <Input
                  id="urgentDeliveryMultiplier"
                  type="number"
                  step="0.1"
                  value={settings.urgentDeliveryMultiplier}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      urgentDeliveryMultiplier: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fragileHandlingFee">
                  Fragile Handling Fee ($)
                </Label>
                <Input
                  id="fragileHandlingFee"
                  type="number"
                  step="0.01"
                  value={settings.fragileHandlingFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fragileHandlingFee: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          emailNotifications: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <Switch
                      id="smsNotifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, smsNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">
                      Push Notifications
                    </Label>
                    <Switch
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">User Groups</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="customerNotifications">
                      Customer Notifications
                    </Label>
                    <Switch
                      id="customerNotifications"
                      checked={settings.customerNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          customerNotifications: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="agentNotifications">
                      Agent Notifications
                    </Label>
                    <Switch
                      id="agentNotifications"
                      checked={settings.agentNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          agentNotifications: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="adminNotifications">
                      Admin Notifications
                    </Label>
                    <Switch
                      id="adminNotifications"
                      checked={settings.adminNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          adminNotifications: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">
                  Minimum Password Length
                </Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      passwordMinLength: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    setSettings({ ...settings, sessionTimeout: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Input
                  id="loginAttempts"
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) =>
                    setSettings({ ...settings, loginAttempts: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountLockoutTime">
                  Account Lockout Time (minutes)
                </Label>
                <Input
                  id="accountLockoutTime"
                  type="number"
                  value={settings.accountLockoutTime}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      accountLockoutTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Require 2FA for all admin accounts
                </p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, twoFactorAuth: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Integration Settings
            </CardTitle>
            <CardDescription>
              Configure third-party service integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                <Input
                  id="googleMapsApiKey"
                  type="password"
                  placeholder="Enter Google Maps API key"
                  value={settings.googleMapsApiKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      googleMapsApiKey: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twilioApiKey">Twilio API Key (SMS)</Label>
                <Input
                  id="twilioApiKey"
                  type="password"
                  placeholder="Enter Twilio API key"
                  value={settings.twilioApiKey}
                  onChange={(e) =>
                    setSettings({ ...settings, twilioApiKey: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeApiKey">Stripe API Key (Payments)</Label>
                <Input
                  id="stripeApiKey"
                  type="password"
                  placeholder="Enter Stripe API key"
                  value={settings.stripeApiKey}
                  onChange={(e) =>
                    setSettings({ ...settings, stripeApiKey: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firebaseApiKey">
                  Firebase API Key (Push Notifications)
                </Label>
                <Input
                  id="firebaseApiKey"
                  type="password"
                  placeholder="Enter Firebase API key"
                  value={settings.firebaseApiKey}
                  onChange={(e) =>
                    setSettings({ ...settings, firebaseApiKey: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              System Settings
            </CardTitle>
            <CardDescription>
              Configure system maintenance and data management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dataRetentionDays">Data Retention (days)</Label>
                <Input
                  id="dataRetentionDays"
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      dataRetentionDays: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) =>
                    setSettings({ ...settings, backupFrequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logLevel">Log Level</Label>
                <Select
                  value={settings.logLevel}
                  onValueChange={(value) =>
                    setSettings({ ...settings, logLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Enable maintenance mode to restrict access
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, maintenanceMode: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Enable debug mode for development
                  </p>
                </div>
                <Switch
                  id="debugMode"
                  checked={settings.debugMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, debugMode: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading} size="lg">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving Settings..." : "Save All Settings"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
