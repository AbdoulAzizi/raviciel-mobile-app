import React, { useCallback } from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// --- Interface pour les options des onglets ---
interface TabScreenOption {
  name: string;
  title: string;
  icon: {
    library: 'MaterialCommunityIcons' | 'Ionicons';
    name: string;
  };
}

// --- Configuration centralisée des onglets ---
const TAB_SCREENS: TabScreenOption[] = [
  {
    name: 'index',
    title: 'Accueil',
    icon: { library: 'MaterialCommunityIcons', name: 'home' }
  },
  {
    name: 'acheter',
    title: 'Acheter',
    icon: { library: 'Ionicons', name: 'cart' }
  },
  {
    name: 'louer',
    title: 'Louer',
    icon: { library: 'Ionicons', name: 'key' }
  },
  {
    name: 'nos-services',
    title: 'Services',
    icon: { library: 'MaterialCommunityIcons', name: 'format-list-bulleted' }
  },
  {
    name: 'a-propos',
    title: 'À propos',
    icon: { library: 'MaterialCommunityIcons', name: 'information' }
  },
  {
    name: 'contact',
    title: 'Contact',
    icon: { library: 'Ionicons', name: 'call' }
  },
];

declare const global: {
  reloadScreenUrl?: () => void;
};

// --- Composant pour le rendu des icônes ---
const TabIcon = ({ color, icon }: { color: string; icon: TabScreenOption['icon'] }) => {
  const iconProps = { size: 24, color };
  if (icon.library === 'MaterialCommunityIcons') 
    return <MaterialCommunityIcons name={icon.name as any} {...iconProps} />;
  if (icon.library === 'Ionicons') 
    return <Ionicons name={icon.name as any} {...iconProps} />;
  return null;
};

// --- Composant principal ---
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = '#00ccff';

  // --- Style d'en-tête personnalisé ---
  const renderHeaderTitle = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Ionicons name="home" size={24} color={activeColor} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: activeColor }}>RAVICIEL</Text>
    </View>
  );

  // Fonction pour générer les options de chaque écran avec reload
  const generateTabScreenOptions = useCallback((name: string) => {
    return {
      tabBarIcon: ({ color }: { color: string }) => {
        const screenIcon = TAB_SCREENS.find(screen => screen.name === name)?.icon;
        if (!screenIcon) return null;
        
        return (
          <TouchableOpacity 
            onPress={() => {/* Gérer la navigation si nécessaire */ console.log(`Naviguer vers ${name}`)}}
            onLongPress={() => {/* Reload logic */}}
            delayLongPress={300} // Temps avant déclenchement du long press
          >
            
            <TabIcon color={color} icon={screenIcon} />
          </TouchableOpacity>
        );
      }
    };
  }, []);

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerTitle: renderHeaderTitle,
        tabBarStyle: Platform.select({
          ios: { 
            position: 'absolute', 
            paddingTop: 5, 
            paddingBottom: 5, 
            height: 60 
          },
          default: { 
            paddingTop: 5, 
            paddingBottom: 5, 
            height: 60 
          },
        }),
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: '600', 
          marginBottom: 3, 
        },
        tabBarVisibilityAnimationConfig: {
          hide: { 
            animation: 'timing', 
            config: { duration: 0 } 
          },
          show: { 
            animation: 'timing', 
            config: { duration: 0 } 
          },
        },
      }}
    >
      {/* Onglet caché */}
      <Tabs.Screen name="accueil" options={{ href: null }} />

      {/* Génération dynamique des onglets */}
      {TAB_SCREENS.map(({ name, title, icon }) => (
        <Tabs.Screen 
          key={name} 
          name={name} 
          options={{
            title, 
            tabBarIcon: ({ color }) => <TabIcon color={color} icon={icon} />,
            // ...generateTabScreenOptions(name)
          }} 
          listeners={{
            tabPress: () => {
              // Recharger l'URL spécifique de l'écran
              if (global.reloadScreenUrl) {
                global.reloadScreenUrl();
              }
              console.log(`Naviguer vers ${name}`);
            }
          }}
        />
      ))}
    </Tabs>
  );
}