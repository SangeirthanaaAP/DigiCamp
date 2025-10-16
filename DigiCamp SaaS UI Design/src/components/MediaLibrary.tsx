import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Image as ImageIcon,
  Video,
  Download,
  Trash2,
  Calendar,
  FileImage,
  Eye,
  X,
} from "lucide-react";

export function MediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [filterType, setFilterType] = useState("all");

  const mediaFiles = [
    {
      id: 1,
      name: "summer-sale-hero.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-09-15",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      campaigns: ["Summer Sale 2024", "Product Launch"],
    },
    {
      id: 2,
      name: "product-showcase.mp4",
      type: "video",
      size: "15.7 MB",
      dimensions: "1280x720",
      uploadDate: "2024-09-14",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      campaigns: ["Product Launch"],
    },
    {
      id: 3,
      name: "testimonial-bg.jpg",
      type: "image",
      size: "1.8 MB",
      dimensions: "1600x900",
      uploadDate: "2024-09-12",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      campaigns: ["Customer Testimonials", "Brand Awareness"],
    },
    {
      id: 4,
      name: "brand-logo.svg",
      type: "image",
      size: "45 KB",
      dimensions: "512x512",
      uploadDate: "2024-09-10",
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      campaigns: ["Brand Awareness", "Summer Sale 2024"],
    },
    {
      id: 5,
      name: "holiday-banner.jpg",
      type: "image",
      size: "3.2 MB",
      dimensions: "2000x1000",
      uploadDate: "2024-09-08",
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      campaigns: ["Holiday Campaign"],
    },
    {
      id: 6,
      name: "demo-video.mp4",
      type: "video",
      size: "22.1 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-09-05",
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      campaigns: [],
    },
  ];

  const filteredMedia = mediaFiles.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    console.log("Uploading files:", files);
    // Handle file upload logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Media Library
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your campaign assets and media files
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="media-upload"
          />
          <Button
            asChild
            className="bg-[#FF6A00] hover:bg-[#ff8533] text-white"
          >
            <label
              htmlFor="media-upload"
              className="cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </label>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Total Files
                </p>
                <p className="text-white text-xl font-bold">
                  {mediaFiles.length}
                </p>
              </div>
              <FileImage className="w-8 h-8 text-[#FF6A00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Images</p>
                <p className="text-white text-xl font-bold">
                  {
                    mediaFiles.filter((f) => f.type === "image")
                      .length
                  }
                </p>
              </div>
              <ImageIcon className="w-8 h-8 text-[#FF6A00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Videos</p>
                <p className="text-white text-xl font-bold">
                  {
                    mediaFiles.filter((f) => f.type === "video")
                      .length
                  }
                </p>
              </div>
              <Video className="w-8 h-8 text-[#FF6A00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Storage Used
                </p>
                <p className="text-white text-xl font-bold">
                  45.2 MB
                </p>
              </div>
              <Upload className="w-8 h-8 text-[#FF6A00]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white focus:border-[#FF6A00] focus:ring-[#FF6A00]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Button
                  variant={
                    filterType === "all" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setFilterType("all")}
                  className={
                    filterType === "all"
                      ? "bg-[#FF6A00] hover:bg-[#ff8533]"
                      : "border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  }
                >
                  All
                </Button>
                <Button
                  variant={
                    filterType === "image"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setFilterType("image")}
                  className={
                    filterType === "image"
                      ? "bg-[#FF6A00] hover:bg-[#ff8533]"
                      : "border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  }
                >
                  Images
                </Button>
                <Button
                  variant={
                    filterType === "video"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setFilterType("video")}
                  className={
                    filterType === "video"
                      ? "bg-[#FF6A00] hover:bg-[#ff8533]"
                      : "border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  }
                >
                  Videos
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={
                  viewMode === "grid" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-[#FF6A00] hover:bg-[#ff8533]"
                    : "border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={
                  viewMode === "list" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-[#FF6A00] hover:bg-[#ff8533]"
                    : "border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardContent className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((file) => (
                <div
                  key={file.id}
                  className="group relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#FF6A00] transition-colors cursor-pointer"
                >
                  <div className="aspect-square relative">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    {file.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white hover:text-black"
                            onClick={() =>
                              setSelectedMedia(file)
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">
                              {selectedMedia?.name}
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                              View media file details, usage
                              information, and download options
                            </DialogDescription>
                          </DialogHeader>
                          {selectedMedia && (
                            <div className="space-y-4">
                              <div className="aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                  src={selectedMedia.url}
                                  alt={selectedMedia.name}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                                    File Details
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">
                                        Type:
                                      </span>
                                      <span className="text-white capitalize">
                                        {selectedMedia.type}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">
                                        Size:
                                      </span>
                                      <span className="text-white">
                                        {selectedMedia.size}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">
                                        Dimensions:
                                      </span>
                                      <span className="text-white">
                                        {
                                          selectedMedia.dimensions
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">
                                        Uploaded:
                                      </span>
                                      <span className="text-white">
                                        {
                                          selectedMedia.uploadDate
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                                    Used in Campaigns
                                  </h4>
                                  <div className="space-y-1">
                                    {selectedMedia.campaigns
                                      .length > 0 ? (
                                      selectedMedia.campaigns.map(
                                        (
                                          campaign: string,
                                          index: number,
                                        ) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="block"
                                          >
                                            {campaign}
                                          </Badge>
                                        ),
                                      )
                                    ) : (
                                      <p className="text-gray-400 text-sm">
                                        Not used in any
                                        campaigns
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t border-[#2a2a2a]">
                                <Button className="bg-[#FF6A00] hover:bg-[#ff8533]">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white hover:text-black"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-white font-medium truncate text-sm">
                      {file.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-xs">
                        {file.size}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {file.uploadDate}
                      </div>
                    </div>
                    {file.campaigns.length > 0 && (
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          Used in {file.campaigns.length}{" "}
                          campaign
                          {file.campaigns.length !== 1
                            ? "s"
                            : ""}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] hover:border-[#FF6A00] transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {file.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                      <span className="capitalize">
                        {file.type}
                      </span>
                      <span>{file.size}</span>
                      <span>{file.dimensions}</span>
                      <span>{file.uploadDate}</span>
                    </div>
                    {file.campaigns.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {file.campaigns.map(
                          (campaign, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {campaign}
                            </Badge>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileImage className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">
                  No media files found
                </p>
                <p className="text-sm">
                  Upload some files to get started
                </p>
              </div>
              <Button className="bg-[#FF6A00] hover:bg-[#ff8533] text-white mt-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First Media
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}