import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Servicios',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44327/',
    redirectUri: baseUrl,
    clientId: 'Servicios_App',
    responseType: 'code',
    scope: 'offline_access Servicios',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44327',
      rootNamespace: 'Servicios',
    },
  },
} as Environment;
