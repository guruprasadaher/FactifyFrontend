import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Heart, 
  MessageCircle, 
  Search, 
  TrendingUp,
  Star,
  Users,
  BookOpen,
  PenTool
} from 'lucide-react';
import { mockBlogPosts, blogCategories, type BlogPost } from '../data/blogData';
import { useAuth } from '../contexts/AuthContext';

export default function Blog() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = mockBlogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Community Blog
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and stories from the fight against misinformation. 
            Join our community of researchers, journalists, and truth seekers.
          </p>
          {user?.role === 'admin' && (
            <Button asChild>
              <Link to="/blog/new">
                <PenTool className="mr-2 h-4 w-4" />
                Write New Post
              </Link>
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{mockBlogPosts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">1.3K</p>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">25K</p>
                  <p className="text-sm text-muted-foreground">Monthly Reads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Posts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments.length}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/blog/${post.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="space-y-6">
          {(selectedCategory !== 'all' || searchQuery !== '') && (
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Posts'}
            </h2>
          )}
          
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === 'all' && searchQuery === '' ? regularPosts : filteredPosts).map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-2 left-2 text-xs ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs">{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}m</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments.length}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/blog/${post.id}`}>Read</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-12">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Share your insights, learn from experts, and help build a more informed digital world. 
              Create an account to like posts, leave comments, and join the conversation.
            </p>
            {user ? (
              <p className="text-primary font-medium">
                Welcome back, {user.name}! Thanks for being part of our community.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/signup">Join the Community</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
