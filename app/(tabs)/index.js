import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import urls from '../components/urls';
import WebViewScreen from '../components/WebViewScreen';
export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      {/* WebView pour afficher le site de RAVICIEL */}
      <WebViewScreen url={urls.RAVICIEL} screenName="index" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});