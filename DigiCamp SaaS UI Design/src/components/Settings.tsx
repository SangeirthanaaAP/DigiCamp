import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Download, 
  Trash2,
  Mail,
  Smartphone,
  Monitor,
  Save,
  AlertTriangle
} from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    campaignReminders: true,
    weeklyReports: true,
    socialUpdates: false,
    securityAlerts: true,
    
    // Appearance
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-8',
    
    // Privacy
    dataCollection: true,
    analytics: true,
    cookieConsent: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginNotifications: true
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export initiated. You will receive an email when ready.');
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmation) {
      console.log('Account deletion initiated...');
      alert('Account deletion request submitted. You will receive an email confirmation.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Customize your DigiCamp experience</p>
        </div>
        <Button 
          onClick={handleSaveSettings}
          className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-gray-400 text-sm">Receive updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-gray-400 text-sm">Browser notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Campaign Reminders</Label>
                  <p className="text-gray-400 text-sm">Scheduled campaign alerts</p>
                </div>
                <Switch
                  checked={settings.campaignReminders}
                  onCheckedChange={(checked) => handleSettingChange('campaignReminders', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Weekly Reports</Label>
                  <p className="text-gray-400 text-sm">Performance summaries</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Social Media Updates</Label>
                  <p className="text-gray-400 text-sm">Platform status changes</p>
                </div>
                <Switch
                  checked={settings.socialUpdates}
                  onCheckedChange={(checked) => handleSettingChange('socialUpdates', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Security Alerts</Label>
                  <p className="text-gray-400 text-sm">Login and security notifications</p>
                </div>
                <Switch
                  checked={settings.securityAlerts}
                  onCheckedChange={(checked) => handleSettingChange('securityAlerts', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Two-Factor Authentication</Label>
                  <p className="text-gray-400 text-sm">Extra security for your account</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div>
                <Label className="text-white">Session Timeout</Label>
                <p className="text-gray-400 text-sm mb-2">Auto-logout after inactivity</p>
                <Select 
                  value={settings.sessionTimeout} 
                  onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Login Notifications</Label>
                  <p className="text-gray-400 text-sm">Alert on new device logins</p>
                </div>
                <Switch
                  checked={settings.loginNotifications}
                  onCheckedChange={(checked) => handleSettingChange('loginNotifications', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Analytics Collection</Label>
                  <p className="text-gray-400 text-sm">Help improve DigiCamp</p>
                </div>
                <Switch
                  checked={settings.analytics}
                  onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Cookie Consent</Label>
                  <p className="text-gray-400 text-sm">Allow tracking cookies</p>
                </div>
                <Switch
                  checked={settings.cookieConsent}
                  onCheckedChange={(checked) => handleSettingChange('cookieConsent', checked)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Appearance & Localization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white">Theme</Label>
              <p className="text-gray-400 text-sm mb-2">Choose your preferred appearance</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={settings.theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingChange('theme', 'dark')}
                  className={`flex items-center gap-2 ${
                    settings.theme === 'dark' 
                      ? 'bg-[#FF6A00] hover:bg-[#ff8533]' 
                      : 'border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  Dark
                </Button>
                <Button
                  variant={settings.theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingChange('theme', 'light')}
                  className={`flex items-center gap-2 ${
                    settings.theme === 'light' 
                      ? 'bg-[#FF6A00] hover:bg-[#ff8533]' 
                      : 'border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  Light
                </Button>
                <Button
                  variant={settings.theme === 'auto' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingChange('theme', 'auto')}
                  className={`flex items-center gap-2 ${
                    settings.theme === 'auto' 
                      ? 'bg-[#FF6A00] hover:bg-[#ff8533]' 
                      : 'border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  Auto
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">Language</Label>
              <p className="text-gray-400 text-sm mb-2">Select your preferred language</p>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Timezone</Label>
              <p className="text-gray-400 text-sm mb-2">Your local timezone for scheduling</p>
              <Select 
                value={settings.timezone} 
                onValueChange={(value) => handleSettingChange('timezone', value)}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                  <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                  <SelectItem value="UTC+1">UTC+1 (Berlin)</SelectItem>
                  <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Account */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Download className="w-5 h-5" />
              Data & Account Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Export Data</h4>
                    <p className="text-gray-400 text-sm">Download your account data</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportData}
                    className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Storage Usage</h4>
                    <p className="text-gray-400 text-sm">45.2 MB of 100 GB used</p>
                  </div>
                  <Badge variant="outline" className="border-green-500/20 text-green-400">
                    0.045%
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '0.045%' }}></div>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2a2a2a]" />

              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-red-400 font-medium">Danger Zone</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteAccount}
                      className="mt-3 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              <p>DigiCamp v2.1.0 • Last updated: September 15, 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}