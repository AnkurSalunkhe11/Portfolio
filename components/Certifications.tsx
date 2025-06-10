'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/portfolio-data';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  Building, 
  CheckCircle,
  Star,
  Trophy,
  Shield
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Certifications() {
  const { certifications } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleCertificationClick = (name: string, link?: string) => {
    analytics.trackEvent('certification_click', 'engagement', name);
    if (link) {
      window.open(link, '_blank');
    }
  };

  const getCertificationIcon = (name: string) => {
    if (name.toLowerCase().includes('aws')) {
      return <Shield className="w-6 h-6 text-orange-600" />;
    }
    if (name.toLowerCase().includes('engineer') || name.toLowerCase().includes('pe')) {
      return <Trophy className="w-6 h-6 text-blue-600" />;
    }
    if (name.toLowerCase().includes('six sigma')) {
      return <Star className="w-6 h-6 text-green-600" />;
    }
    return <Award className="w-6 h-6 text-indigo-600" />;
  };

  const getCertificationColor = (name: string) => {
    if (name.toLowerCase().includes('aws')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    if (name.toLowerCase().includes('engineer') || name.toLowerCase().includes('pe')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (name.toLowerCase().includes('six sigma')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-indigo-100 text-indigo-800 border-indigo-200';
  };

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Certifications & Credentials</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Professional certifications and credentials that validate my expertise across multiple domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((certification, index) => (
            <motion.div key={certification.name} variants={itemVariants}>
              <Card className="h-full group hover:shadow-professional-xl transition-all duration-300 hover:-translate-y-2 border-slate-200 bg-white overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getCertificationIcon(certification.name)}
                    </div>
                    <Badge className={`text-xs border ${getCertificationColor(certification.name)}`}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    {certification.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <Building className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{certification.issuer}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Issued: {certification.date}</span>
                    </div>

                    {certification.credentialId && (
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1">Credential ID</p>
                        <p className="text-sm font-mono text-slate-700">{certification.credentialId}</p>
                      </div>
                    )}
                  </div>
                  
                  {certification.link && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 border-slate-300 hover:bg-slate-50 group/btn focus-ring"
                      onClick={() => handleCertificationClick(certification.name, certification.link)}
                    >
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Verify Credential</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}