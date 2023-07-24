import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {mis_alertas} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');
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
      // wait(5000).then(() => 
      setTimeout(() => {
        listarAlertas(),  setRefreshing(false);
        ToastAndroid.showWithGravity(
          'Datos actualizados....',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      
      }, 200);

    }, []);

    const seleccion = ['seleccionar','Seleccionar'];

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

    const grabarAlerta = async () =>{
        if(mensaje!=""){
            setAcceder(true);
            var todayDate = new Date().toISOString().slice(0, 10);
            let registro = JSON.stringify({
                usuario:id_usuario,
                tipoalerta:tipo_alerta,
                message:mensaje,
                fecha:todayDate
            });
            console.log(registro);
            await axios({
                method: 'post',
                url: "alertas/agregarAlerta",
                data:registro,
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
        }else{
            listarAlertas();
            listar();
        }

    }, [refresh]);

    return(
        id_usuario != "" ?
        
            <>

                {/* <View style={mis_alertas.espaciadorAltura}></View> */}
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
                        title="Alertar"
                        titleStyle={{ fontSize: 15 , color:'#ffff', fontWeight:'700'}}
                        style={{ borderRightWidth:1, borderColor:'green'}}
                        icon={{ name: 'ios-warning', type: 'ionicon', color: 'white', size:25 }}
                    />
                    <Tab.Item
                        title="Mis Alertas"
                        titleStyle={{ fontSize: 15,  color:'#ffff' , fontWeight:'700'}}
                        icon={{ name: 'md-alert-circle', type: 'ionicon', color: 'white',  size:25  }}
                    />
                </Tab>

                <TabView value={index} onChange={setIndex} animationType="spring">
                    <TabView.Item style={mis_alertas.alertar}>
                        <View  style={mis_alertas.containerLogin}>
                            <StatusBar
                                backgroundColor="#ffff"
                                barStyle="dark-content"
                            />
                            <View style={mis_alertas.espaciador}></View>

                            {/* <Text h1>Favorite</Text> */}
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
                                numberOfLines={8}
                                onChangeText={value => { setMensaje(value) }}
                                defaultValue={mensaje}
                                placeholder='Escribe motivo de alerta'
                                // onChangeText={(text) => this.setState({text})}
                                />
                            </View>
                            <View style={mis_alertas.espaciador}></View>

                            <View style={mis_alertas.boton_enviar}>
                                <Button 
                                    title="Enviar alerta"
                                    loading={acceder}
                                    titleStyle={{ fontWeight: '200', fontSize: 18 }}
                                    buttonStyle={{
                                        backgroundColor:'#FB5660',
                                        borderRadius: 200,
                                        height:55,  

                                    }}  
                                    onPress={()=>{grabarAlerta();}}
                                />
                            </View>

                        </View>
            
                    </TabView.Item>

                    <TabView.Item style={mis_alertas.alertas}>
                        {
                            //EMPLEADO
                            id_usuario != "" && id_usuario != 0   //si listar por ID 
                            
                            ?   
                                alertasNotificaciones == "" ?  //ese ID TIENE DATA

                                    <View style={mis_alertas.containerLogin}>
                                        <Text>Aún no tienes alertas</Text>
                                    </View>
                                :

                                <View  style={mis_alertas.containerLogin}>
                                    <View style={mis_alertas.espaciador}>
                                        <Text>Lista de alertas </Text>
                                    </View>
                                    <View style={mis_alertas.cuerpo_principal}>
                                    
                                        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
                                            {
                                            alertasNotificaciones.map((obj, indice) => (
                                            <ListItem key={indice} bottomDivider >
                                                {/* <View>
                                                        <FontAwesome name='bell' size={24} color='#FFB100' />
                                                </View> */}
                                                    <View style={mis_alertas.contenedor_info}>
                                                <ListItem.Content >
                                                    <ListItem.Subtitle >
                                                    <View style={mis_alertas.lado_izquierdo}>
                                                        {/* <Text style={mis_alertas.texto_info}>Usuario : {indice + 1} </Text> */}
                                                        <Text style={mis_alertas.texto_info_derecha_titulo}>{obj.nombres} {obj.apellidos}</Text>
                                                        <Text style={mis_alertas.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' />  {obj.fecha_alerta}</Text>
                                                        {/* <Text style={mis_alertas.texto_info_derecha}>Mensaje</Text> */}
                                                        <Text style={mis_alertas.texto_info_izquierda_mensaje}>{obj.mensaje_alerta} </Text>                                        

                                                        {/* <Text style={mis_alertas.texto_info_derecha}>Hora  salida :</Text> */}
                                                    </View>

                                                    <View style={mis_alertas.lado_derecho}>
                                                        <Text style={mis_alertas.texto_info_izquierda_titulo}></Text>
                                                        <Text style={mis_alertas.texto_info_izquierda}>Tipo: <Badge value={obj.nombre_alerta}  status="success" /></Text>
                                                        <Text style={mis_alertas.texto_info_izquierda}>
                                                            {/* {obj.nombre_alerta } */}
                                                            {/* <Badge value={obj.nombre_alerta }  status="success" /> */}

                                                        </Text>
                                                        {/* <Text style={mis_alertas.texto_info_izquierda}>: {obj.mensaje_alerta} </Text> */}
                                                        {/* <Text style={mis_alertas.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                                    </View>

                                                    </ListItem.Subtitle>
                                                </ListItem.Content>
                                                    </View>
                                                <View>
                                                    <FontAwesome name='bell-o' size={24} color='#344D67' />
                                                </View>
                                            </ListItem>
                                            ))

                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            :
                            
                            // ADMINISTRADOR
                            <View  style={mis_alertas.containerLogin}>
                                <View style={mis_alertas.espaciador}>
                                    <Text>Lista de alertas general</Text>
                                </View>
                                <View style={mis_alertas.cuerpo_principal}>
                                
                                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                                    {
                                    alertasNotificas.map((obj, indice) => (
                                    <ListItem key={indice} bottomDivider >
                                        {/* <View>
                                                <FontAwesome name='bell' size={24} color='#FFB100' />
                                        </View> */}
                                        {/* PANEL PRINCIPAL ANCHO */}
                                        <View style={mis_alertas.contenedor_info}>
                                            <ListItem.Content >
                                                <ListItem.Subtitle >
                                                <View style={mis_alertas.lado_izquierdo}>
                                                    {/* <Text style={mis_alertas.texto_info}>Usuario : {indice + 1} </Text> */}
                                                    <Text style={mis_alertas.texto_info_derecha_titulo}>{obj.nombres} {obj.apellidos}</Text>
                                                    <Text style={mis_alertas.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' />  {obj.fecha_alerta}</Text>
                                                    {/* <Text style={mis_alertas.texto_info_derecha}>Mensaje</Text> */}
                                                    <Text style={mis_alertas.texto_info_izquierda_mensaje}>{obj.mensaje_alerta} </Text>                                        

                                                    {/* <Text style={mis_alertas.texto_info_derecha}>Hora  salida :</Text> */}
                                                </View>

                                                <View style={mis_alertas.lado_derecho}>
                                                    <Text style={mis_alertas.texto_info_izquierda_titulo}></Text>
                                                    <Text style={mis_alertas.texto_info_izquierda}>Tipo: <Badge value={obj.nombre_alerta}  status="success" /></Text>
                                                    <Text style={mis_alertas.texto_info_izquierda}>
                                                        {/* {obj.nombre_alerta } */}
                                                        {/* <Badge value={obj.nombre_alerta }  status="success" /> */}

                                                    </Text>
                                                    {/* <Text style={mis_alertas.texto_info_izquierda}>: {obj.mensaje_alerta} </Text> */}
                                                    {/* <Text style={mis_alertas.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                                </View>

                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                        </View>
                                        {/* <View style={mis_alertas.campo_icono}> */}
                                        <View >

                                            {/* <TouchableOpacity>
                                                <EvilIcons name='arrow-right' size={35} color='#2B3A55' />
                                            </TouchableOpacity> */}
                                                <FontAwesome name='bell-o' size={24} color='#344D67' />
                                                {/* <Badge value={obj.nombre_alerta}  status="success" /> */}

                                            
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

            <View  style={mis_alertas.containerLogin}>

                {/* <View style={mis_alertas.espaciador}></View> */}

                <View style={mis_alertas.espaciador}>
                    {/* <Text>Lista de alertas general</Text> */}
                </View>

                {/* <View style={mis_alertas.cuerpo_principal}> */}
                    <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                        {
                        alertasNotificas.map((obj, indice) => (
                        <ListItem key={indice} bottomDivider >
                            {/* <View>
                                    <FontAwesome name='bell' size={24} color='#FFB100' />
                            </View> */}
                            {/* PANEL PRINCIPAL ANCHO */}
                            <View style={mis_alertas.contenedor_info}>
                                <ListItem.Content >
                                    <ListItem.Subtitle >
                                    <View style={mis_alertas.lado_izquierdo}>
                                        {/* <Text style={mis_alertas.texto_info}>Usuario : {indice + 1} </Text> */}
                                        <Text style={mis_alertas.texto_info_derecha_titulo}>{obj.nombres} {obj.apellidos} </Text>
                                        <Text style={mis_alertas.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' />  {obj.fecha_alerta}</Text>
                                        {/* <Text style={mis_alertas.texto_info_derecha}>Mensaje</Text> */}
                                        <Text style={mis_alertas.texto_info_izquierda_mensaje}>{obj.mensaje_alerta} </Text>                                        

                                        {/* <Text style={mis_alertas.texto_info_derecha}>Hora  salida :</Text> */}
                                    </View>

                                    <View style={mis_alertas.lado_derecho}>
                                        <Text style={mis_alertas.texto_info_izquierda_titulo}></Text>
                                        <Text style={mis_alertas.texto_info_izquierda}>Tipo: <Badge value={obj.nombre_alerta}  status="success" /></Text>
                                        <Text style={mis_alertas.texto_info_izquierda}></Text>
                                        {/* <Text style={mis_alertas.texto_info_izquierda}>: {obj.mensaje_alerta} </Text> */}
                                        {/* <Text style={mis_alertas.texto_info_izquierda}> {obj.hora_salida} </Text> */}
                                    </View>

                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </View>
                            {/* <View style={mis_alertas.campo_icono}> */}
                            <View >
                                {
                                obj.leido == 0  
                                ?
                                    <FontAwesome name='bell-o' size={24} color='#1E56A0' />                        
                                :
                                    <TouchableOpacity onPress={ () => {desactivarAlerta(obj.id)}}>
                                        <FontAwesome name='bell' size={24} color='#1E56A0' />                        
                                    </TouchableOpacity>
                                }
                            </View>
                        </ListItem>
                        ))

                        }
                    </ScrollView>
                {/* </View> */}

            </View>

    );
}

