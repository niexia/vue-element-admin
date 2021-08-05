import * as Sentry from "@sentry/browser";
import {
  Integrations
} from "@sentry/tracing";

Sentry.init({
  dsn: "https://af72d93c9bb74fd4b8b0d31a6a68b9e5@o945168.ingest.sentry.io/5893757",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});