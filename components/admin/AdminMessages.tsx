'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Archive, 
  Trash2, 
  Reply, 
  Star,
  Clock,
  User,
  Mail,
  Phone,
  Download,
  MoreHorizontal,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  source: 'contact_form' | 'email' | 'linkedin';
}

export default function AdminMessages() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const [messages] = useState<Message[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      subject: 'Collaboration Opportunity',
      message: 'Hi Alex, I came across your portfolio and I\'m impressed with your work. We have an exciting opportunity at TechCorp that might interest you. Would you be available for a brief call this week?',
      timestamp: '2 hours ago',
      status: 'unread',
      priority: 'high',
      source: 'contact_form'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@startup.io',
      subject: 'Frontend Developer Position',
      message: 'Hello Alex, we\'re looking for a talented frontend developer to join our team. Your React and TypeScript skills would be a perfect fit for our project.',
      timestamp: '5 hours ago',
      status: 'read',
      priority: 'medium',
      source: 'linkedin'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@designstudio.com',
      subject: 'Project Inquiry',
      message: 'Hi there! I love your portfolio design. We\'re working on a similar project and would like to discuss potential collaboration.',
      timestamp: '1 day ago',
      status: 'replied',
      priority: 'medium',
      source: 'contact_form'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@engineering.co',
      message: 'Interested in your mechanical engineering background. Would you be open to consulting on a thermal management project?',
      timestamp: '2 days ago',
      status: 'archived',
      priority: 'low',
      source: 'email'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(m => m.id));
    }
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `${action} applied`,
      description: `${selectedMessages.length} messages ${action.toLowerCase()}`,
    });
    setSelectedMessages([]);
  };

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
    setReplyContent('');
  };

  const sendReply = () => {
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    });
    setReplyingTo(null);
    setReplyContent('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'replied': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'archived': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-slate-600';
      default: return 'text-slate-600';
    }
  };

  const messageStats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    replied: messages.filter(m => m.status === 'replied').length,
    archived: messages.filter(m => m.status === 'archived').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Message Management</h2>
          <p className="text-slate-600">Manage contact form submissions and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Archive All Read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Messages</p>
                <p className="text-2xl font-bold text-slate-900">{messageStats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Unread</p>
                <p className="text-2xl font-bold text-slate-900">{messageStats.unread}</p>
              </div>
              <Circle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Replied</p>
                <p className="text-2xl font-bold text-slate-900">{messageStats.replied}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Archived</p>
                <p className="text-2xl font-bold text-slate-900">{messageStats.archived}</p>
              </div>
              <Archive className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filterStatus === 'replied' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('replied')}
              >
                Replied
              </Button>
              <Button
                variant={filterStatus === 'archived' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('archived')}
              >
                Archived
              </Button>
            </div>
          </div>

          {selectedMessages.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedMessages.length} message(s) selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('Mark as Read')}>
                    Mark as Read
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('Archive')}>
                    Archive
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('Delete')}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Messages ({filteredMessages.length})</CardTitle>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedMessages.length === filteredMessages.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                  message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
                } ${selectedMessages.includes(message.id) ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => handleSelectMessage(message.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{message.name}</h3>
                          <Badge className={`text-xs border ${getStatusColor(message.status)}`}>
                            {message.status}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{message.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{message.timestamp}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {message.source.replace('_', ' ')}
                          </Badge>
                        </div>
                        {message.subject && (
                          <p className="font-medium text-slate-900 mb-2">{message.subject}</p>
                        )}
                        <p className="text-slate-700 leading-relaxed">{message.message}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReply(message.id)}
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {replyingTo === message.id && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-3">Reply to {message.name}</h4>
                        <Textarea
                          placeholder="Type your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={4}
                          className="mb-3"
                        />
                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={sendReply}>
                            Send Reply
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No messages found</h3>
                <p className="text-slate-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No messages have been received yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}