import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MoreVertical
} from 'lucide-react';

interface CampaignsListProps {
  onNavigate: (page: string) => void;
}

export function CampaignsList({ onNavigate }: CampaignsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const campaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      platforms: ['facebook', 'instagram', 'twitter'],
      scheduledDate: '2024-09-20',
      status: 'Active',
      engagement: '12.5K',
      reach: '45.2K',
      caption: 'Get ready for our biggest summer sale yet! 🌞 Save up to 50% on all products. Limited time offer - shop now!',
      media: ['/api/placeholder/300/200']
    },
    {
      id: 2,
      name: 'Product Launch',
      platforms: ['linkedin', 'twitter'],
      scheduledDate: '2024-09-18',
      status: 'Scheduled',
      engagement: '0',
      reach: '0',
      caption: 'Introducing our revolutionary new product that will change how you work. Be among the first to experience the future.',
      media: ['/api/placeholder/300/200', '/api/placeholder/300/200']
    },
    {
      id: 3,
      name: 'Holiday Campaign',
      platforms: ['instagram', 'youtube'],
      scheduledDate: '2024-09-15',
      status: 'Draft',
      engagement: '0',
      reach: '0',
      caption: 'This holiday season, give the gift of innovation. Our special holiday bundles are here.',
      media: []
    },
    {
      id: 4,
      name: 'Brand Awareness',
      platforms: ['facebook', 'instagram', 'linkedin'],
      scheduledDate: '2024-09-12',
      status: 'Completed',
      engagement: '18.3K',
      reach: '67.8K',
      caption: 'Building the future of digital marketing, one campaign at a time. Join thousands of satisfied customers.',
      media: ['/api/placeholder/300/200']
    },
    {
      id: 5,
      name: 'Customer Testimonials',
      platforms: ['facebook', 'linkedin'],
      scheduledDate: '2024-09-10',
      status: 'Active',
      engagement: '8.7K',
      reach: '32.1K',
      caption: 'Hear what our customers are saying about their success with DigiCamp. Real stories, real results.',
      media: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200']
    }
  ];

  const platformIcons: { [key: string]: any } = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube
  };

  const platformColors: { [key: string]: string } = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    twitter: '#000000',
    youtube: '#FF0000'
  };

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

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400 mt-1">Manage and monitor your marketing campaigns</p>
        </div>
        <Button 
          onClick={() => onNavigate('create-campaign')}
          className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0a0a0a] border-[#2a2a2a] text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table/Grid */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white">
            All Campaigns ({filteredCampaigns.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <TableHead className="text-gray-400">Campaign Name</TableHead>
                  <TableHead className="text-gray-400">Platforms</TableHead>
                  <TableHead className="text-gray-400">Scheduled Date</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Engagement</TableHead>
                  <TableHead className="text-gray-400">Reach</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <TableCell className="text-white font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {campaign.platforms.map((platform) => {
                          const Icon = platformIcons[platform];
                          return (
                            <Icon
                              key={platform}
                              className="w-4 h-4"
                              style={{ color: platformColors[platform] }}
                            />
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {campaign.scheduledDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{campaign.engagement}</TableCell>
                    <TableCell className="text-gray-400">{campaign.reach}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-400 hover:text-white hover:bg-[#2a2a2a] p-1"
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white">{selectedCampaign?.name}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                View campaign details including platforms, content, and performance metrics
                              </DialogDescription>
                            </DialogHeader>
                            {selectedCampaign && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Platforms</h4>
                                    <div className="flex items-center gap-2">
                                      {selectedCampaign.platforms.map((platform: string) => {
                                        const Icon = platformIcons[platform];
                                        return (
                                          <div key={platform} className="flex items-center gap-1">
                                            <Icon
                                              className="w-4 h-4"
                                              style={{ color: platformColors[platform] }}
                                            />
                                            <span className="text-sm text-white capitalize">{platform}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
                                    <Badge variant={getStatusBadgeVariant(selectedCampaign.status)}>
                                      {selectedCampaign.status}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">Caption</h4>
                                  <p className="text-white text-sm bg-[#0a0a0a] p-3 rounded-lg">
                                    {selectedCampaign.caption}
                                  </p>
                                </div>

                                {selectedCampaign.media.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Media ({selectedCampaign.media.length})</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                      {selectedCampaign.media.map((media: string, index: number) => (
                                        <div key={index} className="aspect-square bg-[#2a2a2a] rounded-lg overflow-hidden">
                                          <img 
                                            src={media} 
                                            alt={`Media ${index + 1}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2a2a2a]">
                                  <div className="text-center">
                                    <p className="text-sm text-gray-400">Scheduled</p>
                                    <p className="text-white font-medium">{selectedCampaign.scheduledDate}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-400">Engagement</p>
                                    <p className="text-white font-medium">{selectedCampaign.engagement}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-400">Reach</p>
                                    <p className="text-white font-medium">{selectedCampaign.reach}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium">{campaign.name}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {campaign.scheduledDate}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {campaign.platforms.map((platform) => {
                        const Icon = platformIcons[platform];
                        return (
                          <Icon
                            key={platform}
                            className="w-4 h-4"
                            style={{ color: platformColors[platform] }}
                          />
                        );
                      })}
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-[#2a2a2a]">
                    <div>
                      <p className="text-xs text-gray-400">Engagement</p>
                      <p className="text-white font-medium">{campaign.engagement}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Reach</p>
                      <p className="text-white font-medium">{campaign.reach}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No campaigns found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
              <Button 
                onClick={() => onNavigate('create-campaign')}
                className="bg-[#FF6A00] hover:bg-[#ff8533] text-white mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Campaign
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}