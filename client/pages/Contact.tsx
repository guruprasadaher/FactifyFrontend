import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <MessageCircle className="mr-2 h-4 w-4" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Contact Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our detection technology? Need support? We're here to help you fight misinformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">General Inquiries</p>
                  <p className="text-sm text-muted-foreground">contact@factify.ai</p>
                </div>
                <div>
                  <p className="font-medium">Technical Support</p>
                  <p className="text-sm text-muted-foreground">support@factify.ai</p>
                </div>
                <div>
                  <p className="font-medium">Business & Partnerships</p>
                  <p className="text-sm text-muted-foreground">business@factify.ai</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">General Inquiries</span>
                  <span className="text-sm text-muted-foreground">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Technical Support</span>
                  <span className="text-sm text-muted-foreground">4-8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Business Inquiries</span>
                  <span className="text-sm text-muted-foreground">1-2 business days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Office Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">San Francisco, CA</p>
                  <p className="text-sm text-muted-foreground">123 AI Street, Suite 100</p>
                </div>
                <div>
                  <p className="font-medium">London, UK</p>
                  <p className="text-sm text-muted-foreground">45 Tech Avenue, Floor 5</p>
                </div>
                <div>
                  <p className="font-medium">Singapore</p>
                  <p className="text-sm text-muted-foreground">78 Innovation Hub, Level 12</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      * Required fields. We'll never share your information with third parties.
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Help Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Check our FAQs</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Find answers to common questions about deepfake and fake news detection.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/faqs">View FAQs</a>
                </Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Try the Detection Tool</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Test our AI detection capabilities with your own content right now.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/detect">Start Detecting</a>
                </Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Learn More</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Discover our mission and the technology behind our detection system.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/about">About Us</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
