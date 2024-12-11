import React from 'react';
import WebViewScreen from '../components/WebViewScreen';
import urls from '../components/urls';

export default function ContactScreen() {
  return <WebViewScreen url={urls.CONTACT}  screenName="contact" />;
}
