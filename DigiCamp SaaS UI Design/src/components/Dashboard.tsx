import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon,
  Plus,
  Eye,
  Edit,
  Trash2,
  Activity
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const kpiData = [
    {
      title: 'Total Campaigns',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Active Campaigns', 
      value: '8',
      change: '+3%',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'Scheduled Posts',
      value: '156',
      change: '+28%',
      trend: 'up',
      icon: CalendarIcon
    },
    {
      title: 'Channels Connected',
      value: '5',
      change: '+1',
      trend: 'up',
      icon: Users,
      onClick: () => onNavigate('social-accounts')
    }
  ];

  const recentCampaigns = [
    {
      name: 'Summer Sale 2024',
      date: '2024-09-20',
      status: 'Active',
      platforms: ['Facebook', 'Instagram', 'Twitter']
    },
    {
      name: 'Product Launch',
      date: '2024-09-18',
      status: 'Scheduled',
      platforms: ['LinkedIn', 'Twitter']
    },
    {
      name: 'Holiday Campaign',
      date: '2024-09-15',
      status: 'Draft',
      platforms: ['Instagram', 'TikTok']
    },
    {
      name: 'Brand Awareness',
      date: '2024-09-12',
      status: 'Completed',
      platforms: ['Facebook', 'Instagram', 'LinkedIn']
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Scheduled':
        return 'secondary';
      case 'Draft':
        return 'outline';
      case 'Completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, John!</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your campaigns today.</p>
        </div>
        <Button 
          onClick={() => onNavigate('create-campaign')}
          className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card 
              key={index} 
              className={`bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#FF6A00] transition-colors ${
                kpi.onClick ? 'cursor-pointer' : ''
              }`}
              onClick={kpi.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {kpi.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-[#FF6A00]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="flex items-center space-x-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{kpi.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <Card className="lg:col-span-2 bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Campaigns</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('campaigns')}
              className="text-[#FF6A00] hover:text-[#ff8533] hover:bg-[#2a2a2a]"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCampaigns.map((campaign, index) => (
                  <TableRow key={index} className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <TableCell className="text-white font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {campaign.date}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a] p-1">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a] p-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a] p-1">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mini Calendar */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Campaign Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="text-white [&_.rdp-head_cell]:text-gray-400 [&_.rdp-cell]:text-white [&_.rdp-day_selected]:bg-[#FF6A00] [&_.rdp-day_selected]:text-white [&_.rdp-day]:hover:bg-[#2a2a2a] [&_.rdp-day_today]:bg-[#2a2a2a] [&_.rdp-day_today]:text-[#FF6A00]"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-[#FF6A00] rounded-full"></div>
                <span className="text-gray-400">Scheduled: 3 campaigns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Active: 2 campaigns</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}