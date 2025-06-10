'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Calendar,
  Building,
  Award,
  Search,
  Filter,
  MoreHorizontal,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { portfolioData } from '@/lib/portfolio-data';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
  category: string;
  status: 'active' | 'expired' | 'pending';
  logo?: string;
  description?: string;
}

const categories = ['technical', 'professional', 'cloud', 'academic', 'industry'] as const;

export default function AdminCertifications() {
  const { toast } = useToast();
  const [certifications, setCertifications] = useState<Certification[]>(() =>
    portfolioData.certifications.map((cert, index) => ({
      id: `cert-${index}`,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credentialId: cert.credentialId,
      link: cert.link,
      category: cert.name.toLowerCase().includes('aws') ? 'cloud' : 
               cert.name.toLowerCase().includes('engineer') ? 'professional' : 'technical',
      status: 'active' as const,
      description: `Professional certification in ${cert.name}`
    }))
  );

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
    link: '',
    category: '',
    description: ''
  });

  // Memoized filtered certifications for performance
  const filteredCertifications = useMemo(() => {
    return certifications.filter(cert => {
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || cert.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [certifications, searchTerm, filterCategory, filterStatus]);

  // Memoized stats for performance
  const stats = useMemo(() => ({
    total: certifications.length,
    active: certifications.filter(c => c.status === 'active').length,
    expiringSoon: 2, // Mock data
    categories: new Set(certifications.map(c => c.category)).size
  }), [certifications]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setCertifications(prev => prev.map(cert => 
        cert.id === isEditing 
          ? { ...cert, ...formData, id: cert.id }
          : cert
      ));
      toast({
        title: "Certification updated",
        description: "The certification has been updated successfully.",
      });
    } else {
      const newCert: Certification = {
        ...formData,
        id: `cert-${Date.now()}`,
        status: 'active'
      };
      setCertifications(prev => [...prev, newCert]);
      toast({
        title: "Certification added",
        description: "The new certification has been added successfully.",
      });
    }

    resetForm();
  }, [isEditing, formData, toast]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      link: '',
      category: '',
      description: ''
    });
    setIsEditing(null);
    setShowAddForm(false);
  }, []);

  const handleEdit = useCallback((cert: Certification) => {
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiryDate: cert.expiryDate || '',
      credentialId: cert.credentialId || '',
      link: cert.link || '',
      category: cert.category,
      description: cert.description || ''
    });
    setIsEditing(cert.id);
    setShowAddForm(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
    toast({
      title: "Certification deleted",
      description: "The certification has been removed.",
    });
  }, [toast]);

  const fetchLogo = useCallback(async (issuer: string) => {
    // Simulate logo fetching from Clearbit API
    const domain = issuer.toLowerCase().replace(/\s+/g, '') + '.com';
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    
    toast({
      title: "Logo fetched",
      description: `Logo retrieved for ${issuer}`,
    });
    
    return logoUrl;
  }, [toast]);

  const handleBulkImport = useCallback(() => {
    // Simulate CSV import
    toast({
      title: "Import started",
      description: "Processing certification data...",
    });
  }, [toast]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'cloud': return 'bg-orange-100 text-orange-800';
      case 'academic': return 'bg-emerald-100 text-emerald-800';
      case 'industry': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Certification Management</h2>
          <p className="text-slate-600">Manage your professional certifications and credentials</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleBulkImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Certifications</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-slate-900">{stats.expiringSoon}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Categories</p>
                <p className="text-2xl font-bold text-slate-900">{stats.categories}</p>
              </div>
              <Building className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Edit Certification' : 'Add New Certification'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Certification Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="issuer"
                      value={formData.issuer}
                      onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                      placeholder="e.g., Amazon Web Services"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fetchLogo(formData.issuer)}
                      disabled={!formData.issuer}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Issue Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    value={formData.credentialId}
                    onChange={(e) => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
                    placeholder="e.g., AWS-SAA-123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link">Verification Link</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the certification..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button type="submit">
                  {isEditing ? 'Update Certification' : 'Add Certification'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Certifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications ({filteredCertifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{cert.name}</h3>
                      <Badge className={`text-xs border ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </Badge>
                      <Badge className={`text-xs ${getCategoryColor(cert.category)}`}>
                        {cert.category}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued: {cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4" />
                          <span>ID: {cert.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {cert.description && (
                      <p className="text-slate-700 text-sm mb-3">{cert.description}</p>
                    )}

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cert)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(cert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCertifications.length === 0 && (
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No certifications found</h3>
                <p className="text-slate-600 mb-4">
                  {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Start by adding your first certification.'
                  }
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}