import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Camera, 
  Save, 
  Key, 
  Mail, 
  Phone, 
  Building, 
  User,
  Calendar,
  Shield,
  Edit
} from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@digicamp.com',
    phone: '+1 (555) 123-4567',
    company: 'DigiCamp Solutions',
    bio: 'Digital marketing enthusiast with 5+ years of experience in campaign management and social media strategy. Passionate about leveraging AI to create impactful marketing campaigns.',
    avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3NTc4OTc2NTd8MA&ixlib=rb-4.1.0&q=80&w=300'
  });

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const accountStats = [
    { label: 'Campaigns Created', value: '24', icon: Calendar },
    { label: 'Days Active', value: '127', icon: User },
    { label: 'Platforms Connected', value: '5', icon: Shield }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.avatar} alt="Profile" />
                    <AvatarFallback className="bg-[#FF6A00] text-white text-xl">
                      {formData.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{formData.fullName}</h3>
                  <p className="text-gray-400">{formData.email}</p>
                  <Badge className="mt-1 bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/20">
                    Premium Account
                  </Badge>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00] disabled:opacity-60"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00] disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-gray-400 opacity-60"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
              </div>

              <div>
                <Label htmlFor="company" className="text-white">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00] disabled:opacity-60"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00] disabled:opacity-60 min-h-24 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-[#FF6A00]" />
                  <div>
                    <h4 className="text-white font-medium">Password</h4>
                    <p className="text-gray-400 text-sm">Last changed 30 days ago</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#FF6A00]" />
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                >
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FF6A00]" />
                  <div>
                    <h4 className="text-white font-medium">Login Notifications</h4>
                    <p className="text-gray-400 text-sm">Get notified of new sign-ins</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                  Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accountStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#FF6A00]" />
                      <span className="text-gray-400 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-white font-medium">{stat.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF6A00]" />
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-white text-sm">{formData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF6A00]" />
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-white text-sm">{formData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-[#FF6A00]" />
                <div>
                  <p className="text-gray-400 text-xs">Company</p>
                  <p className="text-white text-sm">{formData.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className="bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/20 mb-2">
                  Premium Plan
                </Badge>
                <p className="text-gray-400 text-sm">Next billing: Oct 15, 2024</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Campaigns:</span>
                  <span className="text-white">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage:</span>
                  <span className="text-white">100 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Credits:</span>
                  <span className="text-white">500/month</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              >
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}