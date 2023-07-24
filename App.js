import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Button, Alert ,  Linking, BackHandler} from 'react-native';
import { NavigationContainer , NavigationContainerRefContext, Icon } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator, HeaderBackButton } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
// import { Image } from '@rneui/themed';
import Login from './Screns/Login';
import MenuPrincipal from './Screns/MenuPrincipal';
import Registro from './Screns/Registro';
import OlvideContrasena from './Screns/OlvideContrasena';
import Listado from './Screns/Listado';
import Menu_perfil from './Screns/Menu_perfil';
import Marcar_asistencia from './Screns/Marcar_asistencia';
import Alertas from './Screns/Alertas';
import Avisos from './Screns/Avisos';
import Principal from './Screns/PrincipalTab';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { HeaderBackButton } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();


// const navigation = useNavigation();

// function CartIcon() {
//   const navigateToCart = () => {
//     navigation.navigate("Menu_perfil");
//   }
// }

export default function App(navigation) {

// const navigation = useNavigation();


  function CartIcon() {
    const navigation = useNavigation();
  
    const navigateToCart = () => {
      navigation.navigate("Menu_perfil");
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
        headerStyle:{
          backgroundColor:'#F6F6F6',
          headerTitleAlign: 'center',
        },
        headerTintColor: '#334756',
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

      <Stack.Screen name="Listado" component={Listado} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',
        // headerTintColor: '#ffff',
        // headerStyle: {
        //   backgroundColor: '#11AC85',
        // },
        contentStyle:{borderRadius:20}
    
        }}
      />
      <Stack.Screen name="Marcar_asistencia" component={Marcar_asistencia} options={{ 
          headerShown: true,
          title:'Grabar asistencia',
          headerTitleAlign: 'center',
          // headerTintColor: '#ffff',
          // headerStyle: {
          //   backgroundColor: '#11AC85',
          // },
          
        }}
      />

      <Stack.Screen name="Menu_perfil" component={Menu_perfil} options={{ 
        headerShown: true,
        title:'Perfil de usuario',
        headerTitleAlign: 'center',
        // headerTintColor: '#ffff',
        // headerStyle: {
        //   backgroundColor: '#11AC85',
        // },
      
      
        }}
      />

      <Stack.Screen name="Alertas" component={Alertas} options={{ 
        headerShown: true,
        headerTitleAlign: 'center',
        // headerTintColor: '#ffff',
        // headerStyle: {
        //   backgroundColor: '#11AC85',
        // },
        
          }}
      />

      <Stack.Screen name="Avisos" component={Avisos} options={{ 
              headerShown: true,
              headerTitleAlign: 'center',
              // headerTintColor: '#ffff',
              // headerStyle: {
              //   backgroundColor: '#11AC85',
              // },
              
                }}
        />

      <Stack.Screen name="PrincipalTab" component={Principal} options={{ 
              headerShown: false,              
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
  menu_imagen:{
    width:30,
    height:30,
    // backgroundColor:'white'
  }
});
