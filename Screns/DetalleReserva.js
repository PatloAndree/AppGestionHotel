import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {detalle_Reserva} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Badge, Button } from '@rneui/themed';
// const wait = timeout => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

export default function DetalleReserva(props){

    const [usuario, setUusuario] = useState([]);
    const [perfil,setPerfil] = useState(props.route.params?.perfil || '');
    const [id_alerta,setIdAlerta] = useState(props.route.params?.id_alerta || '');
    const [leido,setLeido] = useState(props.route.params?.leido || '');
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');

    const [nombres,setnombres] = useState(props.route.params?.nombres || '');
    const [fecha,setfecha] = useState(props.route.params?.fecha || '');
    const [habitacion,sethabitacion] = useState(props.route.params?.habitacion_nombre || '');
    const [habitacion_numero,sethabitacion_numero] = useState(props.route.params?.habitacion_numero || '');
    const [precio,setPrecio] = useState(props.route.params?.precio || '');
    const [dni,setDni] = useState(props.route.params?.dni || '');
    const [correo,setCorreo] = useState(props.route.params?.correo || '');
    const [estado,setEstado] = useState(props.route.params?.estado || '');


    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');
    const [acceder,setAcceder] =  useState(false);

    const desactivarAlerta = async (user_id) => {
        setAcceder(true);
        const registro = JSON.stringify({
            alerta_id:user_id
          });
        await axios({
            method:'post',
            url: "alertas/getDesactivarAlertas",
            data:registro,
          }).then(async function (d) {
            setTimeout(() => {
                ToastAndroid.showWithGravity(
                    'Se atendio la alerta con exito !',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                props.navigation.navigate('Alertas',{ruta_imagen:""});
                setAcceder(false);
            }, 3000);

          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
              setAcceder(false);

          });
    }

    return(
     
    <View style={detalle_Reserva.contenedor}>
            <StatusBar
                backgroundColor="#FCFCFC"
                barStyle="dark-content"
            />
            <View style={detalle_Reserva.espaciador}>

            </View>

            <View style={detalle_Reserva.contenedor_menu}>
                {/* <View  style={detalle_Reserva.cuerpo_titulo}>
                    <Text style={detalle_Reserva.titulo}>Habitación - 203 </Text>
                </View> */}

                <View  style={detalle_Reserva.cuerpo_detalle}>
                    <View style={detalle_Reserva.cuerpo_texto}>
                        <View style={detalle_Reserva.cuerpo_izquierdo}>

                                <Text> Habitación N°  {habitacion_numero} </Text>

                              
                                <Text> Estado  
                                    {
                                        estado == 1 ?
                                        <Badge value="Solicitado"  status=""  badgeStyle={{ backgroundColor:'#30A2FF'}} /> 
                                        :
                                        estado == 2 ?
                                        
                                        <Badge value="Aprobado"  status="primary"  /> 
                                        :
                                        estado == 3 ?
                                        <Badge value="Cancelado"  status="error" /> 
                                        :
                                        <Badge value="Completado"  status=""  badgeStyle={{backgroundColor:'#1B9C85'}} /> 



                                    }
                                    </Text> 

                                        <Text><Feather name='user' size={20} color='#213555' /> {nombres}</Text>

                                        <Text><FontAwesome name='vcard-o' size={20} color='#213555' /> {dni != "" ? dni : " - - - - - "} </Text>

                                        <Text><Ionicons name='mail-outline' size={20} color='#213555' /> {correo}</Text>


                                        <Text><Ionicons name='md-calendar-sharp' size={20} color='#213555' /> {fecha} </Text>

                                        <Text><Ionicons name='bed-outline' size={20} color='#213555' /> {habitacion} </Text>
                                        

                                        <Text><FontAwesome name='money' size={20} color='#213555' /> S/{precio} </Text>



                                <Text> </Text>

                                {/* <Text>Leido: </Text> */}

                        </View>
                        {/* 
                        <View style={detalle_Reserva.cuerpo_derecho}>

                            <Text> {nombres}</Text>

                            <Text> {fecha}</Text>

                            <Text>{habitacion} </Text>

                            <Text>{alerta}  </Text>

                            

                        </View> */}
                    </View>
                  

                    {/* <View style={detalle_Reserva.espaciador}></View> */}

                    <View  style={detalle_Reserva.cuerpo_imagen}>
                        <Image  style={detalle_Reserva.iamgen_medida} source={require('../assets/foto_espera.png')}></Image>
                      
                    </View>
                </View>


                {/* <View style={detalle_Reserva.espaciador}></View> */}

              

               
            </View>
   
    </View>
    );
}