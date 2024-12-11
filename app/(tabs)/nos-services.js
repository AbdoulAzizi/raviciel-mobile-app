import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

export default function NosServicesScreen() {
  return <WebViewScreen url={urls.NOS_SERVICES} screenName="nos-services" />;
}
