import { StatusBar } from 'expo-status-bar';
import {useEffect, useState,useRef} from 'react';
import { SafeAreaProvider, Text, View , Image, Alert, Dimensions,TouchableNativeFeedback,BackHandler} from 'react-native';
import axios from '../Shared/Axios';
import { useIsFocused } from "@react-navigation/native"; 
import { BottomSheet } from 'react-native-btr';
import {menu_index} from '../Shared/Estilos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import misImages from '../assets/imagenes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Badge, Icon } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
// let urlBase = 'https://teleinterconsulta.energenioperu.com/uploads/imagen/';
let urlBase = 'http://localhost:82/reserva/uploads/imagen/';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import misAccesorios from '../assets/accesorios';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// import { ScrollView } from 'react-native-gesture-handler';

export default function MenuPrincipal(props){

    const [visible, setVisible] = useState(false);
    const [menuControl, setMenuControl] = useState('menu');
    const toggleBottomNavigationView = () => {
        setMenuControl('menu-open');
        setVisible(true);
    };
    const Close = () => {
        setTimeout(() => {
            setVisible(false);
            setMenuControl('menu');
        }, 350);
    };
 
    // const Tab = createBottomTabNavigator();
    const [usuario,setUsuario] = useState(props.route.params?.nombreUsuario || '');
    const [estado_tipo,setTipo] = useState(props.route.params?.tipo || '');
    const [id,setId] = useState(props.route.params?.id_usuario || '');
    const [image, setImage] = useState(null);
    // const [sesion, setSesion] = useState({});
    const [noti,setNoti] = useState(0);
    const [reserActivas,setReserActi] = useState(0);

    const [disponible,setDisponible] = useState(0);
    const [pendiente,setPendiente] = useState(0);
    const [ocupados,setOcupados] = useState(0);
    const [limpieza,setLimpieza] = useState(0);


    const [progress, setProgress] = useState(0);
    const [refresh, setRefresh] = useState((new Date()));
    const focus = useIsFocused(); 

    // const backAction = () => {
    //     Alert.alert('Cerrar sesión!', '¿ Seguro que desea salir ? ', [
    //       {
    //         text: 'No',
    //         onPress: () => null,
    //         style: 'cancel',
    //       },
    //       {text: 'Si', onPress: (c) =>  {Close(),props.navigation.push('Login')} },
    //     ]);
    //     return true;
    //     backHandler.remove();

    // };

    const listarAlertas = async () => {
        await axios({
            method: 'get',
            url: "alertas/getAlertasActivas",
            data:null,
        }).then(async function (d) {
            let datos = d.data;   
            setNoti(datos.length);
           
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    }

    const listarReservas = async () => {
        await axios({
            method: 'get',
            url: "reserva/getReservasActivas",
            data:null,
        }).then(async function (d) {
            let datos = d.data;   
            setReserActi(datos.length);
           
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    }


    const listarHabitaciones = async () => {
        await axios({
            method: 'get',
            url: "habitaciones/getHabitaciones",
            data:null,
        }).then(async function (d) {
            let datos = d.data;   
            var result=[];
            datos.forEach(function(item,key) {
                result.push(item.estado)
             });
             const resultado = {}
             result.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
             setDisponible(resultado['1']);
             setPendiente(resultado['2']);
             setOcupados(resultado['3']);
             setLimpieza(resultado['4']);
             console.log(resultado);
            //  if(resultado['2'] != ""){
            //  }else{
            //     setPendiente(0);
            //  }
            //  if(resultado['3'] != ""){
            // }
            // if(resultado['4'] != ""){
            // }
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    }

    const traerData = async () => {
        let datos_sesion = await AsyncStorage.getItem('@reservas');
        let valores = JSON.parse(datos_sesion);
        if(valores != null && valores.nombre_imagen != null){
            setImage(valores.nombre_imagen);
        }
        console.log("traer data");
    }
    const data = {
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        datasets: [
          {
            data: [7, 8, 12, 13, 14, 18],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth:2 // optional
          }
        ],
        legend: ["Asistencia"] // optional
    };

    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction,
    //   );

    useEffect(() => {
        traerData();
        listarAlertas();
        listarHabitaciones();
        listarReservas();
        
        if(focus == true){ // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
            listarAlertas();
            Close();
            listarHabitaciones();
            BackHandler.addEventListener('hardwareBackPress', salirApp);
        }        
        return () => BackHandler.removeEventListener('hardwareBackPress', salirApp);
    
    }, [focus,refresh],[salirApp]);


    const salirApp = () => {

        Alert.alert('Espera!', '¿ Seguro que deseas salir ?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Salir', onPress: () => { AsyncStorage.removeItem('@reservas'), BackHandler.removeEventListener('hardwareBackPress', salirApp) , props.navigation.push('Login')}},
        ]);
        return true;
      };



    return(
        <View style={menu_index.contenedor}>
            <StatusBar backgroundColor="#FCFCFC" barStyle="dark-content" />

            <View style={menu_index.espaciador}></View>

            <View style={menu_index.detalle_usuario}>
                <View style={menu_index.fila1}>
                    <View style={menu_index.detalle_usuario_c2}>
                        <MaterialCommunityIcons name={menuControl} size={34} color='#000' onPress={toggleBottomNavigationView} />
                    </View>
                    <View style={menu_index.detalle_usuario_c1}>
                        <TouchableNativeFeedback   onPress={() =>  {props.navigation.navigate("MenuPerfil", {id_usuario:id} ) }}>
                            <Image  style={menu_index.imagen_logo} source={require('../assets/avatar.jpg')}></Image>                         
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={menu_index.fila2}>
                    <View style={menu_index.detalle_usuario_c3}>
                        <Text style={menu_index.titulo}>Hola 😉, </Text>
                        <Text style={menu_index.subtitulo}>{usuario.split(' ').slice(0,1)}</Text>
                        {/* <Text style={menu_index.subtitulo}></Text> */}
                    </View>
                </View>
            </View>

            <View style={menu_index.cuerpoMedio}>
                    <View style={menu_index.espaciador}></View>
                    <View  >
                        <BottomSheet
                        visible={visible}
                        onBackButtonPress={Close}
                        onBackdropPress={Close}
                        >
                        <View style={menu_index.opcionMenu}>
                            <Text style={menu_index.textoTitulo}>OPCIONES</Text>
                            <TouchableNativeFeedback style={menu_index.botonesMenu} onPress={() => {Close(),props.navigation.navigate("MenuPerfil", {id_usuario:id} )} }>
                                    <Text style={menu_index.textoMenu}>
                                    <Feather name='user' size={24} color='#2E86C6' style={{marginLeft:10}} /> Mi perfil
                                    </Text>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback  style={menu_index.botonesMenuC}   
                                    onPress={()=>{
                                        Close(),
                                        Alert.alert(
                                            'Cerrar sesión',
                                            '¿Seguro que desea salir?',
                                            [
                                            { text: 'No', style:'destructive' },
                                            { text: 'SALIR', onPress: () => { AsyncStorage.removeItem('@reservas'), props.navigation.push('Login') } },                              
                                            ],
                                            { cancelable: false }
                                        )
                                    }}> 
                                    <Text style={menu_index.textoMenuR}>
                                        <Feather name='log-out' size={24} color='#FF6464' style={{marginLeft:10}} /> Cerrar sesión
                                    </Text>
                            </TouchableNativeFeedback>
                        </View>
                        </BottomSheet>

                    </View>

                    <View style={menu_index.menu_grid}>
                        {
                            estado_tipo == 1   
                            ? 
                                // <View>
                                <View style={menu_index.Campo}>
                                        <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                                onPress={() => props.navigation.navigate("Reservar", {id_usuario:id} )}
                                            >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/camas.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                <Text style={menu_index.buttonText}>Reservas</Text>
                                        
                                        </View>

                                        <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                                onPress={() => props.navigation.navigate("Avisos" )}

                                            >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/notificacion.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                <Text style={menu_index.buttonText}>Crear</Text>
                                                <Text style={menu_index.buttonText}>Aviso</Text>
                                        </View>
                                        
                                        <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                            onPress={() => props.navigation.navigate("Listado")}
                                            >
                                            <Image
                                                style={menu_index.imagen_menu}
                                                source={require('../assets/historial.png')}
                                            />
                                            </TouchableNativeFeedback>
                                            <Text style={menu_index.buttonText}>Total</Text>
                                            <Text style={menu_index.buttonText}>Reservas</Text>
                                            <Badge
                                                status="primary"
                                                value={reserActivas}
                                                containerStyle={{ position: 'absolute', top:0, left: 50 }}
                                            />
                                        </View>
                                        
                                        <View style={menu_index.contorno_img}>

                                            <TouchableNativeFeedback
                                                style={menu_index.buttonLg}
                                                onPress={() => props.navigation.navigate("Alertas",{tipo_perfil:estado_tipo})}
                                                >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/alarm.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                <Text style={menu_index.buttonText}>Alertas</Text>
                                            <Badge
                                                status="primary"
                                                value={noti}
                                                containerStyle={{ position: 'absolute', top:0, left: 50 }}
                                            />
                                        </View>
                                </View>

                            :
                                // USUARIO
                                <View style={menu_index.Campo}>
                                    <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                                onPress={() => props.navigation.navigate("Reservar", {id_usuario:id,tipo:estado_tipo} )}
                                            >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/camas.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                <Text style={menu_index.buttonText}>Reservar</Text>
                                        
                                        </View>

                                        <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                                onPress={() => props.navigation.navigate("Alertas", {id_usuario:id,tipo_perfil:estado_tipo} )}

                                            >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/notificacion.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                {/* <Text style={menu_index.buttonText}>Crear</Text> */}
                                                <Text style={menu_index.buttonText}>Alertar</Text>
                                        </View>
                                        
                                        <View style={menu_index.contorno_img}>
                                            <TouchableNativeFeedback
                                            onPress={() => props.navigation.navigate("Listado",{id_usuario:id})}
                                            >
                                            <Image
                                                style={menu_index.imagen_menu}
                                                source={require('../assets/historial.png')}
                                            />
                                            </TouchableNativeFeedback>
                                            <Text style={menu_index.buttonText}>Mis</Text>
                                            <Text style={menu_index.buttonText}>Reservas</Text>
                                        </View>
                                        
                                        <View style={menu_index.contorno_img}>

                                            <TouchableNativeFeedback
                                                style={menu_index.buttonLg}
                                                onPress={() => props.navigation.navigate("Avisos",{id_usuario:id})}
                                                >
                                                <Image
                                                    style={menu_index.imagen_menu}
                                                    source={require('../assets/alarm.png')}
                                                />
                                            </TouchableNativeFeedback>
                                                <Text style={menu_index.buttonText}>Avisos</Text>
                                            <Badge
                                                status="primary"
                                                value={noti}
                                                containerStyle={{ position: 'absolute', top:0, left: 50 }}
                                            />
                                        </View>
                                </View>
                        }
                    </View>

                    <View style={menu_index.espaciador}>
                        {
                            estado_tipo == 1   
                            ?
                            <Text style={menu_index.textoSlider}>Panel </Text>
                            :
                            <Text style={menu_index.textoSlider}>Contamos con: </Text>
                        }
                    </View>
                    {
                        estado_tipo == 1   
                        ?
                        <View style={menu_index.menu_central}>

                            <View style={menu_index.espacio1}>
                                <Text style={menu_index.texto_titulo_menu}>Disponibles</Text>
                                <Image
                                        style={menu_index.imagen_menu_principal}
                                        source={require('../assets/cama.png')}
                                    />
                                <View style={menu_index.vista_numero}>
                                    <Text style={menu_index.texto_numero}> { disponible } </Text>
                                </View>
                            </View>
        
                            <View style={menu_index.espacio2}>
                                <Text style={menu_index.texto_titulo_menu}>Pendientes</Text>
                                <Image
                                        style={menu_index.imagen_menu_principal}
                                        source={require('../assets/waiting.png')}
                                    />
                                <View style={menu_index.vista_numero}>
                                    <Text style={menu_index.texto_numero}> {pendiente ? pendiente : 0} </Text>
                                </View>
                            </View>
        
        
                            <View style={menu_index.espacio3}>
                                <Text style={menu_index.texto_titulo_menu}>Ocupados</Text>
                                <Image
                                        style={menu_index.imagen_menu_principal}
                                        source={require('../assets/ocupado.png')}
                                    />
                                <View style={menu_index.vista_numero}>
                                    <Text style={menu_index.texto_numero}> {ocupados ? ocupados : 0} </Text>
                                </View>
                            </View>

                            <View style={menu_index.espacio4}>
                                <Text style={menu_index.texto_titulo_menu}>Limpieza</Text>
                                <Image
                                        style={menu_index.imagen_menu_principal}
                                        source={require('../assets/limpieza.png')}
                                    />
                                <View style={menu_index.vista_numero}>
                                    <Text style={menu_index.texto_numero}> {limpieza ? limpieza : 0} </Text>
                                </View>
                            </View>

    
                        </View>
                        :
                        <View style={menu_index.container_accesorios}>
                                <Carousel
                                    loop
                                    width={ width * 0.870 }
                                    height={ height * 0.200}
                                    autoPlay={true}
                                    mode="parallax"
                                    data={misAccesorios}
                                    scrollAnimationDuration={1500}
                                    renderItem={({ item }, index) => (
                                        <View
                                            style={{
                                                // flex: 1,
                                                width: ( width * 0.750 ),
                                                height:( height * 0.200 ),
                                                borderRadius:20,
                                                alignItems:'flex-start',
                                                backgroundColor:'white',
                                                borderWidth:0.5,
                                                justifyContent: 'center',
                                                flexDirection:'column',

                                                borderColor:'#EEF2F5',
                                                borderRadius:5,
                                                borderColor:'#FCFCFC',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                                // alignSelf:'center',
                                            }}
                                        >
                                            <View>
                                                <Image
                                                    style={menu_index.imagen_slider_acce}
                                                    source={item.source}
                                                /> 

                                            </View>
                                                
                                            <View>
                                                    <Text style={{fontSize:17,color:'#686D76',fontWeight:'700'}}>   {item.texto}</Text>
                                                
                                            </View>

                                        


                                        </View>
                                    )}
                                />
                        </View>
                    }
                            
                    <View style={menu_index.espaciador}></View>

                    <View style={menu_index.espaciador_row}>
                        <Text style={menu_index.textoSlider}>Promociones </Text>

                        {/* <TouchableNativeFeedback  onPress={() => props.navigation.navigate("ListaOfertas")}>
                        <MaterialCommunityIcons name="pencil" size={20} color='#2B4865' />

                        </TouchableNativeFeedback> */}

                        
                    </View>

                    <View style={menu_index.slider}>
                        
                    <Carousel
                            loop
                            width={ width * 1 }
                            height={ height * 0.300}
                            autoPlay={true}
                            mode="parallax"
                            data={misImages}
                            scrollAnimationDuration={3000}
                            renderItem={({ item }, index) => (
                                <View
                                    style={{
                                        // flex: 1,
                                        width: ( width * 1 ),
                                        height:( height * 0.300 ),
                                        borderRadius:20,
                                        backgroundColor:'white',
                                        borderWidth:0.5,
                                        justifyContent: 'center',
                                        flexDirection:'column',

                                        borderColor:'#EEF2F5',
                                        borderRadius:5,
                                        borderColor:'#FCFCFC',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        alignSelf:'center',
                                    }}
                                >
                                    <View>
                                        <Image
                                            style={menu_index.imagen_slider}
                                            source={item.source}
                                        /> 

                                    </View>
                                        
                                    <View>
                                            <Text style={{fontSize:17,color:'#686D76',fontWeight:'700',top:5}}>   {item.titulo}</Text>
                                        
                                    </View>

                                    <View style={menu_index.vista_container}>

                                        <View style={menu_index.container_izquierdo} >
                                                <Text style={{fontSize:16,color:'#A6A9B6'}}> {item.detalle}</Text>
                                        </View>

                                        <View style={menu_index.container_derecho} >
                                                <Text style={{fontSize:15,fontWeight:'400'}}>{item.puntuacion}  <FontAwesome name='star' size={16} color='#F7DB6A' /> 
                                                
                                                </Text>
                                        </View>
                                    </View>


                                </View>
                            )}
                        />

                    </View>

                    {
                        estado_tipo != 1 
                        
                        ? 
                            <View style={menu_index.menu_aviso}>
                            
                                <View style={menu_index.menu_aviso_texto}>
                                    <Text style={menu_index.titulo_aviso}>¿En que te podemos ayudar?</Text>
                                <TouchableNativeFeedback  onPress={() => props.navigation.navigate("Politicas")}>
                                    <Text style={menu_index.subtitulo_aviso}>Resuelve tus dudas aquí.</Text>
                                </TouchableNativeFeedback>

                                </View>
                                <View style={menu_index.menu_aviso_img}>
                                    <Image  style={menu_index.imagen_aviso} source={require('../assets/questions.png')}></Image>
                                </View>
                            </View>


                        :
                        <View>
                            <Text>www.Atru.com</Text>
                        </View>



                    }

            </View>

        </View>
    );
}