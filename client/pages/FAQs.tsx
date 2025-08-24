import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageCircle } from 'lucide-react';

export default function FAQs() {
  const faqCategories = [
    {
      title: 'General Questions',
      questions: [
        {
          question: 'What is Factify?',
          answer: 'Factify is an AI-powered platform that detects deepfakes and fake news. We use advanced machine learning algorithms to analyze images, videos, and text content to determine their authenticity and help users identify potentially manipulated or false information.'
        },
        {
          question: 'How accurate is the detection?',
          answer: 'Our AI models achieve 99.2% accuracy in controlled testing environments. However, accuracy can vary depending on the quality and type of content being analyzed. We continuously update our models to improve detection capabilities as new manipulation techniques emerge.'
        },
        {
          question: 'Is Factify free to use?',
          answer: 'Yes! Factify offers a free tier that allows you to analyze images, videos, and text content. We also offer premium plans with additional features like batch processing, API access, and detailed forensic reports for professional users.'
        },
        {
          question: 'What file formats are supported?',
          answer: 'For images: JPG, PNG, GIF, BMP, TIFF. For videos: MP4, AVI, MOV, WMV, MKV. Maximum file size is 50MB for free users and 500MB for premium users. We also support analyzing news articles via URL or direct text input.'
        }
      ]
    },
    {
      title: 'Deepfake Detection',
      questions: [
        {
          question: 'What is a deepfake?',
          answer: 'A deepfake is a synthetic media created using artificial intelligence to replace a person\'s appearance or voice with someone else\'s. These can be used to create fake videos or images that appear real but are artificially generated or manipulated.'
        },
        {
          question: 'How does deepfake detection work?',
          answer: 'Our AI analyzes multiple factors including facial expressions, eye movements, temporal inconsistencies, compression artifacts, and lighting patterns. It compares these against patterns typical of both authentic and synthetic content to determine likelihood of manipulation.'
        },
        {
          question: 'Can Factify detect all types of deepfakes?',
          answer: 'While our technology is highly advanced, the deepfake landscape is constantly evolving. We detect most current deepfake techniques with high accuracy, but no system is 100% perfect. We continuously update our models to stay ahead of new manipulation methods.'
        },
        {
          question: 'What should I do if I find a deepfake?',
          answer: 'If you discover a deepfake, avoid sharing it further. Consider reporting it to the platform where you found it, and if it\'s being used maliciously, you may want to report it to relevant authorities. Always verify information through multiple reliable sources.'
        }
      ]
    },
    {
      title: 'Fake News Detection',
      questions: [
        {
          question: 'How do you detect fake news?',
          answer: 'Our system analyzes article content, cross-references facts with reliable sources, checks for emotional manipulation techniques, examines source credibility, and identifies common patterns found in misinformation. We also check publication dates and author information when available.'
        },
        {
          question: 'What makes news "fake"?',
          answer: 'Fake news can include completely fabricated stories, misleading headlines, out-of-context information, biased reporting presented as fact, or manipulated statistics. Our AI looks for these patterns and inconsistencies to flag potentially unreliable content.'
        },
        {
          question: 'Can you analyze social media posts?',
          answer: 'Yes! You can copy and paste social media content into our text analysis tool. However, keep in mind that shorter posts may have less content for our AI to analyze, which can affect accuracy. We recommend checking multiple sources for verification.'
        },
        {
          question: 'How do you handle opinion pieces vs. news?',
          answer: 'Our AI is trained to distinguish between factual reporting and opinion content. While opinions aren\'t "fake," we can identify when opinion pieces are presented as factual news or when they contain demonstrably false claims.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      questions: [
        {
          question: 'Is my uploaded content stored?',
          answer: 'No. We process your content in real-time and do not permanently store uploaded files. Images and videos are analyzed and then immediately deleted from our servers. Text content is also processed without permanent storage.'
        },
        {
          question: 'How do you protect user privacy?',
          answer: 'We use encryption for all data transmission, do not track personal information without consent, and follow GDPR and other privacy regulations. Our privacy-first approach ensures your data remains secure and confidential.'
        },
        {
          question: 'Can I use Factify for commercial purposes?',
          answer: 'Yes! We offer commercial licenses and API access for businesses, news organizations, and other professional users. Contact our sales team for enterprise pricing and custom solutions.'
        },
        {
          question: 'Do you share data with third parties?',
          answer: 'We do not sell or share user data with third parties. We may use anonymized, aggregated data to improve our AI models, but this never includes personally identifiable information or your specific uploaded content.'
        }
      ]
    },
    {
      title: 'Technical Questions',
      questions: [
        {
          question: 'What AI models do you use?',
          answer: 'We employ a combination of deep learning models including convolutional neural networks (CNNs), recurrent neural networks (RNNs), and transformer architectures. Our models are trained on millions of authentic and synthetic media samples.'
        },
        {
          question: 'How often are your models updated?',
          answer: 'We continuously monitor the threat landscape and update our models monthly with new training data. Major model updates are released quarterly to address emerging manipulation techniques and improve accuracy.'
        },
        {
          question: 'Can I integrate Factify into my application?',
          answer: 'Yes! We offer a RESTful API for developers to integrate our detection capabilities into their own applications. Check our API documentation or contact our technical team for integration support.'
        },
        {
          question: 'What happens if the analysis is uncertain?',
          answer: 'When our AI confidence is below certain thresholds, we mark results as "uncertain" and recommend manual review. This honest approach helps users make informed decisions rather than providing potentially misleading definitive answers.'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <HelpCircle className="mr-2 h-4 w-4" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            How Can We Help?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Factify's deepfake and fake news detection technology.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="text-center border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/detect">Try Detection Tool</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
