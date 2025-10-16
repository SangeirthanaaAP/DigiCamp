import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Youtube,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3
} from 'lucide-react';

export function SocialAccounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      connected: true,
      username: '@digicamp_official',
      followers: '12.5K',
      lastSync: '2 hours ago'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      connected: true,
      username: '@digicamp.official',
      followers: '8.2K',
      lastSync: '1 hour ago'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      connected: true,
      username: 'DigiCamp Solutions',
      followers: '5.8K',
      lastSync: '3 hours ago'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      color: '#000000',
      connected: false,
      username: '',
      followers: '',
      lastSync: ''
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: '#FF0000',
      connected: true,
      username: 'DigiCamp Channel',
      followers: '2.1K',
      lastSync: '5 hours ago'
    }
  ]);

  const toggleConnection = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            connected: !account.connected,
            username: !account.connected ? `@digicamp_${account.id}` : '',
            followers: !account.connected ? '0' : '',
            lastSync: !account.connected ? 'Just now' : ''
          }
        : account
    ));
  };

  const connectedCount = accounts.filter(account => account.connected).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Social Accounts</h1>
        <p className="text-gray-400 mt-1">Manage your connected social media platforms</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Channels Connected
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-[#FF6A00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{connectedCount}</div>
            <p className="text-xs text-gray-400">
              out of {accounts.length} platforms
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Followers
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-[#FF6A00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28.6K</div>
            <p className="text-xs text-gray-400">
              across all platforms
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Last Sync
            </CardTitle>
            <Settings className="w-4 h-4 text-[#FF6A00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1h</div>
            <p className="text-xs text-gray-400">
              ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Social Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = account.icon;
          
          return (
            <Card 
              key={account.id} 
              className={`bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#FF6A00] transition-all duration-200 ${
                account.connected ? 'ring-1 ring-green-500/20' : ''
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${account.color}15` }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: account.color }} 
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{account.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {account.connected ? (
                        <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-red-500/20 text-red-400">
                          <XCircle className="w-3 h-3 mr-1" />
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={account.connected}
                  onCheckedChange={() => toggleConnection(account.id)}
                  className="data-[state=checked]:bg-[#FF6A00]"
                />
              </CardHeader>
              
              <CardContent className="space-y-4">
                {account.connected ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Username:</span>
                      <span className="text-white text-sm font-medium">{account.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Followers:</span>
                      <span className="text-white text-sm font-medium">{account.followers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Last Sync:</span>
                      <span className="text-white text-sm">{account.lastSync}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Settings
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        onClick={() => toggleConnection(account.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Connect your {account.name} account to start managing campaigns across this platform.
                    </p>
                    <Button
                      onClick={() => toggleConnection(account.id)}
                      className="w-full bg-[#FF6A00] hover:bg-[#ff8533] text-white"
                    >
                      Connect {account.name}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Connection Instructions */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white">Connection Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">What you can do:</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>• Schedule posts across multiple platforms</li>
                <li>• Monitor engagement and analytics</li>
                <li>• Manage content from one dashboard</li>
                <li>• Auto-sync follower counts</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Security & Privacy:</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>• OAuth 2.0 secure authentication</li>
                <li>• Read-only access by default</li>
                <li>• Revoke access anytime</li>
                <li>• No password storage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}