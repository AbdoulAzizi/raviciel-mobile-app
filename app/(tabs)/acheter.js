import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

export default function AcheterScreen() {
  return <WebViewScreen url={urls.ACHETER} screenName="acheter" />;
}
