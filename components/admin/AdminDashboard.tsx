'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Globe, 
  Activity,
  Clock,
  Eye,
  Download,
  ArrowUp,
  ArrowDown,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface DashboardStats {
  totalVisitors: number;
  totalMessages: number;
  conversionRate: number;
  avgSessionTime: string;
  topPages: Array<{ page: string; views: number; change: number }>;
  recentActivity: Array<{ action: string; time: string; type: 'info' | 'success' | 'warning' }>;
  deviceStats: { desktop: number; mobile: number; tablet: number };
  domainPerformance: { cs: number; mechanical: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 1247,
    totalMessages: 23,
    conversionRate: 3.2,
    avgSessionTime: '2m 34s',
    topPages: [
      { page: '/projects', views: 456, change: 12 },
      { page: '/about', views: 234, change: -5 },
      { page: '/skills', views: 189, change: 8 },
      { page: '/contact', views: 167, change: 15 }
    ],
    recentActivity: [
      { action: 'New contact form submission', time: '2 minutes ago', type: 'info' },
      { action: 'Portfolio domain switched to CS', time: '15 minutes ago', type: 'success' },
      { action: 'High traffic detected', time: '1 hour ago', type: 'warning' },
      { action: 'Resume downloaded (CS version)', time: '2 hours ago', type: 'info' },
      { action: 'New visitor from LinkedIn', time: '3 hours ago', type: 'success' }
    ],
    deviceStats: { desktop: 65, mobile: 28, tablet: 7 },
    domainPerformance: { cs: 68, mechanical: 32 }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-slate-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-professional-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Visitors</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalVisitors.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 ml-1">+12% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-professional-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Messages</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalMessages}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 ml-1">+5 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-professional-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</p>
                <div className="flex items-center mt-1">
                  <ArrowDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 ml-1">-0.3% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-professional-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Session</p>
                <p className="text-2xl font-bold text-slate-900">{stats.avgSessionTime}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 ml-1">+15s from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Top Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{page.page}</p>
                      <p className="text-sm text-slate-600">{page.views} views</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {page.change > 0 ? (
                      <ArrowUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${page.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {Math.abs(page.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">Desktop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${stats.deviceStats.desktop}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.deviceStats.desktop}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">Mobile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${stats.deviceStats.mobile}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.deviceStats.mobile}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tablet className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">Tablet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${stats.deviceStats.tablet}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.deviceStats.tablet}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domain Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Domain Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="font-medium">Computer Science</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${stats.domainPerformance.cs}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.domainPerformance.cs}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">Mechanical Engineering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${stats.domainPerformance.mechanical}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.domainPerformance.mechanical}%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                CS domain is currently more popular with visitors, showing higher engagement rates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Analytics</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>View Messages</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Update Content</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}