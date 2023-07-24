import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ScrollView,StyleSheet ,RefreshControl,Text, View,Image,Dimensions,TextInput,TouchableNativeFeedback, ToastAndroid,FlatList,BackHandler } from 'react-native';
import {marcar_asistencia} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import misHabitaciones from '../assets/habitaciones'
import { Badge, Button, Icon  } from '@rneui/themed';
import { useIsFocused } from "@react-navigation/native"; 


const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };


export default function Reservar(props){

    const [usuario, setUusuario] = useState([]);
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const [tipo,setTipo] = useState(props.route.params?.tipo || '');

    const [currentDate, setCurrentDate] = useState('');
    const [marcado, setMarcado] = useState(0);
    const [acceder,setAcceder] =  useState(false);
    const [loading,setLoading] =  useState(false);
    const [cargando,setCargando] =  useState(false);
    const [ubicacionGPS, setUbicacionGPS] = useState(null);
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('18:00:00');
    const [habitaciones, setHabitaciones] = useState([]); //POR ID


    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState((new Date()));
    const onRefresh = useCallback(() => {
        setRefreshing(true);
       setTimeout(() => {
        listarHabitaciones(),  setRefreshing(false)
       }, 1000);
        // wait(3000).then(() =>, refresh);
    }, []);
    const focus = useIsFocused(); 

    const listarHabitaciones = async () =>{
      await axios({
          method: 'get',
          url: "habitaciones/getHabitaciones",
          data:null,
        }).then(async function (d) {
          let datos = d.data;
        //   console.log(datos);
        setHabitaciones(datos);
        //   console.log(habitaciones) ;        

        console.log("entrando");
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    };

    useEffect(() => {
   
        onRefresh();
        listarHabitaciones();
 
        if(focus == true){ // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
            listarHabitaciones();
         }
    }, [refresh,focus]);

    return(
     
    <View style={marcar_asistencia.containerLogin} >

            <StatusBar
                backgroundColor="#ffff"
                barStyle="dark-content"
            />
            <View style={marcar_asistencia.espaciador}></View>


            <View style={marcar_asistencia.cuadro_biendenida}>
                <View style={marcar_asistencia.icono}>
                            <Image
                                style={marcar_asistencia.foto_icono}
                                source={require('../assets/logi.png')}
                            />

                </View>
                {/* <Text style={marcar_asistencia.fecha_texto}>{currentDate}</Text> */}

                <View style={marcar_asistencia.guia}>
                    <View style={marcar_asistencia.guia_asistencia}>
                        <Text> Indicadores</Text>
                    </View>

                    <View style={marcar_asistencia.guia_asistencia}>


                        {/* <Badge value=""  status="success" /> */}
                        <Text> <Badge value="" status="success" /> Disponible</Text>
                        <Text>       <Badge value="" status="primary" /> Ocupado</Text>

                    </View>
                    <View style={marcar_asistencia.guia_asistencia}>
                        {/* <Badge value=""  status="success" /> */}
                        <Text>  <Badge value=""  badgeStyle={{backgroundColor:'#FF8D29'}} /> Limpieza</Text>
                        <Text>           <Badge value="" badgeStyle={{backgroundColor:'#9772FB'}} /> Solicitado</Text>
                    </View>
                </View>

                <View style={marcar_asistencia.mensaje}>
                            <Image
                                style={marcar_asistencia.foto_icono}
                                source={require('../assets/h.png')}
                            />

                </View>
            </View>

    

            <View style={marcar_asistencia.espaciador2}>
                {/* <Text style={marcar_asistencia.text_espaciador}>Que tengas un excelente dia! 🤗</Text> */}
            </View>

                <View style={marcar_asistencia.cuerpo_principal}>
                    {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> */}
                        {/* { */}

                        <FlatList
                            data={habitaciones}
                            showsVerticalScrollIndicator
                            renderItem={({item}) => (
                                // <TouchableNativeFeedback onPress={ () => {desactivarAlerta(item.id)}}>
                                <TouchableNativeFeedback onPress={() => props.navigation.navigate("DetalleHabitacion", {id_usuario:id_usuario,habitacion_id:item.id,numero_habita:item.numero_habitacion,
                                habitacion_nombre:item.nombre_habitacion,habitacion_tipo:item.tipo_habitacion, texto_detalle:item.detalle_habitacion,precio:item.precio, estado:item.estado,tipo_usuario:tipo} )}>
                                     
                                    <View style={marcar_asistencia.cuerpo_habitacion}>
                                    <Image
                                        style={marcar_asistencia.foto_habitacion}
                                        source={misHabitaciones[item.numero_habitacion]  ? (misHabitaciones[item.numero_habitacion].source) : misHabitaciones.default.source}
                                        // source={require('../assets/logi.png')}
                                    />
                                    <View style={marcar_asistencia.container_precio}>
                                        <View style={marcar_asistencia.detalle_nombre}>
                                            <Text > 
                                                {item.numero_habitacion} -  {item.nombre_habitacion}
                                            </Text>
                                           
                                        </View>

                                        <View style={marcar_asistencia.detalle_precio}>
                                            <Text style={marcar_asistencia.texto_precio}> 
                                                S/{item.precio}
                                            </Text>
                                            <Text>
                                            {   item.estado == 1 
                                                ? 
                                                    <FontAwesome name='circle' size={17} color='#52C41A' />
                                                    
                                                : 
                                                item.estado == 2 
                                                
                                                ?                                              
                                                
                                                    <FontAwesome name='circle' size={17} color='#9772FB' />

                                                : 
                                                item.estado == 3 
                                                
                                                ?

                                                    <FontAwesome name='circle' size={17} color='#2089DC' />

                                                :
                                              
                                                    <FontAwesome name='circle' size={17} color='#FF8D29' />

                                            }
                                            </Text>
                                        </View>
                                    </View>
                            </View>
                                </TouchableNativeFeedback>
                            
                            )}
                            //Setting the number of column
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                        />
                        {/* } */}
                    {/* </ScrollView> */}
                </View>

        <View style={marcar_asistencia.espaciador}></View>
        
    </View>
 
    );
}

