import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  ToastProvider,
  useToast,
} from '@platformbuilders/react-native-toast/ToastProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {toastConfig} from './src/config/toastConfig'

export const Toast = () => {
  const {showToast} = useToast();

  const toast = (toast: string) => {
    if (toast === 'success') {
      showToast({
        title: 'Sucesso',
        message: 'Toast de notificação de sucesso',
        type: 'success',
      });
    }
    if (toast === 'warning') {
      showToast({
        title: 'Alerta',
        message: 'Toast de notificação de Alerta',
        type: 'warning',
      });
    }
    if (toast === 'error') {
      showToast({
        title: 'Erro',
        message: 'Toast de notificação de Erro',
        type: 'error',
      });
    }
    if (toast === 'custom') {
      showToast({
        title: 'Customizado',
        message: 'Toast de notificação Customizada',
        type: 'custom',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => toast('success')}>
        <Text>Sucesso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => toast('warning')}>
        <Text>Warning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => toast('error')}>
        <Text>Error</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => toast('custom')}>
        <Text>Custom</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ToastProvider config={toastConfig}>
          <Toast />
        </ToastProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#3333',
    width: '100%',
    height: 54,
  },
});
