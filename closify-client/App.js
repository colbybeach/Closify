import { StyleSheet, View } from 'react-native';
import TestFunc from './components/TestFunc';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './components/TabBar';

const queryClient = new QueryClient();

axios.defaults.baseURL = "https://rzz35qeyf0.execute-api.us-east-2.amazonaws.com/dev/v1/";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TabBar/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
