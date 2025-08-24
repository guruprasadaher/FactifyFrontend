import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  FileImage, 
  FileVideo, 
  FileText, 
  Link as LinkIcon,
  AlertCircle,
  CheckCircle,
  XCircle,
  Brain,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

interface AnalysisResult {
  prediction: 'authentic' | 'fake' | 'uncertain';
  confidence: number;
  explanation: string;
  details: string[];
}

export default function DetectionPage() {
  const [activeTab, setActiveTab] = useState('media');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsText, setNewsText] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setMediaUrl(''); // Clear URL when file is uploaded
      setResult(null);
    }
  };

  const handleMediaUrl = (url: string) => {
    setMediaUrl(url);
    if (url) {
      setUploadedFile(null); // Clear file when URL is entered
      setResult(null);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Simulate random result for demo
          const predictions: Array<'authentic' | 'fake' | 'uncertain'> = ['authentic', 'fake', 'uncertain'];
          const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
          const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
          
          setResult({
            prediction: randomPrediction,
            confidence,
            explanation: getExplanation(randomPrediction),
            details: getDetails(randomPrediction)
          });
          
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
  };

  const getExplanation = (prediction: string): string => {
    switch (prediction) {
      case 'authentic':
        return 'Our AI analysis found consistent patterns, natural lighting, and authentic metadata indicating this content is likely genuine.';
      case 'fake':
        return 'Multiple inconsistencies detected including unnatural facial movements, lighting anomalies, and compression artifacts typical of deepfake generation.';
      case 'uncertain':
        return 'Mixed signals detected. Some indicators suggest authenticity while others raise concerns. Manual review recommended.';
      default:
        return '';
    }
  };

  const getDetails = (prediction: string): string[] => {
    switch (prediction) {
      case 'authentic':
        return [
          'Natural facial expressions and micro-movements',
          'Consistent lighting and shadows',
          'Original metadata present',
          'No compression artifacts detected'
        ];
      case 'fake':
        return [
          'Unnatural eye movements detected',
          'Inconsistent skin texture patterns',
          'Temporal inconsistencies in facial features',
          'Suspicious compression signatures'
        ];
      case 'uncertain':
        return [
          'Mixed facial expression indicators',
          'Partial metadata inconsistencies',
          'Low resolution affects analysis',
          'Additional verification recommended'
        ];
      default:
        return [];
    }
  };

  const getResultIcon = (prediction: string) => {
    switch (prediction) {
      case 'authentic':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'fake':
        return <XCircle className="h-6 w-6 text-destructive" />;
      case 'uncertain':
        return <AlertCircle className="h-6 w-6 text-warning" />;
      default:
        return null;
    }
  };

  const getResultColor = (prediction: string) => {
    switch (prediction) {
      case 'authentic':
        return 'success';
      case 'fake':
        return 'destructive';
      case 'uncertain':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Detection Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload images, videos, or analyze news articles to detect deepfakes and misinformation
          </p>
        </div>

        {/* Detection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="media" className="flex items-center gap-2">
              <FileImage className="h-4 w-4" />
              Image/Video Check
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              News Article Check
            </TabsTrigger>
          </TabsList>

          {/* Media Upload Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Media File
                </CardTitle>
                <CardDescription>
                  Upload an image or video file to check for deepfake manipulation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Section */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                      <FileImage className="h-12 w-12 text-muted-foreground" />
                      <FileVideo className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Drop files here or click to upload</p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, MP4, AVI, MOV (Max 50MB)
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="w-64"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or enter media URL
                    </span>
                  </div>
                </div>

                {/* URL Input Section */}
                <div className="space-y-4">
                  <Label htmlFor="media-url">Image or Video URL</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="media-url"
                        placeholder="https://example.com/image.jpg or video.mp4"
                        value={mediaUrl}
                        onChange={(e) => handleMediaUrl(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      onClick={simulateAnalysis}
                      disabled={!mediaUrl || isAnalyzing}
                      variant="outline"
                    >
                      {isAnalyzing ? (
                        <>
                          <Brain className="mr-2 h-4 w-4 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Analyze URL
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported: Direct links to JPG, PNG, GIF, MP4, MOV, AVI files
                  </p>
                </div>

                {(uploadedFile || mediaUrl) && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {uploadedFile ? (
                        <>
                          {uploadedFile.type.startsWith('image/') ? (
                            <FileImage className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <FileVideo className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Media URL</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {mediaUrl}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button onClick={simulateAnalysis} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Brain className="mr-2 h-4 w-4 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Article Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Article URL
                  </CardTitle>
                  <CardDescription>
                    Paste the URL of a news article to verify
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label htmlFor="news-url">Article URL</Label>
                  <Input
                    id="news-url"
                    placeholder="https://example.com/news-article"
                    value={newsUrl}
                    onChange={(e) => setNewsUrl(e.target.value)}
                  />
                  <Button 
                    onClick={simulateAnalysis} 
                    disabled={!newsUrl || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Verify Article
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Article Text
                  </CardTitle>
                  <CardDescription>
                    Or paste the article content directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label htmlFor="news-text">Article Content</Label>
                  <Textarea
                    id="news-text"
                    placeholder="Paste the article content here..."
                    value={newsText}
                    onChange={(e) => setNewsText(e.target.value)}
                    rows={6}
                  />
                  <Button 
                    onClick={simulateAnalysis} 
                    disabled={!newsText || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 animate-pulse" />
                AI Analysis in Progress
              </CardTitle>
              <CardDescription>
                Our AI models are analyzing your content for authenticity markers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated time: {Math.max(1, Math.round((100 - progress) * 0.05))}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure processing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {result && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getResultIcon(result.prediction)}
                Analysis Complete
              </CardTitle>
              <CardDescription>
                Results from our AI detection system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Result Summary */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  {getResultIcon(result.prediction)}
                  <div>
                    <h3 className="font-semibold text-lg capitalize">
                      {result.prediction === 'authentic' ? 'Likely Authentic' : 
                       result.prediction === 'fake' ? 'Likely Fake' : 'Uncertain'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {result.confidence}%
                    </p>
                  </div>
                </div>
                <Badge variant={getResultColor(result.prediction) as any} className="text-sm">
                  {result.confidence}% Confidence
                </Badge>
              </div>

              {/* Explanation */}
              <div className="space-y-3">
                <h4 className="font-semibold">Explanation</h4>
                <p className="text-muted-foreground">{result.explanation}</p>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-3">
                <h4 className="font-semibold">Detection Details</h4>
                <ul className="space-y-2">
                  {result.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setResult(null);
                  setUploadedFile(null);
                  setMediaUrl('');
                  setNewsUrl('');
                  setNewsText('');
                }}>
                  Analyze Another
                </Button>
                <Button variant="outline">
                  Download Report
                </Button>
                <Button variant="outline">
                  Share Results
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
