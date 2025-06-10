'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, FileText } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Resume() {
  const { domain } = usePortfolioStore();

  const handleDownload = (type: 'cs' | 'mechanical') => {
    analytics.trackResumeDownload(type);
    const link = document.createElement('a');
    link.href = `/resume_${type}.pdf`;
    link.download = `${type === 'cs' ? 'AlexThompson_CS_Resume' : 'AlexThompson_Mechanical_Resume'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (type: 'cs' | 'mechanical') => {
    analytics.trackResumeView(type);
    window.open(`/resume_${type}.pdf`, '_blank');
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Resume</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Download or view my resume tailored for each domain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white ${
              domain === 'cs' ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
            }`}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Computer Science Resume
                </CardTitle>
                <p className="text-slate-600">
                  Software development focused with programming projects and technical skills
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 border-slate-300 hover:bg-slate-50 focus-ring"
                    onClick={() => handleView('cs')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </Button>
                  <Button
                    className="flex items-center space-x-2 gradient-primary text-white btn-hover-lift focus-ring"
                    onClick={() => handleDownload('cs')}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white ${
              domain === 'mechanical' ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''
            }`}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Mechanical Engineering Resume
                </CardTitle>
                <p className="text-slate-600">
                  Engineering experience with design projects and technical achievements
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 border-slate-300 hover:bg-slate-50 focus-ring"
                    onClick={() => handleView('mechanical')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </Button>
                  <Button
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white btn-hover-lift focus-ring"
                    onClick={() => handleDownload('mechanical')}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-slate-50 rounded-2xl p-6 max-w-2xl mx-auto border border-slate-200">
            <p className="text-slate-600 mb-4">
              Currently viewing: <span className="font-semibold text-slate-900">
                {domain === 'cs' ? 'Computer Science' : 'Mechanical Engineering'}
              </span> portfolio
            </p>
            <p className="text-sm text-slate-500">
              Use the toggle in the header to switch domains and see the corresponding resume
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}