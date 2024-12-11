import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

export default function AccueilScreen() {
  return <WebViewScreen url={urls.ACCUEIL} />;
}
