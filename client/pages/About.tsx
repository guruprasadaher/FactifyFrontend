import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Zap, 
  Users, 
  Award, 
  Lock, 
  Globe,
  Heart
} from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge variant="outline" className="px-4 py-2">
            🛡️ Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Protecting Truth in the Digital Age
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Factify is dedicated to combating misinformation and deepfakes through 
            cutting-edge AI technology, making the internet a safer place for everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-6 w-6 text-primary" />
              Why We Exist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-lg">
              In an era where synthetic media and misinformation can spread faster than truth, 
              we believe everyone deserves access to reliable content verification tools. 
              Our mission is to democratize deepfake and fake news detection technology, 
              empowering individuals, journalists, educators, and organizations to make 
              informed decisions about the content they consume and share.
            </p>
          </CardContent>
        </Card>

        {/* Key Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your uploaded content is processed securely and never stored permanently. 
                We prioritize user privacy in all our operations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI provides explainable results, showing you exactly why content 
                was flagged as authentic or potentially manipulated.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-warning mx-auto mb-4" />
              <CardTitle>Speed & Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get reliable results in seconds with our state-of-the-art AI models 
                that achieve 99.2% accuracy in controlled testing.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Statistics */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Our Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500K+</div>
                <div className="text-sm text-muted-foreground">Files Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-warning mb-2">15K+</div>
                <div className="text-sm text-muted-foreground">Fakes Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="h-6 w-6" />
              Our Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Factify employs advanced machine learning models trained on millions of 
              authentic and synthetic media samples. Our multi-layered detection system 
              analyzes various factors including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Facial expression patterns
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Temporal inconsistencies
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Compression artifacts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Metadata analysis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Cross-reference verification
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Source credibility assessment
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6" />
              Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              We're a diverse team of AI researchers, cybersecurity experts, and digital 
              rights advocates working together to create a more trustworthy digital world.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">AI</span>
                </div>
                <h4 className="font-semibold">AI Research Team</h4>
                <p className="text-sm text-muted-foreground">PhD researchers from top universities</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-accent">🔒</span>
                </div>
                <h4 className="font-semibold">Security Experts</h4>
                <p className="text-sm text-muted-foreground">Cybersecurity and privacy specialists</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-success/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-success">⚖️</span>
                </div>
                <h4 className="font-semibold">Ethics Board</h4>
                <p className="text-sm text-muted-foreground">Digital rights and ethics advisors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-2xl font-bold">Ready to Start Detecting?</h2>
          <p className="text-muted-foreground">
            Join the fight against misinformation today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/detect">
                <Shield className="mr-2 h-5 w-5" />
                Try Detection Tool
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
