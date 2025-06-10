'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Save, 
  RotateCcw, 
  Eye, 
  Code, 
  Wrench,
  User,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Link,
  Plus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { portfolioData } from '@/lib/portfolio-data';

export default function AdminContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState(portfolioData.personal);

  // Domain-specific content
  const [csContent, setCsContent] = useState({
    tagline: portfolioData.cs.tagline,
    about: portfolioData.cs.about
  });

  const [mechanicalContent, setMechanicalContent] = useState({
    tagline: portfolioData.mechanical.tagline,
    about: portfolioData.mechanical.about
  });

  // Projects
  const [csProjects, setCsProjects] = useState(portfolioData.cs.projects);
  const [mechanicalProjects, setMechanicalProjects] = useState(portfolioData.mechanical.projects);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleCsContentChange = (field: string, value: string) => {
    setCsContent(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleMechanicalContentChange = (field: string, value: string) => {
    setMechanicalContent(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    toast({
      title: "Changes saved",
      description: "Your content has been updated successfully.",
    });
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    setPersonalInfo(portfolioData.personal);
    setCsContent({
      tagline: portfolioData.cs.tagline,
      about: portfolioData.cs.about
    });
    setMechanicalContent({
      tagline: portfolioData.mechanical.tagline,
      about: portfolioData.mechanical.about
    });
    setCsProjects(portfolioData.cs.projects);
    setMechanicalProjects(portfolioData.mechanical.projects);
    setHasChanges(false);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted.",
    });
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Content Management</h2>
          <p className="text-slate-600">Edit your portfolio content and information</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Unsaved changes
            </Badge>
          )}
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleResetChanges} disabled={!hasChanges}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveChanges} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="cs-content" className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>CS Content</span>
          </TabsTrigger>
          <TabsTrigger value="mechanical-content" className="flex items-center space-x-2">
            <Wrench className="w-4 h-4" />
            <span>Mechanical</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>Projects</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>SEO</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={personalInfo.title}
                    onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={personalInfo.github}
                      onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={personalInfo.twitter}
                      onChange={(e) => handlePersonalInfoChange('twitter', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={personalInfo.website}
                      onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cs-content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Computer Science Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cs-tagline">Tagline</Label>
                <Input
                  id="cs-tagline"
                  value={csContent.tagline}
                  onChange={(e) => handleCsContentChange('tagline', e.target.value)}
                  placeholder="Your CS tagline..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cs-about">About Section</Label>
                <Textarea
                  id="cs-about"
                  value={csContent.about}
                  onChange={(e) => handleCsContentChange('about', e.target.value)}
                  rows={6}
                  placeholder="Tell your CS story..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mechanical-content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mechanical Engineering Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mech-tagline">Tagline</Label>
                <Input
                  id="mech-tagline"
                  value={mechanicalContent.tagline}
                  onChange={(e) => handleMechanicalContentChange('tagline', e.target.value)}
                  placeholder="Your mechanical engineering tagline..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mech-about">About Section</Label>
                <Textarea
                  id="mech-about"
                  value={mechanicalContent.about}
                  onChange={(e) => handleMechanicalContentChange('about', e.target.value)}
                  rows={6}
                  placeholder="Tell your mechanical engineering story..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Tabs defaultValue="cs-projects">
            <TabsList>
              <TabsTrigger value="cs-projects">CS Projects</TabsTrigger>
              <TabsTrigger value="mechanical-projects">Mechanical Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="cs-projects" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Computer Science Projects</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              <div className="space-y-4">
                {csProjects.map((project, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="space-y-2">
                            <Label>Project Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const updated = [...csProjects];
                                updated[index] = { ...project, title: e.target.value };
                                setCsProjects(updated);
                                setHasChanges(true);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const updated = [...csProjects];
                                updated[index] = { ...project, description: e.target.value };
                                setCsProjects(updated);
                                setHasChanges(true);
                              }}
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Demo URL</Label>
                              <Input
                                value={project.demo}
                                onChange={(e) => {
                                  const updated = [...csProjects];
                                  updated[index] = { ...project, demo: e.target.value };
                                  setCsProjects(updated);
                                  setHasChanges(true);
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>GitHub URL</Label>
                              <Input
                                value={project.github}
                                onChange={(e) => {
                                  const updated = [...csProjects];
                                  updated[index] = { ...project, github: e.target.value };
                                  setCsProjects(updated);
                                  setHasChanges(true);
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Technologies (comma-separated)</Label>
                            <Input
                              value={project.technologies.join(', ')}
                              onChange={(e) => {
                                const updated = [...csProjects];
                                updated[index] = { 
                                  ...project, 
                                  technologies: e.target.value.split(',').map(t => t.trim()) 
                                };
                                setCsProjects(updated);
                                setHasChanges(true);
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = csProjects.filter((_, i) => i !== index);
                            setCsProjects(updated);
                            setHasChanges(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mechanical-projects" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Mechanical Engineering Projects</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              <div className="space-y-4">
                {mechanicalProjects.map((project, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="space-y-2">
                            <Label>Project Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const updated = [...mechanicalProjects];
                                updated[index] = { ...project, title: e.target.value };
                                setMechanicalProjects(updated);
                                setHasChanges(true);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const updated = [...mechanicalProjects];
                                updated[index] = { ...project, description: e.target.value };
                                setMechanicalProjects(updated);
                                setHasChanges(true);
                              }}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Technologies (comma-separated)</Label>
                            <Input
                              value={project.technologies.join(', ')}
                              onChange={(e) => {
                                const updated = [...mechanicalProjects];
                                updated[index] = { 
                                  ...project, 
                                  technologies: e.target.value.split(',').map(t => t.trim()) 
                                };
                                setMechanicalProjects(updated);
                                setHasChanges(true);
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = mechanicalProjects.filter((_, i) => i !== index);
                            setMechanicalProjects(updated);
                            setHasChanges(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  placeholder="Alex Thompson - Software Engineer & Mechanical Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Professional portfolio showcasing software development and mechanical engineering expertise"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="software engineer, mechanical engineer, full stack developer, portfolio"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">Open Graph Image URL</Label>
                <Input
                  id="og-image"
                  placeholder="https://example.com/og-image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}