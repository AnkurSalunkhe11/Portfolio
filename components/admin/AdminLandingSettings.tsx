'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Globe, 
  Code, 
  Wrench, 
  Save, 
  RotateCcw,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioStore } from '@/lib/store';

export default function AdminLandingSettings() {
  const { toast } = useToast();
  const { domain: currentDomain, setDomain } = usePortfolioStore();
  
  const [defaultLanding, setDefaultLanding] = useState<'cs' | 'mechanical'>('cs');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const savedLanding = localStorage.getItem('default-landing-domain');
    if (savedLanding && (savedLanding === 'cs' || savedLanding === 'mechanical')) {
      setDefaultLanding(savedLanding);
    }
  }, []);

  const handleLandingChange = (checked: boolean) => {
    const newLanding = checked ? 'cs' : 'mechanical';
    setDefaultLanding(newLanding);
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage (in production, this would be saved to a database)
      localStorage.setItem('default-landing-domain', defaultLanding);
      
      toast({
        title: "Settings saved successfully",
        description: `Default landing page set to ${defaultLanding === 'cs' ? 'Computer Science' : 'Mechanical Engineering'}`,
      });
      
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    setDefaultLanding('cs');
    setHasChanges(true);
    toast({
      title: "Settings reset",
      description: "Default landing page reset to Computer Science",
    });
  };

  const handlePreviewLanding = () => {
    // Temporarily switch to the selected landing domain for preview
    setDomain(defaultLanding);
    window.open('/', '_blank');
    toast({
      title: "Preview opened",
      description: `Previewing ${defaultLanding === 'cs' ? 'Computer Science' : 'Mechanical Engineering'} landing page`,
    });
  };

  const handleApplyNow = () => {
    setDomain(defaultLanding);
    toast({
      title: "Landing page updated",
      description: `Portfolio now showing ${defaultLanding === 'cs' ? 'Computer Science' : 'Mechanical Engineering'} content`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Landing Settings</h2>
          <p className="text-slate-600">Configure the default landing page for your portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Unsaved changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleResetSettings}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            disabled={!hasChanges || isLoading}
            className="gradient-primary text-white"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Current Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">Active Domain</p>
              <p className="text-xs text-slate-600 capitalize">
                {currentDomain === 'cs' ? 'Computer Science' : 'Mechanical Engineering'}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">Default Landing</p>
              <p className="text-xs text-slate-600 capitalize">
                {defaultLanding === 'cs' ? 'Computer Science' : 'Mechanical Engineering'}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Info className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">Status</p>
              <p className="text-xs text-slate-600">
                {hasChanges ? 'Changes Pending' : 'Up to Date'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Landing Domain Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Default Landing Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Mechanical Engineering</h3>
                <p className="text-sm text-slate-600">
                  Engineering projects, patents, and technical expertise
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Label htmlFor="landing-switch" className="text-sm font-medium">
                Mechanical
              </Label>
              <Switch
                id="landing-switch"
                checked={defaultLanding === 'cs'}
                onCheckedChange={handleLandingChange}
                className="data-[state=checked]:bg-indigo-600"
              />
              <Label htmlFor="landing-switch" className="text-sm font-medium">
                CS
              </Label>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Computer Science</h3>
              <p className="text-sm text-slate-600">
                Software projects, coding skills, and development work
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <h4 className="font-medium mb-1">How it works:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• The default landing domain determines which portfolio version visitors see first</li>
                  <li>• Visitors can still switch between domains using the toggle in the header</li>
                  <li>• This setting affects new visitors and those without saved preferences</li>
                  <li>• Changes take effect immediately after saving</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Preview & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handlePreviewLanding}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>Preview Landing Page</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleApplyNow}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Apply to Current Session</span>
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Preview opens the landing page in a new tab. Apply changes the current session immediately.
          </p>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">Visitor Behavior</h4>
              <div className="text-sm text-slate-600 space-y-2">
                <p>• First-time visitors see the default landing domain</p>
                <p>• Returning visitors see their last selected domain</p>
                <p>• Domain preference is saved in browser storage</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">SEO Impact</h4>
              <div className="text-sm text-slate-600 space-y-2">
                <p>• Search engines will index the default landing content</p>
                <p>• Both domains remain accessible via header toggle</p>
                <p>• No impact on existing bookmarks or direct links</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}