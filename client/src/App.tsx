import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStateProvider, useAppState } from "@/context/app-state";
import Home from "./pages/home";
import Lesson from "./pages/lesson";
import Lessons from "./pages/lessons";
import Practice from "./pages/practice";
import Progress from "./pages/progress";
import Profile from "./pages/profile";
import PrivacyPolicy from "./pages/privacy-policy";
import NotFound from "./pages/not-found";
import NotificationReminder from "./components/notification-reminder";
import { useLessonReminders } from "./hooks/use-lesson-reminders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/lesson/:level/:lessonId" component={Lesson} />
      <Route path="/practice" component={Practice} />
      <Route path="/progress" component={Progress} />
      <Route path="/profile" component={Profile} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const { language } = useAppState();
  const { showReminder, dismissReminder, snoozeReminder } = useLessonReminders();

  return (
    <>
      <Toaster />
      <Router />

      {showReminder && (
        <NotificationReminder
          language={language}
          onClose={dismissReminder}
          onSnooze={snoozeReminder}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AppStateProvider>
      <TooltipProvider>
        <AppShell />
      </TooltipProvider>
    </AppStateProvider>
  );
}

export default App;
