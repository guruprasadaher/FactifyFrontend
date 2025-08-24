import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus,
  AlertCircle,
  CheckCircle,
  PenTool
} from 'lucide-react';
import { mockBlogPosts, type BlogPost } from '../data/blogData';
import { useAuth } from '../contexts/AuthContext';

export default function CreateBlogPost() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEditing = id !== 'new' && id !== undefined;
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'community' as BlogPost['category'],
    tags: [] as string[],
    featured: false,
    coverImage: ''
  });
  
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/blog');
      return;
    }

    // Load existing post if editing
    if (isEditing && id) {
      const existingPost = mockBlogPosts.find(p => p.id === id);
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          content: existingPost.content,
          category: existingPost.category,
          tags: existingPost.tags,
          featured: existingPost.featured,
          coverImage: existingPost.coverImage || ''
        });
      } else {
        navigate('/blog');
      }
    }
  }, [id, isEditing, user, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 50) {
      newErrors.excerpt = 'Excerpt must be at least 50 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 200) {
      newErrors.content = 'Content must be at least 200 characters';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const postData: BlogPost = {
        id: isEditing ? id! : Date.now().toString(),
        ...formData,
        author: {
          name: user!.name,
          avatar: user!.avatar,
          role: user!.role
        },
        publishedAt: isEditing ? mockBlogPosts.find(p => p.id === id)?.publishedAt || new Date().toISOString() : new Date().toISOString(),
        readTime: Math.ceil(formData.content.length / 1000), // Rough estimate
        likes: isEditing ? mockBlogPosts.find(p => p.id === id)?.likes || 0 : 0,
        comments: isEditing ? mockBlogPosts.find(p => p.id === id)?.comments || [] : []
      };

      console.log(isEditing ? 'Updated post:' : 'Created post:', postData);
      
      // Navigate to the post
      navigate(`/blog/${postData.id}`);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      handleChange('tags', [...formData.tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      detection: 'bg-primary/10 text-primary',
      news: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      research: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      tutorial: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      community: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <PenTool className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        {previewMode ? (
          /* Preview Mode */
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className={getCategoryColor(formData.category)}>
                    {formData.category}
                  </Badge>
                  <h1 className="text-3xl font-bold">{formData.title || 'Untitled Post'}</h1>
                  <p className="text-xl text-muted-foreground">{formData.excerpt}</p>
                </div>
                
                {formData.coverImage && (
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: formData.content.replace(/\n/g, '<br/>') 
                  }} />
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="outline">#{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a compelling title..."
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Write a brief summary of your post..."
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    rows={3}
                    className={errors.excerpt ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.excerpt.length}/200 characters (minimum 50)
                  </p>
                  {errors.excerpt && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.excerpt}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detection">Detection</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      placeholder="https://example.com/image.jpg"
                      value={formData.coverImage}
                      onChange={(e) => handleChange('coverImage', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
                <CardDescription>
                  Write your blog post content. You can use Markdown formatting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your blog post content here... You can use basic formatting like **bold** and *italic*."
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  rows={15}
                  className={`resize-none ${errors.content ? 'border-destructive' : ''}`}
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{formData.content.length} characters (minimum 200)</span>
                  <span>Estimated read time: {Math.ceil(formData.content.length / 1000)} min</span>
                </div>
                {errors.content && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.content}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tags and Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Tags and Settings</CardTitle>
                <CardDescription>
                  Add tags to help readers find your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.tags}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleChange('featured', checked)}
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Mark as featured post (will appear prominently on blog homepage)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {Object.keys(errors).length > 0 && (
                  <span className="text-destructive">
                    Please fix {Object.keys(errors).length} error(s) before publishing
                  </span>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/blog')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      {isEditing ? 'Updating...' : 'Publishing...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditing ? 'Update Post' : 'Publish Post'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Success Message */}
        {isSaving && (
          <Card className="border-success">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span>{isEditing ? 'Post updated successfully!' : 'Post published successfully!'}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
