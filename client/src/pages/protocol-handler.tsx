import { useEffect } from "react";
import { useLocation } from "wouter";
import { getLessonById } from "@/lib/lessons-data";

/**
 * Landing point for the registered `web+hadalenglish://` protocol handler
 * (see manifest.json `protocol_handlers`). The OS/browser invokes this route
 * as `/protocol-handler?target=<the full web+hadalenglish:// URI>`.
 *
 * Supported form: web+hadalenglish://lesson/<lessonId>
 */
export default function ProtocolHandler() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get("target") ?? "";
    const path = target.split("://")[1] ?? "";
    const [resource, lessonId] = path.split("/");

    if (resource === "lesson" && lessonId) {
      const lesson = getLessonById(lessonId);
      if (lesson) {
        setLocation(`/lesson/${lesson.level}/${lesson.id}`, { replace: true });
        return;
      }
    }

    setLocation("/", { replace: true });
  }, [setLocation]);

  return null;
}
