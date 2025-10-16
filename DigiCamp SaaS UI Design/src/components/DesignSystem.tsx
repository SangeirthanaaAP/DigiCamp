import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Logo } from './Logo';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap,
  Moon,
  Sun,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';

export function DesignSystem() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: 'DigiCamp Orange', value: '#FF6A00', var: '--digicamp-orange', description: 'Primary brand color' },
    { name: 'Orange Light', value: '#ff8533', var: '--digicamp-orange-light', description: 'Hover states' },
    { name: 'Orange Dark', value: '#cc5500', var: '--digicamp-orange-dark', description: 'Active states' },
    { name: 'Black', value: '#0a0a0a', var: '--digicamp-black', description: 'Main background' },
    { name: 'Gray Dark', value: '#1a1a1a', var: '--digicamp-gray-dark', description: 'Card backgrounds' },
    { name: 'Gray', value: '#2a2a2a', var: '--digicamp-gray', description: 'Borders & dividers' },
    { name: 'Gray Light', value: '#a3a3a3', var: '--digicamp-gray-light', description: 'Secondary text' },
    { name: 'Purple', value: '#8b5cf6', var: '--digicamp-purple', description: 'Gradient accent' },
    { name: 'Pink', value: '#ec4899', var: '--digicamp-pink', description: 'Gradient accent' },
    { name: 'Blue', value: '#3b82f6', var: '--digicamp-blue', description: 'Gradient accent' },
  ];

  const typography = [
    { name: 'Heading 1', size: '36px', weight: '700', element: 'h1', class: 'text-3xl font-bold' },
    { name: 'Heading 2', size: '24px', weight: '600', element: 'h2', class: 'text-xl font-semibold' },
    { name: 'Heading 3', size: '18px', weight: '600', element: 'h3', class: 'text-lg font-semibold' },
    { name: 'Body', size: '16px', weight: '400', element: 'p', class: 'text-base' },
    { name: 'Small', size: '12px', weight: '400', element: 'small', class: 'text-xs' },
  ];

  const spacing = [
    { name: 'xs', value: '4px', class: 'p-1' },
    { name: 'sm', value: '8px', class: 'p-2' },
    { name: 'md', value: '16px', class: 'p-4' },
    { name: 'lg', value: '24px', class: 'p-6' },
    { name: 'xl', value: '32px', class: 'p-8' },
    { name: '2xl', value: '48px', class: 'p-12' },
  ];

  const shadows = [
    { name: 'Card Shadow', class: 'shadow-lg', description: 'Standard card elevation' },
    { name: 'Hover Shadow', class: 'shadow-xl', description: 'Hover state elevation' },
    { name: 'Modal Shadow', class: 'shadow-2xl', description: 'Modal and overlay elevation' },
  ];

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const ColorSwatch = ({ color }: { color: typeof colors[0] }) => (
    <div 
      className="group relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#FF6A00] transition-colors cursor-pointer"
      onClick={() => copyToClipboard(color.value, color.name)}
    >
      <div 
        className="w-full h-16 rounded-lg mb-3"
        style={{ backgroundColor: color.value }}
      />
      <h4 className="text-white font-medium">{color.name}</h4>
      <p className="text-gray-400 text-sm font-mono">{color.value}</p>
      <p className="text-gray-500 text-xs mt-1">{color.description}</p>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {copiedColor === color.name ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Design System</h1>
        <p className="text-gray-400 mt-1">DigiCamp visual language and component library</p>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="colors" className="data-[state=active]:bg-[#FF6A00]">
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="data-[state=active]:bg-[#FF6A00]">
            <Type className="w-4 h-4 mr-2" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="spacing" className="data-[state=active]:bg-[#FF6A00]">
            <Layout className="w-4 h-4 mr-2" />
            Spacing
          </TabsTrigger>
          <TabsTrigger value="components" className="data-[state=active]:bg-[#FF6A00]">
            <Zap className="w-4 h-4 mr-2" />
            Components
          </TabsTrigger>
        </TabsList>

        {/* Colors */}
        <TabsContent value="colors" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Color Palette</CardTitle>
              <p className="text-gray-400 text-sm">Click any color to copy its hex value</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <ColorSwatch key={color.name} color={color} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Gradients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-lg gradient-purple-pink-blue" />
                  <h4 className="text-white font-medium">Primary Gradient</h4>
                  <p className="text-gray-400 text-sm font-mono">purple → pink → blue</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg gradient-orange" />
                  <h4 className="text-white font-medium">Orange Gradient</h4>
                  <p className="text-gray-400 text-sm font-mono">#FF6A00 → #ff8533</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg gradient-dark" />
                  <h4 className="text-white font-medium">Dark Gradient</h4>
                  <p className="text-gray-400 text-sm font-mono">#0a0a0a → #1a1a1a</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography */}
        <TabsContent value="typography" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Typography Scale</CardTitle>
              <p className="text-gray-400 text-sm">Inter font family with optimized hierarchy</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {typography.map((type) => (
                <div key={type.name} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                  <div className="flex-1">
                    <div className={`text-white ${type.class}`}>
                      {type.name} - The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span>Size: {type.size}</span>
                      <span>Weight: {type.weight}</span>
                      <span>Element: {type.element}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(type.class, type.name)}
                    className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spacing */}
        <TabsContent value="spacing" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Spacing System</CardTitle>
              <p className="text-gray-400 text-sm">8px base scale for consistent spacing</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {spacing.map((space) => (
                  <div key={space.name} className="p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">{space.name}</span>
                      <span className="text-gray-400 text-sm">{space.value}</span>
                    </div>
                    <div className="bg-[#2a2a2a] rounded">
                      <div 
                        className="bg-[#FF6A00] rounded"
                        style={{ padding: space.value }}
                      >
                        <div className="bg-[#1a1a1a] rounded h-4" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 font-mono">{space.class}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Shadows & Elevation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shadows.map((shadow) => (
                  <div key={shadow.name} className="space-y-3">
                    <div className={`h-24 bg-[#2a2a2a] rounded-lg ${shadow.class}`} />
                    <div>
                      <h4 className="text-white font-medium">{shadow.name}</h4>
                      <p className="text-gray-400 text-sm">{shadow.description}</p>
                      <p className="text-gray-400 text-xs font-mono mt-1">{shadow.class}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Components */}
        <TabsContent value="components" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Logo & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Logo size="lg" />
                  <p className="text-gray-400 text-sm">Large (48px)</p>
                </div>
                <div className="space-y-3">
                  <Logo size="md" />
                  <p className="text-gray-400 text-sm">Medium (32px)</p>
                </div>
                <div className="space-y-3">
                  <Logo size="sm" />
                  <p className="text-gray-400 text-sm">Small (24px)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-[#FF6A00] hover:bg-[#ff8533]">Primary Button</Button>
                <Button variant="outline" className="border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]">Secondary Button</Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]">Ghost Button</Button>
                <Button size="sm" className="bg-[#FF6A00] hover:bg-[#ff8533]">Small</Button>
                <Button size="lg" className="bg-[#FF6A00] hover:bg-[#ff8533]">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input placeholder="Text input" className="bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]" />
                  <div className="flex items-center space-x-2">
                    <Switch className="data-[state=checked]:bg-[#FF6A00]" />
                    <span className="text-white">Toggle switch</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?w=32&h=32&fit=crop&crop=faces" />
                      <AvatarFallback className="bg-[#FF6A00] text-white">JD</AvatarFallback>
                    </Avatar>
                    <span className="text-white">Avatar component</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/20">Primary</Badge>
                    <Badge variant="outline">Secondary</Badge>
                    <Badge variant="secondary">Muted</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Cards & Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Example Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      This is an example of a standard card component with header and content areas.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#FF6A00] transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Hover Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      Cards can have hover states for interactive elements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}