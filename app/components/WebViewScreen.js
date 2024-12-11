import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import urls from '../components/urls';

const { width, height } = Dimensions.get('window');

export default function WebViewScreen({ url, screenName }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  // Méthode de rechargement global pour l'écran
  const reloadWebView = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setKey(prevKey => prevKey + 1);
    setError(false);
    setLoading(true);
  }, []);

  // Méthode de rechargement spécifique à l'écran avec son URL initiale
  const reloadScreenUrl = useCallback(() => {
    // Récupérer l'URL correspondant au nom de l'écran
    const screenUrls = {
      'index': urls.ACCUEIL,
      'acheter': urls.ACHETER,
      'louer': urls.LOUER,
      'nos-services': urls.SERVICES,
      'a-propos': urls.A_PROPOS,
      'contact': urls.CONTACT
    };

    const specificUrl = screenUrls[screenName] || url;
    
    // Mettre à jour l'URL et forcer le rechargement
    setCurrentUrl(specificUrl);
    setKey(prevKey => prevKey + 1);
    setError(false);
    setLoading(true);
  }, [screenName, url]);

  // Exposer les méthodes globalement
  useEffect(() => {
    global.reloadWebView = reloadWebView;
    global.reloadScreenUrl = reloadScreenUrl;
  }, [reloadWebView, reloadScreenUrl]);

  const goBack = useCallback(() => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  }, [canGoBack]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        key={`webview-${key}`}
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        onNavigationStateChange={(navState) => {
          console.log('Navigating to:', navState.url);
          setCurrentUrl(navState.url);
          setCanGoBack(navState.canGoBack);
        }}
        renderError={(errorName) => {
          setError(true);
          return null;
        }}
      />

      {/* Conteneur des boutons de navigation latéraux */}
      <View style={styles.sideNavigationContainer}>
        {/* Bouton de navigation arrière */}
        <TouchableOpacity 
          style={[
            styles.sideNavigationButton, 
            styles.backButton,
            !canGoBack && styles.disabledButton
          ]} 
          onPress={goBack}
          disabled={!canGoBack}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={canGoBack ? "#FFFFFF" : "#A0A0A0"} 
          />
        </TouchableOpacity>

        {/* Bouton de rechargement */}
        <TouchableOpacity 
          style={[styles.sideNavigationButton, styles.reloadButton]} 
          onPress={reloadWebView}
        >
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Superposition pendant le chargement */}
      {loading && !error && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Chargement en cours...</Text>
        </View>
      )}

      {/* Superposition pour les erreurs */}
      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>
            Impossible de charger la page. Assurez-vous d'être connecté à Internet et réessayez.
          </Text>
          <Button 
            title="Réessayer" 
            color="#4CAF50" 
            onPress={reloadWebView}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sideNavigationContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 180, // Ajustement pour le status bar
    right: 10,
    flexDirection: 'column',
    zIndex: 100,
  },
  sideNavigationButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#4CAF50',
  },
  reloadButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});