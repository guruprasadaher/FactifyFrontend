import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowLeft,
  Calendar,
  User,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { mockBlogPosts, type BlogPost, type Comment } from '../data/blogData';
import { useAuth } from '../contexts/AuthContext';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (id) {
      const foundPost = mockBlogPosts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        setLikes(foundPost.likes);
        // Check if user has liked this post (simulate with localStorage)
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        setIsLiked(likedPosts.includes(id));
      } else {
        navigate('/blog');
      }
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
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

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      const updatedLikes = likedPosts.filter((postId: string) => postId !== id);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      const updatedLikes = [...likedPosts, id];
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.avatar
      },
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0
    };

    // In a real app, this would be an API call
    console.log('New comment:', comment);
    setNewComment('');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyText.trim() || !user) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.avatar
      },
      content: replyText,
      publishedAt: new Date().toISOString(),
      likes: 0
    };

    // In a real app, this would be an API call
    console.log('New reply to', commentId, ':', reply);
    setReplyText('');
    setReplyingTo(null);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`space-y-3 ${isReply ? 'ml-8 pl-4 border-l-2 border-muted' : ''}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{comment.author.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatTime(comment.publishedAt)}
            </span>
          </div>
          <p className="text-sm text-foreground">{comment.content}</p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <ThumbsUp className="h-3 w-3" />
              <span>{comment.likes}</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Reply className="h-3 w-3" />
                <span>Reply</span>
              </button>
            )}
          </div>
          
          {replyingTo === comment.id && user && (
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={3}
              />
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleReplySubmit(comment.id)}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          {user?.role === 'admin' && (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/blog/${post.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge className={getCategoryColor(post.category)}>
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Author and Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg">{post.author.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}
        </div>

        {/* Article Actions */}
        <div className="flex items-center justify-between border-y py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                  : 'hover:bg-muted'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length} comments</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none pt-6">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br/>').replace(/#{1,6}\s/g, match => {
                  const level = match.trim().length - 1;
                  return `<h${level} class="text-${4-level}xl font-bold mt-8 mb-4">`;
                }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} 
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Comments ({post.comments.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Comment Form */}
            {user ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Sign in to join the conversation
                </p>
                <div className="flex justify-center space-x-4">
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}

            {post.comments.length > 0 && (
              <>
                <Separator />
                <div className="space-y-6">
                  {post.comments.map(comment => renderComment(comment))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Related Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Related Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockBlogPosts
                .filter(p => p.id !== post.id && (
                  p.category === post.category || 
                  p.tags.some(tag => post.tags.includes(tag))
                ))
                .slice(0, 2)
                .map(relatedPost => (
                  <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <Badge className={`${getCategoryColor(relatedPost.category)} text-xs`}>
                          {relatedPost.category}
                        </Badge>
                        <h4 className="font-medium line-clamp-2">
                          <Link 
                            to={`/blog/${relatedPost.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{relatedPost.author.name}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
