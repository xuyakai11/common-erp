import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  release: 'hello-world',
  dsn: 'https://ebf757459306433aa183c2b832c3faa8@o396473.ingest.sentry.io/5249981',
  integrations: [new VueIntegration({Vue, attachProps: true})],
});
