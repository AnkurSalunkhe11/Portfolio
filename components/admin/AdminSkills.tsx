'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical, 
  Star, 
  TrendingUp,
  Code,
  Wrench,
  Globe,
  Search,
  Filter,
  MoreHorizontal,
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { portfolioData } from '@/lib/portfolio-data';
import TechLogo from '@/components/TechLogo';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  trending: boolean;
  learning: boolean;
  endorsements: number;
  logo?: string;
  description?: string;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
  skills: Skill[];
}

export default function AdminSkills() {
  const { toast } = useToast();
  
  // Initialize skills from portfolio data
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    const csSkills = portfolioData.cs.skills;
    const mechanicalSkills = portfolioData.mechanical.skills;
    
    const allCategories = [...csSkills, ...mechanicalSkills];
    const uniqueCategories = allCategories.reduce((acc, category) => {
      const existing = acc.find(c => c.category === category.category);
      if (existing) {
        existing.items = [...new Set([...existing.items, ...category.items])];
      } else {
        acc.push(category);
      }
      return acc;
    }, [] as typeof csSkills);

    return uniqueCategories.map((category, categoryIndex) => ({
      id: `cat-${categoryIndex}`,
      name: category.category,
      icon: category.category.toLowerCase().includes('frontend') ? 'code' :
            category.category.toLowerCase().includes('backend') ? 'server' :
            category.category.toLowerCase().includes('design') ? 'wrench' : 'globe',
      order: categoryIndex,
      skills: category.items.map((skill, skillIndex) => ({
        id: `skill-${categoryIndex}-${skillIndex}`,
        name: skill,
        category: category.category,
        proficiency: Math.floor(Math.random() * 40) + 60, // Random proficiency 60-100
        trending: Math.random() > 0.7,
        learning: Math.random() > 0.8,
        endorsements: Math.floor(Math.random() * 50) + 5,
        order: skillIndex
      }))
    }));
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);

  const [skillFormData, setSkillFormData] = useState({
    name: '',
    category: '',
    proficiency: [75],
    trending: false,
    learning: false,
    description: ''
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    icon: 'code'
  });

  const allSkills = skillCategories.flatMap(cat => cat.skills);
  const filteredSkills = allSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: skillFormData.name,
      category: skillFormData.category,
      proficiency: skillFormData.proficiency[0],
      trending: skillFormData.trending,
      learning: skillFormData.learning,
      endorsements: 0,
      description: skillFormData.description,
      order: 0
    };

    setSkillCategories(prev => prev.map(cat => 
      cat.name === skillFormData.category 
        ? { ...cat, skills: [...cat.skills, newSkill] }
        : cat
    ));

    toast({
      title: "Skill added",
      description: `${skillFormData.name} has been added successfully.`,
    });

    resetSkillForm();
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      category: skill.category,
      proficiency: [skill.proficiency],
      trending: skill.trending,
      learning: skill.learning,
      description: skill.description || ''
    });
    setShowAddSkillForm(true);
  };

  const handleUpdateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingSkill) return;

    setSkillCategories(prev => prev.map(cat => ({
      ...cat,
      skills: cat.skills.map(skill => 
        skill.id === editingSkill.id 
          ? {
              ...skill,
              name: skillFormData.name,
              category: skillFormData.category,
              proficiency: skillFormData.proficiency[0],
              trending: skillFormData.trending,
              learning: skillFormData.learning,
              description: skillFormData.description
            }
          : skill
      )
    })));

    toast({
      title: "Skill updated",
      description: `${skillFormData.name} has been updated successfully.`,
    });

    resetSkillForm();
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkillCategories(prev => prev.map(cat => ({
      ...cat,
      skills: cat.skills.filter(skill => skill.id !== skillId)
    })));

    toast({
      title: "Skill deleted",
      description: "The skill has been removed.",
    });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: categoryFormData.name,
      icon: categoryFormData.icon,
      order: skillCategories.length,
      skills: []
    };

    setSkillCategories(prev => [...prev, newCategory]);

    toast({
      title: "Category added",
      description: `${categoryFormData.name} category has been created.`,
    });

    resetCategoryForm();
  };

  const resetSkillForm = () => {
    setSkillFormData({
      name: '',
      category: '',
      proficiency: [75],
      trending: false,
      learning: false,
      description: ''
    });
    setEditingSkill(null);
    setShowAddSkillForm(false);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      icon: 'code'
    });
    setShowAddCategoryForm(false);
  };

  const fetchTechLogo = async (skillName: string) => {
    // Simulate fetching logo from DevIcon or Simple Icons API
    toast({
      title: "Logo fetched",
      description: `Logo retrieved for ${skillName}`,
    });
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-emerald-600';
    if (proficiency >= 75) return 'text-blue-600';
    if (proficiency >= 60) return 'text-amber-600';
    return 'text-slate-600';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    return 'Beginner';
  };

  // Convert Set to Array for iteration
  const categoryNames = Array.from(new Set(skillCategories.map(cat => cat.name)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Skills Management</h2>
          <p className="text-slate-600">Manage your technical skills and proficiency levels</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowAddCategoryForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          <Button onClick={() => setShowAddSkillForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Skills</p>
                <p className="text-2xl font-bold text-slate-900">{allSkills.length}</p>
              </div>
              <Code className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Categories</p>
                <p className="text-2xl font-bold text-slate-900">{skillCategories.length}</p>
              </div>
              <Globe className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Trending</p>
                <p className="text-2xl font-bold text-slate-900">
                  {allSkills.filter(s => s.trending).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Learning</p>
                <p className="text-2xl font-bold text-slate-900">
                  {allSkills.filter(s => s.learning).length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-amber-600" />
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
                  placeholder="Search skills..."
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
                {categoryNames.map(categoryName => (
                  <SelectItem key={categoryName} value={categoryName}>
                    {categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Frontend Development"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryIcon">Icon</Label>
                  <Select 
                    value={categoryFormData.icon} 
                    onValueChange={(value) => setCategoryFormData(prev => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code">Code</SelectItem>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="wrench">Tools</SelectItem>
                      <SelectItem value="globe">Web</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button type="submit">Add Category</Button>
                <Button type="button" variant="outline" onClick={resetCategoryForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Skill Form */}
      {showAddSkillForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingSkill ? handleUpdateSkill : handleAddSkill} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="skillName">Skill Name *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="skillName"
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., React"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fetchTechLogo(skillFormData.name)}
                      disabled={!skillFormData.name}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillCategory">Category *</Label>
                  <Select 
                    value={skillFormData.category} 
                    onValueChange={(value) => setSkillFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Proficiency Level: {skillFormData.proficiency[0]}% ({getProficiencyLabel(skillFormData.proficiency[0])})</Label>
                <Slider
                  value={skillFormData.proficiency}
                  onValueChange={(value) => setSkillFormData(prev => ({ ...prev, proficiency: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={skillFormData.trending}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, trending: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Trending skill</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={skillFormData.learning}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, learning: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Currently learning</span>
                </label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillDescription">Description</Label>
                <Input
                  id="skillDescription"
                  value={skillFormData.description}
                  onChange={(e) => setSkillFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description or use case..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button type="submit">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </Button>
                <Button type="button" variant="outline" onClick={resetSkillForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {category.icon === 'code' && <Code className="w-5 h-5" />}
                  {category.icon === 'wrench' && <Wrench className="w-5 h-5" />}
                  {category.icon === 'globe' && <Globe className="w-5 h-5" />}
                  <span>{category.name}</span>
                  <Badge variant="outline">{category.skills.length}</Badge>
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills
                  .filter(skill => 
                    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <TechLogo technology={skill.name} size="md" />
                        <div>
                          <h4 className="font-medium text-slate-900">{skill.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                              {getProficiencyLabel(skill.proficiency)}
                            </span>
                            <span className="text-xs text-slate-500">({skill.proficiency}%)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSkill(skill)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSkill(skill.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          skill.proficiency >= 90 ? 'bg-emerald-500' :
                          skill.proficiency >= 75 ? 'bg-blue-500' :
                          skill.proficiency >= 60 ? 'bg-amber-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        {skill.trending && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {skill.learning && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            <BookOpen className="w-3 h-3 mr-1" />
                            Learning
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Star className="w-3 h-3" />
                        <span>{skill.endorsements}</span>
                      </div>
                    </div>

                    {skill.description && (
                      <p className="text-xs text-slate-600 mt-2">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {category.skills.length === 0 && (
                <div className="text-center py-8">
                  <Code className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">No skills in this category yet.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setSkillFormData(prev => ({ ...prev, category: category.name }));
                      setShowAddSkillForm(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Skill
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {skillCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No skill categories</h3>
            <p className="text-slate-600 mb-4">Create your first skill category to get started.</p>
            <Button onClick={() => setShowAddCategoryForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}