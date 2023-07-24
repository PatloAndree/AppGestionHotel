import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid,TouchableNativeFeedback } from 'react-native';
import { ListItem } from '@rneui/themed';
import {mis_alertas} from '../Shared/Estilos';
import { useIsFocused } from "@react-navigation/native"; 

import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown'
import { Tab , TabView , Button, Badge } from '@rneui/themed';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Alertas(props){

    const [alertas, setAlertas] = useState([]);
    const [alertasNotificaciones, setAlertasNotificaciones] = useState([]); //POR ID
    const [alertasNotificas, setAlertasNotificas] = useState([]); //EN GENERAL
    const dropdownRef = useRef({});  
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const [perfil,setPerfil] = useState(props.route.params?.tipo_perfil || '');
    const [reserva_actual,setReservaActual] = useState('');
    const [habitacion_actual,setHabitacion_actual] = useState('');

    // console.log("hola soy el id " , id_usuario);
    // const [imagen_prev,setImagen_prev] = useState(props.route.params?.ruta_imagen || '');

    const [imageUri, setImageUri] = useState(0);
    const focus = useIsFocused(); 
    const [mensaje, setMensaje] = useState('');
    const [acceder,setAcceder] =  useState(false);
    const [tipo_alerta, setTipoAlerta] = useState('');
    const [index, setIndex] = useState(1);
    const [variante, setVariante] = useState('Seleccionar');
    const [campana, setCampana] = useState('bell');
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState((new Date()));

    const onRefreshAll = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setRefresh((new Date()));
        }, 2000);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // wait(5000).then(() => 
        setTimeout(() => {
            listarPorId(),  setRefreshing(false);
          ToastAndroid.showWithGravity(
            'Datos actualizados....',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );

        }, 2000);
    }, []);

    const onRefresh2 = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        listarAlertas(),  setRefreshing(false);
        ToastAndroid.showWithGravity(
          'Datos actualizados....',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      
      }, 200);

    }, []);

    
    const listarReserva = async () =>{
        let habitacion = JSON.stringify({
            usuario_id:id_usuario,
        });
        await axios({
            method: 'post',
            url: "reserva/getReservaId",
            data:habitacion,
        }).then(async function (d) {
            let datos = d.data;
            console.log("soy datos lindo",datos);
         
            if(datos == 0){
                setReservaActual("0");
            }else{
                setReservaActual(datos);
                setHabitacion_actual(datos[0].id);
            }
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    };


    const desactivarAlerta = async (user_id) => {
        // console.log(user_id)
        const registro = JSON.stringify({
            alerta_id:user_id
          });
        await axios({
            method:'post',
            url: "alertas/getDesactivarAlertas",
            data:registro,
          }).then(async function (d) {
            // let datos = d.data;   
            // setAlertasNotificas(datos);   
            onRefresh2();
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    }

    const listar = async () =>{
        await axios({
            method: 'get',
            url: "alertas/getAlertas",
            data:null,
          }).then(async function (d) {
            let datos = d.data;   
            var result=[];
            datos.forEach(function(element) {
                result.push(element.nombre_alerta);
            });
            setAlertas(result);            
        //   console.log("entrando");
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    };

    const listarAlertas = async () =>{
        await axios({
            method:'get',
            url: "alertas/getNotificacionesAlertas",
            data:null,
          }).then(async function (d) {
            let datos = d.data;   
            
            setAlertasNotificas(datos);   
        //   console.log("entrando");
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    };

    const listarAlertasId = async () =>{
        await axios({
            method:'get',
            url: "alertas/getNotificacionesAlertas",
            data:null,
          }).then(async function (d) {
            let datos = d.data;   
            console.log(datos);
            setAlertasNotificas(datos);   
        //   console.log("entrando");
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    };

    const grabarAlerta = async () =>{
        if(reserva_actual != '0'){
            if(mensaje!=""){
                setAcceder(true);
                var todayDate = new Date().toISOString().slice(0, 10);

                const form = new FormData();
                form.append("usuario",id_usuario);
                form.append("tipoalerta",tipo_alerta);
                form.append("message",mensaje);
                form.append("fecha",todayDate);
                form.append("habitacion",habitacion_actual);

                if(ruta_imagen != ""){
                    form.append("foto",{
                        uri: ruta_imagen,
                        type: 'image/jpeg',
                        name: ruta_imagen.substring(ruta_imagen.lastIndexOf('/') + 1,ruta_imagen.length)
                    })
                    console.log(form);
                }
                await axios({
                    method: 'post',
                    url: "alertas/agregarAlerta",
                    data:form,
                    timeout:  1000,
                    headers: { "Content-Type": "multipart/form-data" } 
                
                }).then(async function (d) {
                    // let datos = d.data;   
                    // console.log("datos");
                    setTimeout(() => {
                        ToastAndroid.showWithGravity(
                            'Se registro tu alerta con exito !',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        );
                        setAcceder(false);
                        setMensaje('');
                        setImageUri(1);
                        dropdownRef.current.reset();
                    }, 3000);
        
                }).catch(function (error) {
                    console.log(error);
                    ToastAndroid.showWithGravity(
                        'Ocurrio un error, intentelo de nuevo !',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                    console.log("no entro");
                });
            }else{
                ToastAndroid.showWithGravity(
                    'Complete los campos por favor...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);
            }
        }else{
            ToastAndroid.showWithGravity(
                'No tiene ninguna reserva...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            setAcceder(false);
        }
    };

    const listarPorId = async () =>{
        const registro = JSON.stringify({
          usuario:id_usuario
        });
      await axios({
          method: 'post',
          url: "alertas/getNotificacionesAlertasPorId",
          data:registro,
        }).then(async function (d) {
          let datos = d.data;
        //   console.log(datos);
          setAlertasNotificaciones(datos);
          console.log("soyporId") ;        

        console.log("entrando");
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
    };

    useEffect(() => {
        console.log(id_usuario);
        
        if(id_usuario != "" ){
            listar();
            listarPorId();
            listarReserva();
        }else{
            listarAlertas();
            listar();
        }
        if(focus == true){ // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
            setImageUri(0);

         }

    }, [focus,refresh]);

    return(
        id_usuario != "" ?
            <>
                <Tab
                    value={index}
                    onChange={(e) => setIndex(e)}
                    indicatorStyle={{
                        backgroundColor:'#ffff',
                        borderBottomWidth:.6,
                        borderBottomColor:'#1597E5',
                        height:8,
                    }}
                    style={{backgroundColor:'#1597E5',borderTopEndRadius:20, borderTopStartRadius:20 }}
                    variant="primary"
                    >
                    <Tab.Item
                        title="Mis Alertas"
                        titleStyle={{ fontSize: 15,  color:'#ffff' , fontWeight:'700'}}
                        icon={{ name: 'md-alert-circle', type: 'ionicon', color: 'white',  size:25  }}
                    />
                      <Tab.Item
                        title="Alertar"
                        titleStyle={{ fontSize: 15 , color:'#ffff', fontWeight:'700'}}
                        style={{ borderRightWidth:1, borderColor:'green'}}
                        icon={{ name: 'ios-warning', type: 'ionicon', color: 'white', size:25 }}
                    />
                </Tab>

                <TabView value={index} onChange={setIndex} animationType="spring">
                   
                    <TabView.Item style={mis_alertas.alertas}>
                        {
                            alertasNotificaciones == "" ?  //ese ID TIENE DATA

                                <View style={mis_alertas.containerLogin}>
                                    <Text>Aún no tienes alertas</Text>
                                </View>
                            :

                                <View  style={mis_alertas.containerLogin}>
                                    <View style={mis_alertas.espaciador}></View>

                                    {/* <View style={mis_alertas.espaciador}></View> */}
                                        {/* <Text>Lista de alertas </Text> */}
                                    
                                    <View style={mis_alertas.espaciador}></View>

                                    <View style={mis_alertas.cuerpo_principal}>
                                    
                                        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
                                            {
                                            alertasNotificaciones.map((obj, indice) => (
                                            <ListItem key={indice} bottomDivider >
                                                <View>
                                                        <FontAwesome name='warning' size={23} color='#344D67' />                                                    
                                                </View>
                                                    <View style={mis_alertas.contenedor_info}>
                                                        <ListItem.Content >
                                                            <ListItem.Subtitle >
                                                            <View style={mis_alertas.lado_izquierdo}>
                                                                <Text style={mis_alertas.texto_info_derecha_titulo}>Alerta #000-{indice + 1}</Text>
                                                                <Text style={mis_alertas.texto_info_derecha_nombre}> <Feather name='user' size={20} color='#2B3A55' /> {obj.nombres} {obj.apellidos}</Text>
                                                                <Text style={mis_alertas.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' />  {obj.fecha_alerta}</Text>
                                                                <Text style={mis_alertas.texto_info_derecha}><Ionicons name='bed-outline' size={20} color='#2B3A55' />  {obj.numero_habitacion} </Text>
                                                                <Text style={mis_alertas.texto_info_derecha_mensaje}><Feather name='message-square' size={20} color='#2B3A55' />  {obj.mensaje_alerta.slice(0,35)}... </Text>                                        
                                                                <Text style={mis_alertas.texto_info_derecha}></Text>

                                                                {/* <Text style={mis_alertas.texto_info_derecha}>Hora  salida :</Text> */}
                                                            </View>

                                                            <View style={mis_alertas.lado_derecho}>
                                                                <Text style={mis_alertas.texto_info_izquierda_titulo}></Text>
                                                                <Text style={mis_alertas.texto_info_izquierda}></Text>
                                                                <Text style={mis_alertas.texto_info_izquierda}> </Text>
                                                                <Text style={mis_alertas.texto_info_izquierda}> <Badge value={obj.nombre_alerta}  status="" badgeStyle={{backgroundColor:'#FF8B8B'}} /></Text>

                                                                {/* <Text style={mis_alertas.texto_info_izquierda}>: {obj.mensaje_alerta} </Text> */}
                                                                {/* <Text style={mis_alertas.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                                            </View>

                                                            </ListItem.Subtitle>
                                                        </ListItem.Content>
                                                    </View>
                                                    {/* <View>
                                                        <TouchableNativeFeedback >
                                                            <FontAwesome name='warning' size={23} color='#344D67' />                                                    
                                                        </TouchableNativeFeedback>
                                                    </View> */}
                                            </ListItem>
                                            ))

                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                        }
                    </TabView.Item>
                    <TabView.Item style={mis_alertas.alertar}>
                        <View  style={mis_alertas.containerLogin}>
                            <StatusBar
                                backgroundColor="#FCFCFC"
                                barStyle="dark-content"
                            />
                            <View style={mis_alertas.espaciador}></View>
                            <View style={mis_alertas.contenedor_info_alerta}>
                                <Text style={mis_alertas.texto_info}>Nueva Alerta</Text>
                            </View>
                            <View style={mis_alertas.espaciador}></View>

                            <View>
                                <Text>Tipo de alerta</Text>
                                <SelectDropdown
                                    data={alertas}
                                    ref={dropdownRef}  
                                    defaultButtonText='Seleccionar'
                                    buttonStyle={mis_alertas.dropdown2BtnStyle}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index + 1)
                                        setTipoAlerta(index+1);

                                    }}
                                    // defaultValue={variante}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                    }}
                                />
                            </View>
                            <View style={mis_alertas.espaciador}></View>

                            <View>
                                <Text>Mensaje</Text>
                                <TextInput
                                style={mis_alertas.textarea}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={value => { setMensaje(value) }}
                                defaultValue={mensaje}
                                placeholder='Escribe motivo de alerta'
                                // onChangeText={(text) => this.setState({text})}
                                />
                            </View>
                                <View style={mis_alertas.espaciador}></View>
                                <View style={mis_alertas.espaciador2}></View>

                                <View style={mis_alertas.camara_container}>
                                    <Image  style={mis_alertas.imagen_Alerta} source={require('../assets/auxi.jpg')}></Image>                         
                                </View>

                                <View style={mis_alertas.espaciador}></View>

                                <View style={mis_alertas.boton_enviar}>
                                    <Button 
                                        title="Enviar alerta"
                                        loading={acceder}
                                        titleStyle={{ fontWeight: '200', fontSize: 18 }}
                                        buttonStyle={{
                                            backgroundColor:'rgba(39,79,103,0.93)',
                                            borderRadius: 10,
                                            height:55,  
                                        }}  
                                        onPress={()=>{grabarAlerta();}}
                                    />
                                </View>
                        </View>
                    </TabView.Item>
                </TabView>
            </>
        :
            <View  style={mis_alertas.containerLogin}>
                <View style={mis_alertas.espaciador}>
                </View>
                    <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                        {
                        alertasNotificas.map((obj, indice) => (
                        <ListItem key={indice} bottomDivider >
                            {/* PANEL PRINCIPAL ANCHO */}
                            <View style={mis_alertas.contenedor_info}>
                                <ListItem.Content >
                                    <ListItem.Subtitle >
                                    <View style={mis_alertas.lado_izquierdo}>
                                        <Text style={mis_alertas.texto_info_derecha_titulo}>Alerta #000-{indice + 1}</Text>
                                        <Text style={mis_alertas.texto_info_derecha_nombre}> <Feather name='user' size={20} color='#2B3A55' /> {obj.nombres} {obj.apellidos}</Text>
                                        <Text style={mis_alertas.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' />  {obj.fecha_alerta}</Text>
                                        <Text style={mis_alertas.texto_info_derecha}><Ionicons name='bed-outline' size={20} color='#2B3A55' />  {obj.numero_habitacion}</Text>
                                        <Text style={mis_alertas.texto_info_derecha_mensaje}><Feather name='message-square' size={20} color='#2B3A55' />  {obj.mensaje_alerta.slice(0,35)}... </Text>                                        
                                        <Text style={mis_alertas.texto_info_derecha}></Text>
                                    </View>

                                    <View style={mis_alertas.lado_derecho}>
                                        <Text style={mis_alertas.texto_info_izquierda_titulo}></Text>
                                        <Text style={mis_alertas.texto_info_izquierda}></Text>
                                        <Text style={mis_alertas.texto_info_izquierda}></Text>
                                        <Text style={mis_alertas.texto_info_izquierda}><Badge value={obj.nombre_alerta}  status=""  badgeStyle={{backgroundColor:'#439A97'}} /></Text>
                                    </View>
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </View>
                            <View >
                                {
                                obj.leido == 0  
                                ?
                                    <FontAwesome name='bell-o' size={24} color='#F16767' />                        
                                :
                                    <TouchableOpacity onPress={ () => {desactivarAlerta(obj.id)}}>
                                        <FontAwesome name='bell' size={24} color='#F16767' />                        
                                    </TouchableOpacity>
                                }
                            </View>
                        </ListItem>
                        ))

                        }
                    </ScrollView>
            </View>
    );
}

