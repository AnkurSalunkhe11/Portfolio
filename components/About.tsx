'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { portfolioData } from '@/lib/portfolio-data';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Lightbulb, Target, Award, Calendar, MapPin } from 'lucide-react';

export default function About() {
  const { domain } = usePortfolioStore();
  const currentData = portfolioData[domain];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            key={domain}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-lg text-slate-700 leading-relaxed"
            >
              {currentData.about}
            </motion.p>

            {domain === 'cs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="gradient-primary-light border-l-4 border-indigo-500 p-6 rounded-r-xl"
              >
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">My Journey</h3>
                <p className="text-indigo-800">
                  After 5 years in mechanical engineering, I discovered my passion for software development. 
                  The problem-solving skills and analytical thinking from engineering translate perfectly 
                  to building robust, scalable software solutions.
                </p>
              </motion.div>
            )}

            {/* Experience Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Experience</h3>
              {portfolioData.experience[domain].slice(0, 2).map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{exp.title}</h4>
                      <p className="text-sm text-slate-600">{exp.company} • {exp.location}</p>
                      <p className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                    {portfolioData.education.slice(0, 2).map((edu, index) => (
                      <div key={index} className="mt-1">
                        <p className="text-slate-600 text-sm">{edu.degree}</p>
                        <p className="text-slate-500 text-xs">{edu.school} • {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Certifications</h3>
                    {portfolioData.certifications.slice(0, 2).map((cert, index) => (
                      <div key={index} className="mt-1">
                        <p className="text-slate-600 text-sm">{cert.name}</p>
                        <p className="text-slate-500 text-xs">{cert.issuer} • {cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Focus Areas</h3>
                    <p className="text-slate-600 text-sm">
                      {domain === 'cs' 
                        ? 'Full-stack development, system design, and user experience'
                        : 'Thermal systems, manufacturing optimization, and innovation'
                      }
                    </p>
                    <div className="flex items-center mt-2 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {portfolioData.personal.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Let's Connect</h3>
                    <p className="text-slate-600 text-sm mb-2">
                      Open to new opportunities and collaborations
                    </p>
                    <div className="flex space-x-3">
                      <a 
                        href={portfolioData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href={portfolioData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-700 text-xs font-medium"
                      >
                        GitHub
                      </a>
                      <a 
                        href={`mailto:${portfolioData.personal.email}`}
                        className="text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}