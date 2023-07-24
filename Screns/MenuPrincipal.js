import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { SafeAreaProvider, Text, View , Image, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Button , LinearProgress,  ListItem } from '@rneui/themed';
import axios from '../Shared/Axios';
import { useIsFocused } from "@react-navigation/native"; 
import { BottomSheet } from 'react-native-btr';
import {menu_index} from '../Shared/Estilos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import misImages from '../assets/imagenes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
let urlBase = 'http://192.168.18.30:82/Php_Hotel/uploads/imagen/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Avisos from './Avisos';
// import { ScrollView } from 'react-native-gesture-handler';

export default function MenuPrincipal(props){

    const [visible, setVisible] = useState(false);
    const [menuControl, setMenuControl] = useState('menu');


    const toggleBottomNavigationView = () => {
        setMenuControl('menu-open');
        setVisible(true);
    };
    
    const Close = () => {
        setVisible(false);
        setMenuControl('menu');
    };
 
    const Tab = createBottomTabNavigator();
    const [usuario,setUsuario] = useState(props.route.params?.nombreUsuario || '');
    const [estado_tipo,setTipo] = useState(props.route.params?.tipo || '');
    const [id,setId] = useState(props.route.params?.id_usuario || '');
    const [image, setImage] = useState(null);
    // const [sesion, setSesion] = useState({});
    const [noti,setNoti] = useState(0);
    const [progress, setProgress] = useState(0);
    const [refresh, setRefresh] = useState((new Date()));
    const focus = useIsFocused(); 
    const backAction = () => {
        Alert.alert('Cerrar sesión!', '¿ Seguro que desea salir ? ', [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Si', onPress: (c) =>  {Close(),props.navigation.push('Login')} },
        ]);
        return true;
        backHandler.remove();

    };
    const listarAlertas = async () => {
        await axios({
            method: 'get',
            url: "alertas/getAlertasActivas",
            data:null,
        }).then(async function (d) {
            let datos = d.data;   
            // console.log(datos.length);
            setNoti(datos.length);
            // var result=[];
            // datos.forEach(function(element) {
            //     result.push(element.nombre_alerta);
            // });
            // setAlertas(result);            
        //   console.log("entrando");
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    }
    const traerData = async () => {
        let datos_sesion = await AsyncStorage.getItem('@asistencias');
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

    useEffect(() => {
        traerData();
        listarAlertas();
        if(focus == true){ // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
            listarAlertas();
            Close();
         }
    
      }, [focus,refresh]);

    return(
        <View style={menu_index.contenedor}>
        <StatusBar backgroundColor="#FCFCFC" barStyle="light-content" />

        <View style={menu_index.espaciador}></View>

        <View style={menu_index.detalle_usuario}>
            <View style={menu_index.fila1}>
                <View style={menu_index.detalle_usuario_c2}>
                    <MaterialCommunityIcons name={menuControl} size={34} color='#000' onPress={toggleBottomNavigationView} />
                </View>
                <View style={menu_index.detalle_usuario_c1}>
                    <TouchableOpacity   onPress={() => props.navigation.navigate("Menu_perfil", {id_usuario:id} ) }>
                        {
                            image == null ?
                                <Image  style={menu_index.imagen_logo} source={require('../assets/avatar.jpg')}></Image>
                            :
                            <Image source={{ uri:urlBase+image }} style={menu_index.imagen_logo} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={menu_index.fila2}>
                <View style={menu_index.detalle_usuario_c3}>
                    <Text style={menu_index.titulo}>Hola 😉, </Text>
                    <Text style={menu_index.subtitulo}>{usuario}</Text>
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
                        <TouchableOpacity style={menu_index.botonesMenu} onPress={() => props.navigation.navigate("Menu_perfil", {id_usuario:id} ) }>
                                <Feather name='user' size={24} color='#2E86C6' style={{marginLeft:10}} />
                                <Text style={menu_index.textoMenu}>Mi perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  style={menu_index.botonesMenuC}   
                                onPress={()=>{
                                    Close,
                                    Alert.alert(
                                        'Cerrar sesión',
                                        '¿Seguro que desea salir?',
                                        [
                                        { text: 'No', style:'destructive' },
                                        { text: 'SALIR', onPress: () => { AsyncStorage.removeItem('@asistencias'), props.navigation.push('Login') } },                              
                                        ],
                                        { cancelable: false }
                                    )
                                }}> 
                                <Feather name='log-out' size={24} color='#FF6464' style={{marginLeft:10}} />
                                <Text style={menu_index.textoMenuR}>Cerrar sesión</Text>
                        </TouchableOpacity>
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
                                        <TouchableOpacity
                                            onPress={() => props.navigation.navigate("Marcar_asistencia", {id_usuario:id} )}
                                        >
                                            <Image
                                                style={menu_index.imagen_menu}
                                                source={require('../assets/calendar.png')}
                                            />
                                            <Text style={menu_index.buttonText}>Marcar</Text>
                                        </TouchableOpacity>
                                    
                                    </View>

                                    <View style={menu_index.contorno_img}>
                                        <TouchableOpacity
                                            onPress={() => props.navigation.navigate("Avisos" )}

                                        >
                                            <Image
                                                style={menu_index.imagen_menu}
                                                source={require('../assets/avisos.png')}
                                            />
                                            <Text style={menu_index.buttonText}>Crear</Text>
                                            <Text style={menu_index.buttonText}>Aviso</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View style={menu_index.contorno_img}>

                                        <TouchableOpacity
                                        onPress={() => props.navigation.navigate("Listado")}

                                        >
                                        <Image
                                            style={menu_index.imagen_menu}
                                            source={require('../assets/general.png')}
                                        />
                                        <Text style={menu_index.buttonText}>Listado</Text>
                                        <Text style={menu_index.buttonText}>General</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View style={menu_index.contorno_img}>

                                        <TouchableOpacity
                                            style={menu_index.buttonLg}
                                            onPress={() => props.navigation.navigate("Alertas")}
                                            >
                                            <Image
                                                style={menu_index.imagen_menu}
                                                source={require('../assets/faro.png')}
                                            />
                                            <Text style={menu_index.buttonText}>Alertas</Text>
                                        </TouchableOpacity>
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
                                    <TouchableOpacity
                                            onPress={() => props.navigation.navigate("Marcar_asistencia", {id_usuario:id} )}
                                    >
                                        <Image
                                            style={menu_index.imagen_menu}
                                            source={require('../assets/calendar.png')}
                                        />
                                        <Text style={menu_index.buttonText}>Marcar</Text>

                                    </TouchableOpacity>
                                </View>

                                <View style={menu_index.contorno_img}>
                                    <TouchableOpacity
                                            onPress={() => props.navigation.navigate("Avisos", {id_usuario:id} )}

                                    >
                                        <Image
                                            style={menu_index.imagen_menu}
                                            source={require('../assets/avisos.png')}
                                        />
                                        <Text style={menu_index.buttonText}>Avisos</Text>

                                    </TouchableOpacity>
                                    <Badge
                                            status="primary"
                                            value={noti}
                                            containerStyle={{ position: 'absolute', top:0, left: 50 }}
                                    />
                                </View>
                                
                                <View style={menu_index.contorno_img}>

                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate("Listado" , {id_usuario:id} )}

                                    >
                                    <Image
                                        style={menu_index.imagen_menu}
                                        source={require('../assets/history.png')}
                                    />
                                    {/* <Text style={menu_index.buttonText}>Ver</Text> */}
                                    <Text style={menu_index.buttonText}>Record</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={menu_index.contorno_img}>

                                    <TouchableOpacity
                                        style={menu_index.buttonLg}
                                            onPress={() => props.navigation.navigate("Alertas" , {id_usuario:id} )}
                                        >
                                        <Image
                                            style={menu_index.imagen_menu}
                                            source={require('../assets/faro.png')}
                                        />
                                        <Text style={menu_index.buttonText}>Alertar</Text>
                                    </TouchableOpacity>
                            
                                </View>
                            </View>
                    }
                </View>

                <View style={menu_index.menu_central}>

                {/* <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width * 0.850} // from react-native
                    height={200}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                /> */}
                    <LineChart
                        data={data}
                        style={{borderRadius:20 }}
                        width={Dimensions.get('window').width * 0.950 }
                        height={200}
                        chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#7B8FA1",
                                backgroundGradientTo: "#567189",
                                
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 6,
                                },
                        }}
                        />

                {/* <View>
                    <Avatar
                        rounded
                        source={{
                        uri: 'https://randomuser.me/api/portraits/women/40.jpg',
                        }}
                        size="large"
                    />
                    <Badge
                        status="primary"
                        value={10}
                        containerStyle={{ position: 'absolute', top: 5, left: 60 }}
                    />
                </View> */}
                </View>

                <View style={menu_index.slider}>
                <Text style={menu_index.textoSlider}>Beneficios y descuentos :</Text>
                <Carousel
                    loop
                    width={370}
                    height={140}
                    autoPlay={true}
                    mode="parallax"
                    data={misImages}
                    scrollAnimationDuration={3000}
                    renderItem={({ item }, index) => (
                        <View
                            style={{
                                flex: 1,
                                borderRadius:20,
                                // borderWidth: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                style={menu_index.imagen_slider}
                                source={item.source}
                            /> 
                        </View>
                    )}
                />

                </View>

                {/* <View>
                <Text style={menu_index.textoSlider}>Beneficios y descuentos :</Text>
                </View> */}
                {/* <View style={menu_index.espaciador}></View> */}
                <View style={menu_index.espaciador}></View>
                <View style={menu_index.espaciador}></View>



                <View style={menu_index.menu_aviso}>
                  
                    <View style={menu_index.menu_aviso_texto}>
                        <Text style={menu_index.titulo_aviso}>¿En que te podemos ayudar?</Text>
                        <Text style={menu_index.subtitulo_aviso}>Resuelve tus dudas aquí</Text>
                    </View>
                    <View style={menu_index.menu_aviso_img}>
                        <Image  style={menu_index.imagen_aviso} source={require('../assets/questions.png')}></Image>
                    </View>
                </View>

        </View>

    </View>
    );
}