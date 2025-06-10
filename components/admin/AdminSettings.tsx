'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Bell, 
  Database, 
  Download, 
  Upload, 
  Key, 
  Monitor,
  Smartphone,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon,
  User,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      newMessages: true,
      weeklyReports: false,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginNotifications: true,
      ipWhitelist: ''
    },
    performance: {
      cacheEnabled: true,
      imageOptimization: true,
      lazyLoading: true,
      compressionEnabled: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30
    }
  });

  const [systemHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    lastBackup: '2 hours ago',
    storageUsed: 45,
    bandwidth: 78
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import started",
      description: "Processing your data import...",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup initiated",
      description: "Creating a backup of your portfolio data...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-600">Manage your portfolio system settings and preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <SettingsIcon className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">System Status</p>
              <p className="text-xs text-slate-600 capitalize">{systemHealth.status}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{systemHealth.uptime}</p>
              <p className="text-sm text-slate-600">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{systemHealth.storageUsed}%</p>
              <p className="text-sm text-slate-600">Storage Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{systemHealth.bandwidth}%</p>
              <p className="text-sm text-slate-600">Bandwidth</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-900">Last Backup</p>
              <p className="text-xs text-slate-600">{systemHealth.lastBackup}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Email Notifications</h4>
                  <p className="text-sm text-slate-600">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    handleSettingChange('notifications', 'emailNotifications', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">New Messages</h4>
                  <p className="text-sm text-slate-600">Get notified when you receive new contact messages</p>
                </div>
                <Switch
                  checked={settings.notifications.newMessages}
                  onCheckedChange={(checked) => 
                    handleSettingChange('notifications', 'newMessages', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Weekly Reports</h4>
                  <p className="text-sm text-slate-600">Receive weekly analytics reports</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    handleSettingChange('notifications', 'weeklyReports', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Security Alerts</h4>
                  <p className="text-sm text-slate-600">Get notified about security events</p>
                </div>
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => 
                    handleSettingChange('notifications', 'securityAlerts', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      handleSettingChange('security', 'twoFactorAuth', checked)
                    }
                  />
                  {settings.security.twoFactorAuth && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      Enabled
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => 
                    handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))
                  }
                  className="w-32"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Login Notifications</h4>
                  <p className="text-sm text-slate-600">Get notified when someone logs into your account</p>
                </div>
                <Switch
                  checked={settings.security.loginNotifications}
                  onCheckedChange={(checked) => 
                    handleSettingChange('security', 'loginNotifications', checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ip-whitelist">IP Whitelist (comma-separated)</Label>
                <Input
                  id="ip-whitelist"
                  value={settings.security.ipWhitelist}
                  onChange={(e) => 
                    handleSettingChange('security', 'ipWhitelist', e.target.value)
                  }
                  placeholder="192.168.1.1, 10.0.0.1"
                />
                <p className="text-xs text-slate-500">Leave empty to allow access from any IP</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Security Recommendations</h4>
                    <ul className="text-sm text-amber-800 mt-1 space-y-1">
                      <li>• Enable two-factor authentication for better security</li>
                      <li>• Use a strong, unique password</li>
                      <li>• Regularly review login activity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Performance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Cache Enabled</h4>
                  <p className="text-sm text-slate-600">Enable caching to improve site performance</p>
                </div>
                <Switch
                  checked={settings.performance.cacheEnabled}
                  onCheckedChange={(checked) => 
                    handleSettingChange('performance', 'cacheEnabled', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Image Optimization</h4>
                  <p className="text-sm text-slate-600">Automatically optimize images for faster loading</p>
                </div>
                <Switch
                  checked={settings.performance.imageOptimization}
                  onCheckedChange={(checked) => 
                    handleSettingChange('performance', 'imageOptimization', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Lazy Loading</h4>
                  <p className="text-sm text-slate-600">Load images only when they're needed</p>
                </div>
                <Switch
                  checked={settings.performance.lazyLoading}
                  onCheckedChange={(checked) => 
                    handleSettingChange('performance', 'lazyLoading', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Compression</h4>
                  <p className="text-sm text-slate-600">Enable GZIP compression for faster transfers</p>
                </div>
                <Switch
                  checked={settings.performance.compressionEnabled}
                  onCheckedChange={(checked) => 
                    handleSettingChange('performance', 'compressionEnabled', checked)
                  }
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-800">Page Load Time</p>
                    <p className="font-medium text-blue-900">1.2s</p>
                  </div>
                  <div>
                    <p className="text-blue-800">Core Web Vitals</p>
                    <p className="font-medium text-blue-900">Good</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Backup & Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Automatic Backups</h4>
                  <p className="text-sm text-slate-600">Automatically backup your portfolio data</p>
                </div>
                <Switch
                  checked={settings.backup.autoBackup}
                  onCheckedChange={(checked) => 
                    handleSettingChange('backup', 'autoBackup', checked)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={settings.backup.backupFrequency}
                    onChange={(e) => 
                      handleSettingChange('backup', 'backupFrequency', e.target.value)
                    }
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Retention Period (days)</Label>
                  <Input
                    type="number"
                    value={settings.backup.retentionDays}
                    onChange={(e) => 
                      handleSettingChange('backup', 'retentionDays', parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleBackupNow} className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Backup Now</span>
                </Button>
                <Button variant="outline" onClick={handleExportData} className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </Button>
                <Button variant="outline" onClick={handleImportData} className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Import Data</span>
                </Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-2">Recent Backups</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Full backup</span>
                    <span className="text-slate-600">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incremental backup</span>
                    <span className="text-slate-600">1 day ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full backup</span>
                    <span className="text-slate-600">1 week ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Admin Name</Label>
                  <Input
                    id="admin-name"
                    defaultValue="Alex Thompson"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    defaultValue="alex.thompson@email.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
                <p className="text-sm text-red-800 mb-4">
                  These actions are irreversible. Please be careful.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Reset All Settings
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}