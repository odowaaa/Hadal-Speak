import { X, Heart, Globe, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'so';
}

export default function AboutModal({ isOpen, onClose, language }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Hadal English</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Speak & Learn' : 'Hadal & Baro'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                {language === 'en' ? 'About' : 'Ku saabsan'}
              </h3>
              <p className="text-foreground leading-relaxed">
                {language === 'en' 
                  ? 'Hadal English – Speak & Learn is a simple language learning app developed by Abdinur Mohamed Odowa. It helps users improve their English and Somali speaking skills through real-life conversations and translations.'
                  : 'Hadal English – Hadal & Baro waa app fudud oo wax ku barasho ah oo uu sameeyay Abdinur Mohamed Odowa. Waxay ka caawisaa isticmaalayaasha inay horumariyaan xirfadahooda ku hadalka Ingiriisiga iyo Soomaaliga iyagoo adeegsanaya wadahadallo dhabta ah iyo turjumaad.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                {language === 'en' ? 'Target Audience' : 'Dadka Bartida'}
              </h3>
              <p className="text-foreground leading-relaxed">
                {language === 'en'
                  ? 'The app is designed for Somalis learning English and internationals interested in Somali language, with three levels: Beginner, Intermediate, and Advanced.'
                  : 'App-kan waxaa loo sameeyay Soomaalida barata Ingiriisiga iyo dadka kale ee daneynaya luqadda Soomaaliga, waxaana leh saddex heer: Bilowga, Dhexe, iyo Sare.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                {language === 'en' ? 'Our Goal' : 'Hadafkeenna'}
              </h3>
              <p className="text-foreground leading-relaxed">
                {language === 'en'
                  ? 'The goal is to make speaking practice easy, daily, and practical for everyone.'
                  : 'Hadafku waa in la fududeeyo ku celcelinta hadalka, maalintii, oo loo fududeeyo qof kasta.'
                }
              </p>
            </div>

            {/* Developer Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                {language === 'en' ? 'Developer' : 'Horumariyaha'}
              </h3>
              <p className="text-foreground font-medium">Abdinur Mohamed Odowa</p>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' 
                  ? 'Passionate about bridging language barriers and connecting communities through technology.'
                  : 'Aad u jecel in uu ku xiro ciqaabaha luqadda oo uu ku xiro bulshada teknoolajiyada.'
                }
              </p>
              
              {/* Contact Information */}
              <div className="mt-3 pt-3 border-t border-border space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  {language === 'en' ? 'Contact Developer' : 'La xiriir Horumariyaha'}
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => window.open('https://wa.me/252616538992', '_blank')}
                    className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
                  >
                    <span className="mr-2">📱</span>
                    <span>+252 61 653 8992</span>
                    <span className="ml-1 text-xs text-muted-foreground">(WhatsApp)</span>
                  </button>
                  <button
                    onClick={() => window.open('mailto:odowaa1996@gmail.com', '_blank')}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span className="mr-2">✉️</span>
                    <span>odowaa1996@gmail.com</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {language === 'en' ? 'Version 1.0.0 | January 2025' : 'Nooca 1.0.0 | Janayir 2025'}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {language === 'en' ? 'Close' : 'Xir'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}