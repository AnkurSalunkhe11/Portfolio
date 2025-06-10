'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock,
  MousePointer,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

// Mock data - in production this would come from your analytics API
const mockTrafficSources = [
  { source: 'Direct', visitors: 456, percentage: 38, change: '+12%' },
  { source: 'LinkedIn', visitors: 234, percentage: 19, change: '+8%' },
  { source: 'GitHub', visitors: 189, percentage: 16, change: '+15%' },
  { source: 'Google', visitors: 167, percentage: 14, change: '-3%' },
  { source: 'Twitter', visitors: 89, percentage: 7, change: '+5%' },
  { source: 'Other', visitors: 65, percentage: 6, change: '+2%' }
];

const mockUserBehavior = [
  { metric: 'Avg. Session Duration', value: '2m 34s', change: '+15%', trend: 'up' },
  { metric: 'Bounce Rate', value: '34.2%', change: '-8%', trend: 'down' },
  { metric: 'Pages per Session', value: '3.7', change: '+12%', trend: 'up' },
  { metric: 'Return Visitors', value: '28%', change: '+5%', trend: 'up' }
];

const mockConversionMetrics = [
  { metric: 'Contact Form Submissions', value: '23', rate: '1.9%', change: '+15%' },
  { metric: 'Resume Downloads', value: '89', rate: '7.1%', change: '+8%' },
  { metric: 'Project Demo Clicks', value: '156', rate: '12.5%', change: '+22%' },
  { metric: 'Social Media Clicks', value: '67', rate: '5.4%', change: '+3%' }
];

const mockScrollDepthData = [
  { depth: '25%', users: 892, percentage: 89 },
  { depth: '50%', users: 734, percentage: 73 },
  { depth: '75%', users: 456, percentage: 46 },
  { depth: '100%', users: 234, percentage: 23 }
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  const handleExport = useCallback(() => {
    // Simulate export functionality
    console.log('Exporting analytics data...');
  }, []);

  // Memoized data processing for performance
  const processedData = useMemo(() => ({
    trafficSources: mockTrafficSources,
    userBehavior: mockUserBehavior,
    conversionMetrics: mockConversionMetrics,
    scrollDepthData: mockScrollDepthData
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
          <p className="text-slate-600">Detailed insights into your portfolio performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {['24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Traffic Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processedData.trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{source.source}</p>
                          <p className="text-sm text-slate-600">{source.visitors} visitors</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">{source.percentage}%</p>
                        <Badge 
                          variant={source.change.startsWith('+') ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {source.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: 'United States', visitors: 456, percentage: 38 },
                    { country: 'Canada', visitors: 234, percentage: 19 },
                    { country: 'United Kingdom', visitors: 189, percentage: 16 },
                    { country: 'Germany', visitors: 167, percentage: 14 },
                    { country: 'India', visitors: 89, percentage: 7 },
                    { country: 'Other', visitors: 65, percentage: 6 }
                  ].map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{country.country}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 w-12 text-right">
                          {country.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processedData.userBehavior.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.metric}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                      <Badge 
                        variant={metric.trend === 'up' ? 'default' : 'secondary'}
                        className="text-xs mt-1"
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-slate-600 border-b pb-2">
                  <div>Page</div>
                  <div>Views</div>
                  <div>Avg Time</div>
                  <div>Bounce Rate</div>
                </div>
                {[
                  { page: '/projects', views: 456, avgTime: '3m 12s', bounceRate: '28%' },
                  { page: '/about', views: 234, avgTime: '2m 45s', bounceRate: '32%' },
                  { page: '/skills', views: 189, avgTime: '1m 58s', bounceRate: '45%' },
                  { page: '/contact', views: 167, avgTime: '1m 23s', bounceRate: '52%' }
                ].map((page) => (
                  <div key={page.page} className="grid grid-cols-4 gap-4 py-3 border-b border-slate-200 last:border-0">
                    <div className="font-medium text-slate-900">{page.page}</div>
                    <div className="text-slate-600">{page.views} views</div>
                    <div className="text-slate-600">{page.avgTime}</div>
                    <div className="text-slate-600">{page.bounceRate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processedData.conversionMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.metric}</p>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                        <p className="text-sm text-slate-600">({metric.rate})</p>
                      </div>
                      <Badge variant="default" className="text-xs mt-1">
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <MousePointer className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: 'Page Views', count: 1247, percentage: 100 },
                  { stage: 'Engaged Users', count: 823, percentage: 66 },
                  { stage: 'Project Interactions', count: 456, percentage: 37 },
                  { stage: 'Contact Actions', count: 89, percentage: 7 },
                  { stage: 'Form Submissions', count: 23, percentage: 2 }
                ].map((stage, index) => (
                  <div key={stage.stage} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900">{stage.stage}</span>
                        <span className="text-sm text-slate-600">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scroll Depth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processedData.scrollDepthData.map((data) => (
                    <div key={data.depth} className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{data.depth} of page</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 w-16 text-right">
                          {data.users} users
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time on Page Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: '0-30s', users: 234, percentage: 23 },
                    { range: '30s-1m', users: 345, percentage: 35 },
                    { range: '1-3m', users: 289, percentage: 29 },
                    { range: '3-5m', users: 89, percentage: 9 },
                    { range: '5m+', users: 43, percentage: 4 }
                  ].map((range) => (
                    <div key={range.range} className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{range.range}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${range.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 w-16 text-right">
                          {range.users} users
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interaction Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { element: 'Project Cards', clicks: 456, engagement: 'High' },
                  { element: 'Contact Button', clicks: 234, engagement: 'Medium' },
                  { element: 'Resume Download', clicks: 189, engagement: 'Medium' },
                  { element: 'Social Links', clicks: 167, engagement: 'Medium' },
                  { element: 'Skills Section', clicks: 89, engagement: 'Low' },
                  { element: 'Navigation Menu', clicks: 67, engagement: 'Low' }
                ].map((element) => (
                  <div key={element.element} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">{element.element}</span>
                      <Badge 
                        variant={
                          element.engagement === 'High' ? 'default' :
                          element.engagement === 'Medium' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {element.engagement}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{element.clicks}</p>
                    <p className="text-sm text-slate-600">clicks</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}