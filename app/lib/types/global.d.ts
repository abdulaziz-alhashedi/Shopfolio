// Global type declarations

import { i18n } from 'i18next';

declare global {
  interface Window {
    i18n: i18n;
  }
}

export {};
