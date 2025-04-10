
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, Clock, Store, Mail, Bell } from "lucide-react";

const SettingsManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  // Mock restaurant settings
  const [restaurantName, setRestaurantName] = useState("Swastik Restaurant");
  const [email, setEmail] = useState("contact@swastik.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main Street, City, State, 12345");
  
  // Mock business hours
  const [businessHours, setBusinessHours] = useState({
    monday: { open: "11:00", close: "22:00", closed: false },
    tuesday: { open: "11:00", close: "22:00", closed: false },
    wednesday: { open: "11:00", close: "22:00", closed: false },
    thursday: { open: "11:00", close: "22:00", closed: false },
    friday: { open: "11:00", close: "23:00", closed: false },
    saturday: { open: "12:00", close: "23:00", closed: false },
    sunday: { open: "12:00", close: "21:00", closed: false },
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your restaurant general settings have been updated.",
    });
  };

  const handleSaveHours = () => {
    toast({
      title: "Business Hours Updated",
      description: "Your restaurant hours have been saved.",
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const updateBusinessHour = (day: string, field: string, value: string | boolean) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day as keyof typeof businessHours],
        [field]: value
      }
    });
  };

  const updateNotificationSetting = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value
    });
  };

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Restaurant Settings
          </CardTitle>
          <CardDescription>
            Configure your restaurant settings, hours of operation, and notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="general" className="flex items-center">
                <Store className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="hours" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Business Hours
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            {/* General Settings Tab */}
            <TabsContent value="general">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input 
                      id="restaurantName" 
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveGeneralSettings}>
                    Save General Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Business Hours Tab */}
            <TabsContent value="hours">
              <div className="space-y-4">
                {weekdays.map((day) => (
                  <div key={day} className="flex items-center space-x-4 py-3 border-b last:border-0">
                    <div className="w-1/4 capitalize font-medium">{day}</div>
                    <div className="flex items-center space-x-4 flex-1">
                      <Switch 
                        checked={!businessHours[day as keyof typeof businessHours].closed}
                        onCheckedChange={(checked) => updateBusinessHour(day, 'closed', !checked)}
                      />
                      
                      {!businessHours[day as keyof typeof businessHours].closed ? (
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="flex flex-col space-y-1 flex-1">
                            <Label htmlFor={`${day}-open`}>Open</Label>
                            <Input 
                              id={`${day}-open`}
                              type="time"
                              value={businessHours[day as keyof typeof businessHours].open}
                              onChange={(e) => updateBusinessHour(day, 'open', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col space-y-1 flex-1">
                            <Label htmlFor={`${day}-close`}>Close</Label>
                            <Input 
                              id={`${day}-close`}
                              type="time"
                              value={businessHours[day as keyof typeof businessHours].close}
                              onChange={(e) => updateBusinessHour(day, 'close', e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Closed</div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button onClick={handleSaveHours}>Save Business Hours</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Order Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.orderAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting('orderAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">Receive promotional content and offers</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => updateNotificationSetting('marketingEmails', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium">System Updates</h4>
                      <p className="text-sm text-muted-foreground">Be notified about system changes and updates</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting('systemUpdates', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveNotificationSettings}>
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManagement;
