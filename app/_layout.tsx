import { Stack, Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  // return <Slot />;
  return (
    // <SafeAreaProvider>
    // </SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
