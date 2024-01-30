import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useState, createContext } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '@/theme';
import { searchStocks } from '@/utils/searchStocks';
import { type SearchableStock } from '@/data';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const StoredContext = createContext<{ 
  searchQuery: string; 
  setSearchQuery: (text: string) => void;
  searchedStocks: SearchableStock[];
  setSearchedStocks: (stocks: SearchableStock[]) => void;
}>({
  searchQuery: '', 
  setSearchQuery: () => {},
  searchedStocks: [],
  setSearchedStocks: () => {}
});

function RootLayoutNav() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedStocks, setSearchedStocks] = useState<SearchableStock[]>([]);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        <StoredContext.Provider
          value={{ searchQuery, setSearchQuery, searchedStocks, setSearchedStocks }}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerTitle: () => (
              <TextInput 
                dense
                autoFocus 
                mode='outlined' 
                placeholder='Search Stocks...' 
                style={{ width: '88%' }}
                onChangeText={(text: string) => {
                  setSearchQuery(text);
                  const stocks = searchStocks(text);
                  setSearchedStocks(stocks);
                }}
              />
            )}} />
          </Stack>
        </StoredContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
