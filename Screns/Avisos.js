import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {mis_avisos} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown'
import { Tab , TabView , Button, Badge , Skeleton, Stack } from '@rneui/themed';

export default function Avisos(props){

    const [alertas, setAlertas] = useState([]);
    const [alertasNotificaciones, setAlertasNotificaciones] = useState([]); //POR ID
    const [alertasNotificas, setAlertasNotificas] = useState([]); //EN GENERAL
    const dropdownRef = useRef({});  
    const dropdownRef2 = useRef({});  


    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');
    const [mensaje, setMensaje] = useState('');
    const [titulo, setTitulo] = useState('');
    const [acceder,setAcceder] =  useState(false);
    const [tipoAviso, setTipoAviso] = useState('');
    const [area, setArea] = useState('');
    const [index, setIndex] = useState(1);
    const [variante, setVariante] = useState('Seleccionar');

    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState((new Date()));
    const areas  = ['Gerencia' , 'RR.HH', 'TI'];
    const tipos_aviso  = ['Urgente' , 'Informativo', 'Opcional'];


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
      // wait(5000).then(() => 
      setTimeout(() => {
        listarAvisos(),  setRefreshing(false);
        ToastAndroid.showWithGravity(
          'Datos actualizados....',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      
      }, 2000);

    }, []);


    const listarAvisos = async () =>{
        await axios({
            method:'get',
            url: "avisos/getAvisos",
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

    const grabarAviso = async () =>{
        setAcceder(true);
        if(titulo != "" && mensaje != ""){

            var todayDate = new Date().toISOString().slice(0, 10);
            let registro = JSON.stringify({
                area_aviso:area,
                tipo_aviso:tipoAviso,
                titulo:titulo,
                message:mensaje,
                fecha:todayDate
            });
            console.log(registro);
            await axios({
                method: 'post',
                url: "avisos/agregarAviso",
                data:registro,
            }).then(async function (d) {
                // let datos = d.data;   
                // console.log("datos");
                setTimeout(() => {
                    ToastAndroid.showWithGravity(
                        'Se registro el aviso con exito !',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    setAcceder(false);
                    setTitulo('');
                    setMensaje('');
                    dropdownRef.current.reset();
                    dropdownRef2.current.reset();
    
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
        // listar();
        listarAvisos();
        var todayDate = new Date().toISOString();
        console.log(todayDate);
    }, [refresh]);

    return(
    id_usuario == ""  ?
    <>
        <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
                backgroundColor: '#ffff',
                height: 8,
                borderBottomWidth:.6,
                borderBottomColor:'#1597E5',
            }}
            style={{backgroundColor:'#1597E5',borderTopRightRadius:10, borderTopStartRadius:20 }}

            variant="primary"
            >
    
            <Tab.Item
                title="Crear aviso"
                titleStyle={{ fontSize: 14 }}
                icon={{ name: 'add-circle-outline', type: 'ionicon', color: 'white', size:25 }}
            />
            <Tab.Item
                title="Lista de avisos"
                titleStyle={{ fontSize: 14 }}
                icon={{ name: 'ios-layers-sharp', type: 'ionicon', color: 'white',  size:25 }}
            />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={mis_avisos.alertar}>
                <View  style={mis_avisos.containerLogin}>
                    <StatusBar
                        backgroundColor="#ffff"
                        barStyle="dark-content"
                    />
                    <View style={mis_avisos.espaciador}></View>

                    {/* <Text h1>Favorite</Text> */}
                    <View style={mis_avisos.contenedor_info_alerta}>
                        <Text style={mis_avisos.texto_info}>Nuevo Aviso</Text>
                    </View>

                    <View style={mis_avisos.espaciador}></View>

                    <View>
                        <Text>Area remitente</Text>
                        <SelectDropdown
                            data={areas}
                            ref={dropdownRef}  
                            defaultButtonText='Seleccionar'
                            buttonStyle={mis_avisos.dropdown2BtnStyle}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index + 1)
                                setArea(selectedItem);

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
                    <View style={mis_avisos.espaciador}></View>

                    <View>
                        <Text>Tipo de aviso</Text>
                        <SelectDropdown
                            data={tipos_aviso}
                            ref={dropdownRef2}  
                            defaultButtonText='Seleccionar'
                            buttonStyle={mis_avisos.dropdown2BtnStyle}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index + 1)
                                setTipoAviso(selectedItem);

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
                    <View style={mis_avisos.espaciador}></View>
                    <View>
                        <Text>Titulo</Text>
                            <TextInput
                            style={mis_avisos.textarea}
                            // multiline={true}
                            // numberOfLines={8}
                            onChangeText={value => { setTitulo(value) }}
                            defaultValue={titulo}
                            placeholder='Escribe titulo de aviso'
                            // onChangeText={(text) => this.setState({text})}
                        />
                    </View>
                    <View style={mis_avisos.espaciador}></View>

                    <View>
                        <Text>Mensaje</Text>
                        <TextInput
                        style={mis_avisos.textarea}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={value => { setMensaje(value) }}
                        defaultValue={mensaje}
                        placeholder='Escribe motivo de alerta'
                        // onChangeText={(text) => this.setState({text})}
                        />
                    </View>
                    <View style={mis_avisos.espaciador}></View>

                    <View style={mis_avisos.boton_enviar}>
                        <Button 
                            title="Crear aviso"
                            loading={acceder}
                            titleStyle={{ fontWeight: '200', fontSize: 18 }}
                            buttonStyle={{
                                
                                backgroundColor:'#007BFF',
                                borderRadius: 200,
                                height:55,  
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 3,
                            }}  
                            onPress={()=>{grabarAviso();}}
                        />
                    </View>

                </View>
    
            </TabView.Item>

            <TabView.Item style={mis_avisos.alertas}>
                {
                    id_usuario != ""    //si listar por ID
                    
                    ?   
                        alertasNotificaciones == "" ?  //ese ID TIENE DATA

                        <View style={mis_avisos.containerLogin}>
                            <Text>Aún no tienes alertas</Text>
                        </View>

                        :

                        <View  style={mis_avisos.containerLogin}>
                            <View style={mis_avisos.espaciador}>
                                <Text>Lista de alertas </Text>
                            </View>
                            <View style={mis_avisos.cuerpo_principal}>
                            
                                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
                                    {
                                    alertasNotificaciones.map((obj, indice) => (
                                    <ListItem key={indice} bottomDivider >
                                        <View>
                                                <FontAwesome name='bell' size={24} color='#FFB100' />
                                        </View>
                                        <View style={mis_avisos.contenedor_info}>
                                            <ListItem.Content >
                                                <ListItem.Subtitle >
                                                <View style={mis_avisos.lado_izquierdo}>
                                                    {/* <Text style={mis_avisos.texto_info}>Usuario : {indice + 1} </Text> */}
                                                    <Text style={mis_avisos.texto_info_derecha_titulo}>{obj.nombres}</Text>
                                                    <Text style={mis_avisos.texto_info_derecha}>Dia alerta </Text>
                                                    <Text style={mis_avisos.texto_info_derecha}>Alerta </Text>

                                                    <Text style={mis_avisos.texto_info_derecha}>Mensaje</Text>
                                                    {/* <Text style={mis_avisos.texto_info_derecha}>Hora  salida :</Text> */}
                                                </View>

                                                <View style={mis_avisos.lado_derecho}>
                                                    <Text style={mis_avisos.texto_info_izquierda_titulo}>{obj.apellidos}</Text>
                                                    <Text style={mis_avisos.texto_info_izquierda}>: {obj.fecha_alerta} </Text>
                                                    <Text style={mis_avisos.texto_info_izquierda}>: 
                                                        {/* {obj.nombre_alerta } */}
                                                        <Badge value={obj.nombre_alerta }  status="success" />

                                                    </Text>
                                                    <Text style={mis_avisos.texto_info_izquierda}>: ----- </Text>
                                                    {/* <Text style={mis_avisos.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                                </View>

                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                        </View>
                                        <View>
                                            <TouchableOpacity>
                                                <EvilIcons name='arrow-right' size={35} color='#2B3A55' />
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </ListItem>
                                    ))

                                    }
                                </ScrollView>
                            </View>
                        </View>
                    :

                        <View  style={mis_avisos.containerLogin}>
                            <View style={mis_avisos.espaciador}></View>

                            <View style={mis_avisos.espaciador}>
                                <Text>Lista de avisos </Text>
                            </View>
                            <View style={mis_avisos.espaciador}></View>
                            <View style={mis_avisos.cuerpo_principal}>
                            
                            <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                                {
                                alertasNotificas.map((obj, indice) => (
                                <ListItem key={indice} bottomDivider >
                                    {/* <View>
                                            <FontAwesome name='bell' size={24} color='#FFB100' />
                                    </View> */}
                                    <View style={mis_avisos.contenedor_info}>
                                        <ListItem.Content >
                                            <ListItem.Subtitle >
                                            <View style={mis_avisos.lado_izquierdo}>
                                                {/* <Text style={mis_avisos.texto_info}>Usuario : {indice + 1} </Text> */}
                                                <Text style={mis_avisos.texto_info_derecha_titulo}>{obj.titulo}  </Text>
                                                <Text style={mis_avisos.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> {obj.fecha_aviso} </Text>
                                                <Text style={mis_avisos.texto_info_derecha}>Area:
                                                    <Badge value={obj.area_aviso} status="primary" />
                                                </Text>
                                                <Text style={mis_avisos.texto_info_izquierda_mensaje}>{obj.aviso_mensaje} </Text>                                        

                                            </View>

                                            <View style={mis_avisos.lado_derecho}>
                                                <Text style={mis_avisos.texto_info_izquierda_titulo}></Text>
                                                <Text style={mis_avisos.texto_info_izquierda}></Text>

                                                <Text style={mis_avisos.texto_info_izquierda}>Motivo:<Badge value={obj.tipo_aviso} status="success" />
                                                </Text>
                                                <Text style={mis_avisos.texto_info_izquierda}></Text>
                                                {/* <Text style={mis_avisos.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                            </View>

                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <EvilIcons name='arrow-right' size={35} color='#2B3A55' />
                                        </TouchableOpacity>
                                        
                                    </View>
                                </ListItem>
                                ))

                                }
                            </ScrollView>
                        </View>
                        </View>

                }
            </TabView.Item>
        </TabView>
    </>

    :
            
        <View  style={mis_avisos.containerLogin}>
            <View style={mis_avisos.espaciador}></View>

            <View style={mis_avisos.espaciador}>
                <Text>Lista de avisos </Text>
            </View>
            <View style={mis_avisos.espaciador}></View>
            <View style={mis_avisos.cuerpo_principal}>
                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                    {
                    alertasNotificas.map((obj, indice) => (
                    <ListItem key={indice} bottomDivider >
                        {/* <View>
                                <FontAwesome name='bell' size={24} color='#FFB100' />
                        </View> */}
                        <View style={mis_avisos.contenedor_info}>
                            <ListItem.Content >
                                <ListItem.Subtitle >
                                <View style={mis_avisos.lado_izquierdo}>
                                    {/* <Text style={mis_avisos.texto_info}>Usuario : {indice + 1} </Text> */}
                                    <Text style={mis_avisos.texto_info_derecha_titulo}>{obj.titulo}  </Text>
                                    <Text style={mis_avisos.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> {obj.fecha_aviso} </Text>
                                    <Text style={mis_avisos.texto_info_derecha}>Area:
                                        <Badge value={obj.area_aviso} status="primary" />
                                    </Text>
                                    <Text style={mis_avisos.texto_info_izquierda_mensaje}>{obj.aviso_mensaje} </Text>                                        

                                </View>

                                <View style={mis_avisos.lado_derecho}>
                                    <Text style={mis_avisos.texto_info_izquierda_titulo}></Text>
                                    <Text style={mis_avisos.texto_info_izquierda}></Text>

                                    <Text style={mis_avisos.texto_info_izquierda}>Motivo: 
                                        <Badge value={obj.tipo_aviso} status="success" />
                                    </Text>
                                    <Text style={mis_avisos.texto_info_izquierda}></Text>
                                    {/* <Text style={mis_avisos.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                </View>

                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <EvilIcons name='arrow-right' size={35} color='#2B3A55' />
                            </TouchableOpacity>
                            
                        </View>
                    </ListItem>
                    ))

                    }
                </ScrollView>
            </View>

            {/* <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Skeleton animation="pulse" width={100} height={40} />
                <Skeleton
                    LinearGradientComponent={LinearGradient}
                    animation="wave"
                    width={200}
                    height={40}
                />
                <Skeleton animation="none" width={80} height={40} />
            </View> */}

        </View>

 
    );
}

