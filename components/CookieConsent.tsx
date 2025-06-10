'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    Cookies.set('cookie-consent', JSON.stringify(allAccepted), { expires: 365 });
    setShowBanner(false);
    
    // Reload to initialize analytics if accepted
    if (allAccepted.analytics) {
      window.location.reload();
    }
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    Cookies.set('cookie-consent', JSON.stringify(necessaryOnly), { expires: 365 });
    setShowBanner(false);
  };

  const savePreferences = () => {
    Cookies.set('cookie-consent', JSON.stringify(preferences), { expires: 365 });
    setShowSettings(false);
    setShowBanner(false);
    
    // Reload if analytics preferences changed
    window.location.reload();
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
          >
            <Card className="border-slate-200 bg-white shadow-professional-xl">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Cookie className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Cookie Preferences
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      We use cookies to enhance your experience and analyze site usage. 
                      You can customize your preferences or accept all cookies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        onClick={acceptAll}
                        className="gradient-primary text-white"
                      >
                        Accept All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={acceptNecessary}
                        className="border-slate-300"
                      >
                        Necessary Only
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowSettings(true)}
                        className="text-slate-600"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Customize
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-professional-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Cookie Settings
                  </h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Necessary Cookies</h3>
                      <p className="text-sm text-slate-600">
                        Required for basic site functionality
                      </p>
                    </div>
                    <div className="text-sm text-slate-500 font-medium">Always On</div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Analytics Cookies</h3>
                      <p className="text-sm text-slate-600">
                        Help us understand how visitors use our site
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => updatePreference('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Marketing Cookies</h3>
                      <p className="text-sm text-slate-600">
                        Used to track visitors across websites
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => updatePreference('marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={savePreferences}
                    className="flex-1 gradient-primary text-white"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(false)}
                    className="border-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}