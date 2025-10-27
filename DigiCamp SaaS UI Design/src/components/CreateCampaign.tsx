import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { 
  Upload, 
  Calendar, 
  Clock, 
  Sparkles, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Youtube,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface CreateCampaignProps {
  onNavigate: (page: string) => void;
}

export function CreateCampaign({ onNavigate }: CreateCampaignProps) {
  const [formData, setFormData] = useState({
    name: '',
    platforms: [] as string[],
    caption: '',
    scheduleDate: '',
    scheduleTime: '',
    media: [] as File[]
  });

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...files]
    }));
  };

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const generateAIContent = () => {
    const sampleContent = `🚀 Exciting news! Our latest product is here to revolutionize your workflow.

✨ Key features:
• Advanced AI-powered automation
• Seamless team collaboration
• Real-time analytics and insights
• Mobile-first design

Join thousands of satisfied customers who've already transformed their business. Get started today! 

#Innovation #ProductLaunch #Technology #AI #Automation #Business #Growth #NewProduct #Startup #TechNews`;

    setGeneratedContent(sampleContent);
  };

  const handleUseAIContent = () => {
    setFormData(prev => ({ ...prev, caption: generatedContent }));
    setAiModalOpen(false);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    alert('Campaign saved as draft!');
    onNavigate('campaigns');
  };

  const handleSchedule = () => {
    if (!formData.name || formData.platforms.length === 0) {
      alert('Please fill in campaign name and select at least one platform');
      return;
    }
    console.log('Scheduling campaign:', formData);
    alert('Campaign scheduled successfully!');
    onNavigate('campaigns');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Campaign</h1>
          <p className="text-gray-400 mt-1">Design and schedule your next marketing campaign</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => onNavigate('campaigns')}
          className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
        >
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Details */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]"
                />
              </div>

              <div>
                <Label className="text-white">Select Platforms</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = formData.platforms.includes(platform.id);
                    
                    return (
                      <div
                        key={platform.id}
                        onClick={() => handlePlatformToggle(platform.id)}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-[#FF6A00] bg-[#FF6A00]/10' 
                            : 'border-[#2a2a2a] hover:border-[#FF6A00]/50'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" style={{ color: platform.color }} />
                        <span className="text-white text-sm font-medium">{platform.name}</span>
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => {}}
                          className="ml-auto"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Media Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#FF6A00] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">Drop files here or click to upload</p>
                  <p className="text-gray-400 text-sm mb-4">Support for images and videos up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <Button asChild variant="outline" className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
                    <label htmlFor="media-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>

                {formData.media.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.media.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-[#2a2a2a] rounded-lg flex items-center justify-center relative overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          )}
                          <button
                            onClick={() => removeMedia(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Caption */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Caption & Content</CardTitle>
              <Dialog open={aiModalOpen} onOpenChange={setAiModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">AI Content Generator</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Generate engaging captions and hashtags for your campaign using AI
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Content Style</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Badge variant="outline" className="justify-center cursor-pointer hover:bg-[#FF6A00] hover:text-white">
                          Professional
                        </Badge>
                        <Badge variant="outline" className="justify-center cursor-pointer hover:bg-[#FF6A00] hover:text-white">
                          Casual
                        </Badge>
                        <Badge variant="outline" className="justify-center cursor-pointer hover:bg-[#FF6A00] hover:text-white">
                          Promotional
                        </Badge>
                        <Badge variant="outline" className="justify-center cursor-pointer hover:bg-[#FF6A00] hover:text-white">
                          Educational
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={generateAIContent}
                      className="w-full bg-[#FF6A00] hover:bg-[#ff8533]"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </Button>

                    {generatedContent && (
                      <div className="space-y-4">
                        <div className="bg-[#0a0a0a] p-4 rounded-lg">
                          <p className="text-sm text-gray-400 mb-2">Generated Content:</p>
                          <div className="text-white whitespace-pre-wrap text-sm">
                            {generatedContent}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleUseAIContent}
                            className="flex-1 bg-[#FF6A00] hover:bg-[#ff8533]"
                          >
                            Use This Content
                          </Button>
                          <Button 
                            onClick={generateAIContent}
                            variant="outline"
                            className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                          >
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your campaign caption here..."
                value={formData.caption}
                onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                className="min-h-32 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00] resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">
                  {formData.caption.length}/280 characters
                </p>
                <p className="text-xs text-gray-400">
                  {formData.caption.split(' ').filter(word => word.startsWith('#')).length} hashtags
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date" className="text-white">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-white">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                  className="mt-2 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Campaign Summary */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Platforms:</span>
                <span className="text-white">{formData.platforms.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Media files:</span>
                <span className="text-white">{formData.media.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Caption length:</span>
                <span className="text-white">{formData.caption.length} chars</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hashtags:</span>
                <span className="text-white">{formData.caption.split(' ').filter(word => word.startsWith('#')).length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={handleSchedule}
              className="w-full bg-[#FF6A00] hover:bg-[#ff8533] text-white"
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule Campaign
            </Button>
            <Button 
              onClick={handleSaveDraft}
              variant="outline"
              className="w-full border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}