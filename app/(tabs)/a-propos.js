import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

export default function AProposScreen() {
  return <WebViewScreen url={urls.A_PROPOS} screenName="a-propos" />;
}
