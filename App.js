import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer , NavigationContainerRefContext, Icon } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from 'react-native-vector-icons/Feather';
import Login from './Screns/Login';
import Registro from './Screns/Registro';
import OlvideContrasena from './Screns/OlvideContrasena';
import MenuPrincipal from './Screns/MenuPrincipal';
import Reservar from './Screns/Reservar';
import Avisos from './Screns/Avisos';
import DetalleReserva from './Screns/DetalleReserva';
import MenuPerfil from './Screns/MenuPerfil';
import DetalleHabitacion from './Screns/DetalleHabitacion';
import Listado from './Screns/Listado';
import Alertas from './Screns/Alertas';
import Politicas from './Screns/Politicas';

const Stack = createNativeStackNavigator();


export default function App() {

  function CartIcon() {
    const navigation = useNavigation();
  
    const navigateToCart = () => {
      navigation.navigate("MenuPerfil");
    }
    return (
      <Feather name='external-link' size={22} color='#ffff' style={{fontWeight:'300'}}  onPress={navigateToCart} />
    
    );
  }

  return (
    <NavigationContainer>
    {/* const navigation = useNavigation(); */}
      
    <Stack.Navigator 
      screenOptions={{
          animation: "slide_from_right",
          // headerTransparent: true,
        
          // headerStyle:{backgroundColor:'#C8C8C8', borderw}
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{  headerShown: false}}  />

      <Stack.Screen name="Registro" component={Registro} options={{  headerShown: false}} />

      <Stack.Screen name="OlvideContrasena" component={OlvideContrasena} options={{  headerShown: false}}/>


      <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} 
          options={(navigation) => ({ 
              headerShown:false,
              headerRight: (props) => <CartIcon />,
              headerBackVisible:false,
          })}
          
      />

      <Stack.Screen name="Reservar" component={Reservar} options={{ 
          headerShown: true,
          title:'Reservar',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen name="DetalleHabitacion" component={DetalleHabitacion} options={{ 
          headerShown: true,
          title:'Detalle Habitación',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen name="DetalleReserva" component={DetalleReserva} options={{ 
          headerShown: true,
          title:'Reserva',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen name="MenuPerfil" component={MenuPerfil} options={{ 
        headerShown: true,
        title:'Mi perfil',
        headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen name="Avisos" component={Avisos} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',              
          }}
      />

      <Stack.Screen name="Listado" component={Listado} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',
        contentStyle:{borderRadius:20},
        title:'Reservas',
    
        }}
      />

      <Stack.Screen name="Alertas" component={Alertas} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',
        contentStyle:{borderRadius:20},
        title:'Alertas',
    
        }}
      />

      <Stack.Screen name="Politicas" component={Politicas} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',
        contentStyle:{borderRadius:20},
        title:'Even Hotel',
    
        }}
      />

     

    </Stack.Navigator>
  </NavigationContainer>
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
