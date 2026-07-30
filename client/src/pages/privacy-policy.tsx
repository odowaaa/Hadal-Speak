import { useLocation } from "wouter";
import { ArrowLeft, Shield, Eye, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "../components/header";
import BottomNav from "../components/bottom-nav";
import { useAppState } from "@/context/app-state";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();
  const { language, toggleLanguage } = useAppState();

  const privacyContent = {
    en: {
      title: "Privacy Policy",
      subtitle: "No account, no server - your data stays on your device",
      lastUpdated: "Last Updated: July 30, 2026",
      sections: [
        {
          icon: Eye,
          title: "What Is Stored",
          content: [
            "• Lesson completion status and quiz scores",
            "• Language, dark mode, and reminder preferences",
            "• All of it is saved only in this device's local storage"
          ]
        },
        {
          icon: Lock,
          title: "What We Don't Collect",
          content: [
            "• No account, name, or email is required",
            "• No analytics, ads, or usage tracking",
            "• No audio is recorded, stored, or uploaded - speech features run entirely on your device"
          ]
        },
        {
          icon: Shield,
          title: "Data Protection",
          content: [
            "• Nothing is transmitted to us - there is no server to send it to",
            "• Your data never leaves this device",
            "• Uninstalling the app deletes it completely"
          ]
        },
        {
          icon: FileText,
          title: "Your Choices",
          content: [
            "• Reset all progress anytime in Profile → Reset Progress",
            "• Change language and settings anytime in Profile",
            "• Uninstall the app to remove all locally stored data"
          ]
        }
      ],
      contact: {
        title: "Questions?",
        text: "Contact our developer for privacy concerns:",
        email: "odowaa1996@gmail.com",
        whatsapp: "+252616538992"
      }
    },
    so: {
      title: "Siyaasadda Sirta",
      subtitle: "Ma jiro koontada ama server - xogtaadu waxay ku sii jirtaa aaladdaada",
      lastUpdated: "La cusboonaysiiyay: Julay 30, 2026",
      sections: [
        {
          icon: Eye,
          title: "Waxa Lagu Kaydiyo",
          content: [
            "• Xaaladda dhammaystirka casharrada iyo natiijooyinka imtixaanka",
            "• Doorashada luqadda, muuqaalka madow, iyo dejinta xusuusinta",
            "• Dhammaan waxaa lagu kaydiyaa aaladdaada oo keliya"
          ]
        },
        {
          icon: Lock,
          title: "Waxaanaan Ururinayn",
          content: [
            "• Uma baahnid koonto, magac, ama email",
            "• Ma jiro falanqayn, xayaysiin, ama la socodka isticmaalka",
            "• Cod lama duubo, lama kaydiyo, lamana soo shubo - astaamaha hadalka waxay ka shaqeeyaan aaladdaada oo keliya"
          ]
        },
        {
          icon: Shield,
          title: "Ilaalinta Xogta",
          content: [
            "• Waxba nooguma soo dirna - ma jiro server aan u dirno",
            "• Xogtaadu kama bixi karto aaladdan",
            "• Ka saaridda app-ka waxay tirtirtaa xogta oo dhan"
          ]
        },
        {
          icon: FileText,
          title: "Doorashooyinkaaga",
          content: [
            "• Waqti kasta dib u deji horumarka: Profile → Reset Progress",
            "• Waqti kasta bedel luqadda iyo dejinta: Profile",
            "• Ka saar app-ka si aad u tirtirto xogta aaladdaada ku jirta oo dhan"
          ]
        }
      ],
      contact: {
        title: "Su'aalo?",
        text: "Kala xiriir horumariyaha arrimo sir ah:",
        email: "odowaa1996@gmail.com",
        whatsapp: "+252616538992"
      }
    }
  };

  const content = privacyContent[language];

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-200">
      <Header
        user={{ id: "local", username: "demo", language }}
        onLanguageToggle={toggleLanguage}
      />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/profile')}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">
              {content.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <Card className="p-4 bg-muted/50 border-border transition-colors duration-200">
          <p className="text-xs text-muted-foreground text-center">
            {content.lastUpdated}
          </p>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <Card key={index} className="p-6 border-border bg-card transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <section.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-sm text-muted-foreground">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-border transition-colors duration-200">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            {content.contact.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {content.contact.text}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.open(`mailto:${content.contact.email}`, '_blank')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="mr-2">✉️</span>
              <span>{content.contact.email}</span>
            </button>
            <button
              onClick={() => window.open(`https://wa.me/252616538992`, '_blank')}
              className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
            >
              <span className="mr-2">📱</span>
              <span>{content.contact.whatsapp}</span>
            </button>
          </div>
        </Card>

        {/* Full Policy Link */}
        <Card className="p-4 border-border bg-card transition-colors duration-200">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">
              {language === 'en' 
                ? 'For the complete privacy policy, visit:'
                : 'Siyaasadda sirta oo dhamaystiran, booqo:'
              }
            </p>
            <a
              href="/privacy-policy-full"
              className="text-sm text-blue-600 hover:text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === 'en' 
                ? 'Full Privacy Policy'
                : 'Siyaasadda Sirta oo Dhamaystiran'
              }
            </a>
          </div>
        </Card>
      </main>

      <BottomNav currentPage="profile" language={language} />
    </div>
  );
}