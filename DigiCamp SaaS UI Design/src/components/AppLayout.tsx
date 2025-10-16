import { ReactNode, useState } from 'react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Home, 
  Plus, 
  FolderOpen, 
  Image, 
  Users, 
  User, 
  Settings, 
  Bell,
  Menu,
  X
} from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AppLayout({ children, currentPage, onNavigate, onLogout }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create-campaign', label: 'Create Campaign', icon: Plus },
    { id: 'campaigns', label: 'Campaigns', icon: FolderOpen },
    { id: 'media-library', label: 'Media Library', icon: Image },
    { id: 'social-accounts', label: 'Social Accounts', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f0f0f] border-r border-[#2a2a2a] transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-200 ease-in-out
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              <Logo size="md" />
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-[#2a2a2a]"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-[#FF6A00] text-white' 
                      : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback className="bg-[#FF6A00] text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">john@digicamp.com</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              className="w-full mt-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-[#2a2a2a]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white capitalize">
              {currentPage.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-[#2a2a2a] relative"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-[#FF6A00] text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
            
            <Avatar className="w-8 h-8 cursor-pointer" onClick={() => onNavigate('profile')}>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-[#FF6A00] text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}