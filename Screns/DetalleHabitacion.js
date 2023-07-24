import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,ToastAndroid } from 'react-native';
import {detalle_reserva} from '../Shared/Estilos';
import misHabitaciones from '../assets/habitaciones'
import axios from '../Shared/Axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge ,Button} from '@rneui/themed';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Carousel from 'react-native-reanimated-carousel';
import misAccesorios from '../assets/accesorios';




export default function DetalleHabitacion(props){

    const [reservacion, setReservacion] = useState([]);
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const [tipo,setTipo] = useState(props.route.params?.tipo_usuario || '');
    const [habitacionId,setHabitacionId] = useState(props.route.params?.habitacion_id || '');
    

    const [nombrehab,setNombrehab] = useState(props.route.params?.habitacion_nombre || '');
    const [numero_hab,setNumero_hab] = useState(props.route.params?.numero_habita || '');
    const [tipo_habitacion,setTipo_habitacion] = useState(props.route.params?.habitacion_tipo || '');
    const [texto_detalle,setTexto_detalle] = useState(props.route.params?.texto_detalle || '');
    const [precio,setPrecio] = useState(props.route.params?.precio || '');
    const [estado,setEstado] = useState(props.route.params?.estado || '');


    const [acceder,setAcceder] =  useState(false);
    const [cargando,setCargando] =  useState(false);


    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');
    
    // const [carouselItems, setCarouselItems] = useState<ItemProps[]>(misImages);

    const renderItem = useCallback(({ item, index }) => (
        <View
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            height: 100,
            width:300,
            // padding: 50,
            // marginLeft: 25,
            // marginRight: 25,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item.title}</Text>
          <Text>{item.text}</Text>
        </View>
      ), []);

      const listar = async () =>{
            console.log("hola",habitacionId);
            let habitacion = JSON.stringify({
                habitacion_id:habitacionId,
                
            });
            await axios({
                method: 'post',
                url: "reserva/getReservasId",
                data:habitacion,
            }).then(async function (d) {
                let datos = d.data;
                setReservacion(datos);
                console.log("soy la reserva",datos);
                
            // console.log("entrando");
            }).catch(function (error) {
                console.log(error);
                console.log("no entro");
            });
        };

      const Reservar =  async () => {
        setAcceder(true);
        // longitudes();
        var todayDate = new Date().toISOString().slice(0, 10);
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds();
        
        if(todayDate != null){
            let registro = JSON.stringify({
                habitacion_id:habitacionId,
                usuario_id:id_usuario,
                fecha_reserva:todayDate,
                precio:precio,
                monto_total:precio,
                estado:1
            });
            await axios({
            method: 'post',
            url: "reserva/agregarReserva",
            data:registro,
            }).then(async function (d) {
                console.log(d.data);
                console.log('---------------------');
                if (d.data==0) {
                    ToastAndroid.showWithGravity(
                        'Atención, ya tiene una reserva...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                }else {
                    let datos = d.data;
                    console.log("esta es mi data", datos);
                    setTimeout(() => {
                        // setUusuario(datos);
                        ToastAndroid.showWithGravity(
                            'Se solicíto la reserva con exito !',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        setAcceder(false);
                    props.navigation.navigate('Reservar');

                        // onRefresh();
                    }, 2000);
                }
            console.log("me registre !!! -----");
            }).catch(function (error) {
                console.log(error);
                ToastAndroid.showWithGravity(
                    'Atención, problema de red...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);
                // console.log("no me registre");
            });     

        }else{
            
            setAcceder(false);
            ToastAndroid.showWithGravity(
                'Atención, intentelo de nuevo...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
      };

      const Aprobar =  async () => {
        setAcceder(true);
            let reserva = JSON.stringify({
                habitacion_id:habitacionId,
                usuario_id:reservacion[0].id,
                // fecha:reservacion[0].created_at,
                estado:3
            });
            console.log(reserva);

            await axios({
            method: 'post',
            url: "reserva/aprobarReserva",
            data:reserva,
            }).then(async function (d) {
                console.log(d.data);
                console.log('---------------------');
                if (d.data==0) {
                    ToastAndroid.showWithGravity(
                        'Atención, ya tiene una reserva...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                }else {
                    let datos = d.data;
                    console.log("esta es mi data", datos);
                    setTimeout(() => {
                        // setUusuario(datos);
                        ToastAndroid.showWithGravity(
                            'Se aprobó la reserva con exito !',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        setAcceder(false);
                    props.navigation.navigate('Reservar');

                        // onRefresh();
                    }, 2000);
                }
            }).catch(function (error) {
                console.log(error);
                ToastAndroid.showWithGravity(
                    'Atención, problema de red...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);
            });     
      };

      const Cancelar =  async () => {
            setCargando(true);
            let reserva = JSON.stringify({
                habitacion_id:habitacionId,
                usuario_id:reservacion[0].id,
                estado:1
            });
            console.log(reserva);
            await axios({
            method: 'post',
            url: "reserva/rechazarReserva",
            data:reserva,
            }).then(async function (d) {
                console.log(d.data);
                console.log('---------------------');
                if (d.data==0) {
                    ToastAndroid.showWithGravity(
                        'Atención, ya tiene una reserva...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    setCargando(false);
                }else {
                    let datos = d.data;
                    console.log("esta es mi data", datos);
                    setTimeout(() => {
                        // setUusuario(datos);
                        ToastAndroid.showWithGravity(
                            'Se cancelo la reserva con exito !',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        setCargando(false);
                    props.navigation.navigate('Reservar');
                    }, 2000);
                }
            }).catch(function (error) {
                console.log(error);
                ToastAndroid.showWithGravity(
                    'Atención, problema de red...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setCargando(false);
            });     
      };

      const Completado =  async () => {
        setAcceder(true);
        // estado para habitacion
        let reserva = JSON.stringify({
            habitacion_id:habitacionId,
            usuario_id:reservacion[0].id,
            estado:4
        });
        console.log(reserva);
        await axios({
        method: 'post',
        url: "reserva/reservaCompletada",
        data:reserva,
        }).then(async function (d) {
            console.log(d.data);
            console.log('---------------------');
            if (d.data==0) {
                ToastAndroid.showWithGravity(
                    'Atención, ya tiene una reserva...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);
            }else {
                let datos = d.data;
                console.log("esta es mi data", datos);
                setTimeout(() => {
                    // setUusuario(datos);
                    ToastAndroid.showWithGravity(
                        'Se ha completado la reserva con exito !',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                props.navigation.navigate('Reservar');
                }, 2000);
            }
        }).catch(function (error) {
            console.log(error);
            ToastAndroid.showWithGravity(
                'Atención, problema de red...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            setAcceder(false);
        });     
      };

      const Habilitar =  async () => {

        setAcceder(true);
        let reserva = JSON.stringify({
            habitacion_id:habitacionId,
            // usuario_id:reservacion[0].id,
            estado:1
        });
        console.log(reserva);
        await axios({
        method: 'post',
        url: "reserva/habilitarHabitacion",
        data:reserva,
        }).then(async function (d) {
            console.log(d.data);
            console.log('---------------------');
            if (d.data==0) {
                ToastAndroid.showWithGravity(
                    'Atención, ya tiene una reserva...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);
            }else {
                let datos = d.data;
                console.log("esta es mi data", datos);
                setTimeout(() => {
                    // setUusuario(datos);
                    ToastAndroid.showWithGravity(
                        'Se habilito la habitación !',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                props.navigation.navigate('Reservar');
                }, 2000);
            }
        }).catch(function (error) {
            console.log(error);
            ToastAndroid.showWithGravity(
                'Atención, problema de red...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            setAcceder(false);
        });     
      };
   

      useEffect(() => {
        listar();
      }, []);


   

    return(
     
    <View style={detalle_reserva.contenedor}>
            <StatusBar
                backgroundColor="#FCFCFC"
                barStyle="dark-content"
            />
           
            <View style={detalle_reserva.contenedor_menu}>
                <Image
                    style={detalle_reserva.foto_habitacion}
                    source={misHabitaciones[numero_hab]  ? (misHabitaciones[numero_hab].source) : misHabitaciones.default.source}
                    // source={require('../assets/logi.png')}
                />
            </View>

            <View style={detalle_reserva.espaciador}></View> 


            <View style={detalle_reserva.contenedor_scroll}>
             
                <View style={detalle_reserva.contenedor_vista1}>

                    <View style={detalle_reserva.contenedor_lado1}>
                    
                    <Text style={detalle_reserva.subtitulos}>{nombrehab}</Text>
                    </View>

                    <View style={detalle_reserva.contenedor_lado2}>
                        <FontAwesome name='star' size={16} color='#FFBE00' /> 
                        <FontAwesome name='star' size={16} color='#FFBE00' /> 
                        <FontAwesome name='star' size={16} color='#FFBE00' /> 
                        <FontAwesome name='star' size={16} color='#D8D8D8' /> 
                        <FontAwesome name='star' size={16} color='#D8D8D8' />
                    </View>
                </View>
                <View style={detalle_reserva.contenedor_vista2}>

                 <Text style={detalle_reserva.precio}>S/{precio}</Text>
                 {
                    estado == 1 ?
                    <Badge value='Disponible'  status="success" /> 
                    :
                    estado == 2 ?
                    <Badge value='Solicitado'  status="" badgeStyle={{backgroundColor:'#9772FB'}} /> 
                    :
                    estado == 3 ?
                    <Badge value='Ocupado'  status="primary" /> 
                    :
                    <Badge value='Limpieza'  status="" badgeStyle={{backgroundColor:'#FF8D29'}} /> 


                 }
                </View>

                <View style={detalle_reserva.contenedor_vista3}>
                        <Text style={detalle_reserva.informacion}>{texto_detalle}</Text>
                </View>
                
                <View style={detalle_reserva.contenedor_vista4}>

                     <View style={detalle_reserva.contenedor_izquierdo}>
                            <Ionicons name='bed-outline' size={27} color='#2B302D' />  
                      </View>
                      <View style={detalle_reserva.contenedor_izquierdo}>
                            <Ionicons name='tv' size={27} color='#2B302D' />  
                      </View>
                      <View style={detalle_reserva.contenedor_izquierdo}>
                            <FontAwesome name='shower' size={27} color='#2B302D' />  
                      </View>
                      {/* <View style={detalle_reserva.contenedor_izquierdo}>
                            <Ionicons name='bed-outline' size={27} color='#5F6F94' />  
                      </View> */}
                      <View style={detalle_reserva.contenedor_izquierdo}>
                            <Ionicons name='wifi-outline' size={27} color='#2B302D' />  
                      </View>

                      <View style={detalle_reserva.contenedor_izquierdo}>
                            <MaterialCommunityIcons name='air-filter' size={27} color='#2B302D' />  
                      </View>
                </View>



            </View>

            {/* <View style={detalle_reserva.espaciador}></View>  */}
               
            <View style={detalle_reserva.cuadro_slider}>
                
                    <Carousel
                        width={ width * 0.800 }
                        height={ height * 0.200}
                        autoPlay={true}
                        mode="parallax"
                        data={misAccesorios}
                        scrollAnimationDuration={3000}
                        renderItem={({ item }, index) => (
                            <View
                                style={{
                                    // flex: 1,
                                    width: ( width * 0.700 ),
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
                                        style={detalle_reserva.imagen_slider}
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

            <View style={detalle_reserva.espaciador}></View> 


            {
                tipo == 2 ?

                    <View>
                        {
                            estado == 1 ?
                                    <Button 
                                    title="Reservar"
                                    loading={acceder}
                                    icon={{
                                        name: 'calendar-plus-o',
                                        type: 'font-awesome',
                                        size: 17,
                                        color: 'white',
                                    }}
                                    // loading={acceder}
                                    titleStyle={{ fontWeight: '400', fontSize: 19 }}
                                    buttonStyle={{
                                        width:350,
                                        backgroundColor:'#52C41A',
                                        borderRadius: 5,
                                        height:55,  
                    
                                    }}  onPress={()=>{Reservar()}}/>
                            :
                            estado == 2 ?
                                    <Button 
                                    title="Pendiente"
                                    icon={{
                                        name: 'spinner',
                                        type: 'font-awesome',
                                        size: 17,
                                        color: 'white',
                                    }}
                                    // loading={acceder}
                                    titleStyle={{ fontWeight: '400', fontSize: 19 }}
                                    buttonStyle={{
                                        width:350,
                                        backgroundColor:'#C1AEFC',
                                        borderRadius: 5,
                                        height:55,  
                    
                                    }}  onPress={()=>{}}/>
                            :

                            estado == 3 ?

                                    <Button 
                                    title="Reservado"
                                    icon={{
                                        name: 'check',
                                        type: 'font-awesome',
                                        size: 17,
                                        color: 'white',
                                    }}
                                    loading={acceder}
                                    titleStyle={{ fontWeight: '400', fontSize: 19 }}
                                    buttonStyle={{
                                        width:350,
                                        backgroundColor:'#5CB8E4',
                                        borderRadius: 5,
                                        height:55,  
                    
                                    }}  onPress={()=>{}}/> 
                             :
                                    <Button 
                                    title="Limpieza"
                                    icon={{
                                        name: 'hourglass-o',
                                        type: 'font-awesome',
                                        size: 17,
                                        color: 'white',
                                    }}
                                    loading={acceder}
                                    titleStyle={{ fontWeight: '400', fontSize: 19 }}
                                    buttonStyle={{
                                        width:350,
                                        backgroundColor:'#FFDCA9',
                                        borderRadius: 5,
                                        height:55,  
                    
                                    }}  onPress={()=>{}}/> 

                        }
                    
                    </View>

                :

                    estado == 1 ?

                        <View style={detalle_reserva.contenedor_botones}>

                               <Text>- Habitación Disponible -</Text>
                        
                        </View>
                    :
                    estado == 2 ?
                    
                        <View style={detalle_reserva.contenedor_botones}>
                            <Button 
                                title="Cancelar"
                                loading={cargando}
                                icon={{
                                    name: 'remove',
                                    type: 'font-awesome',
                                    size: 17,
                                    color: 'white',
                                }}
                                // loading={acceder}
                                titleStyle={{ fontWeight: '400', fontSize: 17 }}
                                buttonStyle={{
                                    width:width * 0.450,
                                    backgroundColor:'#FF6464', //E96479
                                    borderRadius: 5,
                                    height:55,  
                
                                }}  onPress={()=>{Cancelar()}}/>

                            <Button 
                                title="Aceptar"
                                loading={acceder}
                                icon={{
                                    name: 'check',
                                    type: 'font-awesome',
                                    size: 17,
                                    color: 'white',
                                }}
                                // loading={acceder}
                                titleStyle={{ fontWeight: '400', fontSize: 17 }}
                                buttonStyle={{
                                    width:width * 0.450,
                                    backgroundColor:'#52C41A',
                                    borderRadius: 5,
                                    height:55,  
                
                                }}  onPress={()=>{Aprobar()}}/>
                                
                        </View>
                    :
                    estado == 3 ?
                        <View style={detalle_reserva.contenedor_botones}>
                            <Button 
                                title="Completado"
                                loading={acceder}
                                icon={{
                                    name: 'history',
                                    type: 'font-awesome',
                                    size: 17,
                                    color: 'white',
                                }}
                                // loading={acceder}
                                titleStyle={{ fontWeight: '400', fontSize: 17 }}
                                buttonStyle={{
                                    width:width * 0.900,
                                    backgroundColor:'#3C79F5', //E96479
                                    borderRadius: 5,
                                    height:55,  
                
                                }}  onPress={()=>{Completado()}}/>
                            
                        </View>
                    :
                        <View style={detalle_reserva.contenedor_botones}>
                            <Button 
                                title="Habilitar"
                                loading={acceder}
                                icon={{
                                    name: 'toggle-on',
                                    type: 'font-awesome',
                                    size: 17,
                                    color: 'white',
                                }}
                                // loading={acceder}
                                titleStyle={{ fontWeight: '400', fontSize: 17 }}
                                buttonStyle={{
                                    width:width * 0.900,
                                    backgroundColor:'#03C988', //E96479
                                    borderRadius: 5,
                                    height:55,  
                
                                }}  onPress={()=>{Habilitar()}}/>
                        
                        </View>

            }

            

        </View>
    );
}