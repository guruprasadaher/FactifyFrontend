import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Upload, 
  Zap, 
  CheckCircle, 
  Eye, 
  FileText, 
  Brain, 
  Clock,
  Star,
  Quote
} from 'lucide-react';

export default function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            🚀 AI-Powered Detection Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
            Detect Deepfakes &{' '}
            <span className="text-primary">Fake News</span>{' '}
            in Seconds
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Protect yourself from misinformation with our advanced AI detection system. 
            Upload content and get instant, reliable verification results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/detect">
                <Shield className="mr-2 h-5 w-5" />
                Start Scanning Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>99.2% Accuracy Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-warning" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Privacy Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our three-step process makes content verification simple and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Upload Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload images, videos, or paste news article links. We support all major formats.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our advanced AI models analyze patterns, inconsistencies, and authenticity markers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-xl">3. Get Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive detailed results with confidence scores and explanations in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Detection Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to identify various forms of misinformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Deepfake Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced facial analysis to detect artificially generated or manipulated faces in images and videos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <FileText className="h-10 w-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Fake News Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cross-reference articles with reliable sources and detect misleading or fabricated news content.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <Brain className="h-10 w-10 text-success mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Explainable AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understand the reasoning behind each detection with detailed explanations and evidence.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <Clock className="h-10 w-10 text-warning mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Real-Time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get instant analysis results with confidence scores and detailed breakdowns in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Factify is making a difference across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">SJ</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Sarah Johnson</CardTitle>
                    <CardDescription>Investigative Journalist</CardDescription>
                  </div>
                </div>
                <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Factify has revolutionized my fact-checking workflow. The accuracy and speed 
                  are incredible, helping me verify sources in real-time."
                </p>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent">MC</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Dr. Maria Chen</CardTitle>
                    <CardDescription>Digital Literacy Educator</CardDescription>
                  </div>
                </div>
                <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "An essential tool for teaching students about media literacy. The explanatory 
                  features make it perfect for educational purposes."
                </p>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-success">AT</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Alex Thompson</CardTitle>
                    <CardDescription>Social Media Manager</CardDescription>
                  </div>
                </div>
                <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Before sharing any content, I run it through Factify. It's saved me from 
                  spreading misinformation multiple times."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Fight Misinformation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users protecting themselves and others from fake content. 
            Start detecting deepfakes and fake news today.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link to="/detect">
              <Shield className="mr-2 h-5 w-5" />
              Start Free Detection
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
