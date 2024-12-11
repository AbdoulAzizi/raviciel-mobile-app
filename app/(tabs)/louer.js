import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

// Exemple pour l'écran de location
export default function LouerScreen() {
  return <WebViewScreen url={urls.LOUER} screenName="louer" />;
}

// Faites de même pour les autres écrans
