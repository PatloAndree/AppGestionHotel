import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect, useCallback } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Button,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {listado} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Badge } from '@rneui/themed';
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';

// const wait = timeout => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

export default function Listado(props){

    const [usuario, setUusuario] = useState([]);
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');

    const [text, setText] = useState('...');
    const [text2, setText2] = useState('...');



    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState((new Date()));


    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());

    
    const [mode, setMode] = useState('date');
    const [mode2, setMode2] = useState('date');


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);   
      let tempDate = new Date(currentDate);
      let fDate= tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setText(fDate);
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

    const onChange2 = (event, selectedDate) => {
      const currentDate2 = selectedDate || date;
      setShow2(Platform.OS === 'ios');
      setDate2(currentDate2);   
      let tempDate2 = new Date(currentDate2);
      let fDate2= tempDate2.getDate() + '/' + (tempDate2.getMonth() + 1) + '/' + tempDate2.getFullYear();
      setText2(fDate2);
    };

    const showMode2 = currentMode => {
      setShow2(true);
      setMode2(currentMode);
    };


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
        listar(),  setRefreshing(false);
        ToastAndroid.showWithGravity(
          'Datos actualizados....',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      
      }, 2000);

    }, []);


    const listar = async () =>{
        await axios({
            method: 'get',
            url: "asistencia/getAsistencias",
            data:null,
          }).then(async function (d) {
            let datos = d.data;
            console.log(datos);
            setUusuario(datos);
            
          console.log("entrando");
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    };

    const listarPorId = async () =>{
        const registro = JSON.stringify({
          usuario:id_usuario
        });
      await axios({
          method: 'post',
          url: "asistencia/getAsistenciasPorId",
          data:registro,
        }).then(async function (d) {
          let datos = d.data;
          console.log(datos);
          setUusuario(datos);
          
        console.log("entrando");
        }).catch(function (error) {
            console.log(error);
            console.log("no entro");
        });
  };


    useEffect(() => {
        console.log("stoy usuario",id_usuario);
        if(id_usuario != "" ){
          listarPorId();
        }else{
          listar();
          console.log("loco");
        }
        // async function fetchData() {
        //   const response = await fetch('http://my-api.com/data');
        //   const json = await response.json();
        //   setData(json);
        // }
        // fetchData();
      }, [refresh]);

    return(
     
    <View style={listado.containerLogin}>
            <StatusBar
                backgroundColor="#ffff"
                barStyle="dark-content"
            />
          <View style={listado.espaciador}></View>

          {/* <View style={listado.espaciador}>
                      <Text>Listado de asistencias</Text>
          </View> */}
          {

            id_usuario != "" 
            ?
              usuario == "" ?
                <View>
                  <Text>Aún no tienes data</Text>
                </View>
              :
              
                <View style={listado.cuerpo_principal}>
                  

                  <View style={listado.contenedorFecha}>

                      <View style={listado.contenedorFecha1}>
                            <MaterialIcons size={30}  name="date-range" color='#103747' onPress={() => showMode('date') }  />
                              <View>
                              <Text>{text}</Text>
                            </View>
                              {
                                show && (
                                  <DateTimePicker
                                  testID='dateTimePicker'
                                  value={date}
                                  mode={mode}
                                  onChange={onChange}
                                  is24Hour={true}
                                  display='default'
                                />
                                
                                )
                              }
                      </View>

                      <View style={listado.contenedorFecha2}>
                            <MaterialIcons size={30}  name="date-range" color='#103747' onPress={() => showMode2('date') }  />
                              <View>
                              <Text>{text2}</Text>
                            </View>
                              {
                                show2 && (
                                  <DateTimePicker
                                  testID='dateTimePicker2'
                                  value={date2}
                                  mode={mode2}
                                  onChange={onChange2}
                                  is24Hour={true}
                                  display='default'
                                />
                                
                                )
                              }
                      </View>

                      <View style={listado.contenedorFecha3}>
                              <TouchableOpacity >
                                    <MaterialIcons size={30}  name="search"  color='#0069D4'  /> 
                              </TouchableOpacity>
                      </View>

                  </View>

                  <View style={listado.espaciador}></View>
               
                  <View style={listado.resultados}>
                    <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
                    {
                      
                    usuario.map((obj, indice) => (
                    <ListItem key={indice} bottomDivider >
                      <View>
                            <MaterialCommunityIcons name='bell-alert' size={26} color='#FFE15D' />
                        </View>
                        <View style={listado.contenedor_info}>
                        
                          <ListItem.Content >
                            <ListItem.Subtitle >
                                <View style={listado.lado_izquierdo}>
                                  {/* <Text style={listado.texto_info}>Usuario : {indice + 1} </Text> */}
                                  <Text style={listado.texto_info_derecha_titulo}>{obj.nombres}</Text>
                                  <Text style={listado.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> {obj.dia_asistencia} </Text>                                
                                  <Text style={listado.texto_info_derecha}>Hora ingreso </Text>

                                  <Text style={listado.texto_info_derecha}>Hora refrigerio </Text>
                                  <Text style={listado.texto_info_derecha}>Hora  salida </Text>
                                </View>

                                <View style={listado.lado_derecho}>
                                  <Text style={listado.texto_info_izquierda_titulo}>{obj.apellidos}</Text>
                                  <Text style={listado.texto_info_izquierda}></Text>
                                  <Text style={listado.texto_info_izquierda}>:
                                    { obj.hora_ingreso < hora_de_ingreso ? 
                                    
                                    <Badge value={obj.hora_ingreso }  status="success" />

                                    :

                                    <Badge value={obj.hora_ingreso }  status="error" />
                                    } 
                                  </Text>
                                  <Text style={listado.texto_info_izquierda}>: {obj.hora_refrigerio} </Text>
                                  <Text style={listado.texto_info_izquierda}>: {obj.hora_salida} </Text>

                                </View>

                            </ListItem.Subtitle>
                          </ListItem.Content>
                        </View>
                        <View>
                          {/* EJEMPLO */}
                          <Image  style={listado.imagen_check} source={require('../assets/checklist.png')}></Image>
                          

                        </View>
                      
                    </ListItem>
                    ))

                    }
                    </ScrollView>
                  </View>
                </View>

            :

            <View style={listado.cuerpo_principal}>
                  

            <View style={listado.contenedorFecha}>

                <View style={listado.contenedorFecha1}>
                      <MaterialIcons size={30}  name="date-range" color='#103747' onPress={() => showMode('date') }  />
                        <View>
                        <Text>{text}</Text>
                      </View>
                        {
                          show && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            onChange={onChange}
                            is24Hour={true}
                            display='default'
                          />
                          
                          )
                        }
                </View>

                <View style={listado.contenedorFecha2}>
                      <MaterialIcons size={30}  name="date-range" color='#103747' onPress={() => showMode2('date') }  />
                        <View>
                        <Text>{text2}</Text>
                      </View>
                        {
                          show2 && (
                            <DateTimePicker
                            testID='dateTimePicker2'
                            value={date2}
                            mode={mode2}
                            onChange={onChange2}
                            is24Hour={true}
                            display='default'
                          />
                          
                          )
                        }
                </View>

                <View style={listado.contenedorFecha3}>
                        <TouchableOpacity >
                              <MaterialIcons size={30}  name="search"  color='#0069D4'  /> 
                        </TouchableOpacity>
                </View>

            </View>

            <View style={listado.espaciador}></View>
         
            <View style={listado.resultados}>
                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />}  >
                  {
                  usuario.map((obj, indice) => (
                  <ListItem key={indice} bottomDivider  style={{ borderWidth:1,borderRadius:5,borderColor:'#EFF5F5'}}>
                    {/* <View style={listado.border_item}> */}
                      <View>
                            <FontAwesome name='user-o' size={24} color='#0081B4' />
                      </View>
                      <View style={listado.contenedor_info}>
                          <ListItem.Content >
                            <ListItem.Subtitle >
                              <View style={listado.lado_izquierdo}>
                                  {/* <Text style={listado.texto_info}>Usuario : {indice + 1} </Text> */}
                                  <Text style={listado.texto_info_derecha_titulo}>{obj.nombres}</Text>
                                  <Text style={listado.texto_info_derecha}><Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> {obj.dia_asistencia} </Text>
                                  <Text style={listado.texto_info_derecha}>Hora ingreso :</Text>

                                  <Text style={listado.texto_info_derecha}>Hora comida :</Text>
                                  <Text style={listado.texto_info_derecha}>Hora  salida :</Text>
                              </View>

                              <View style={listado.lado_derecho}>
                                <Text style={listado.texto_info_izquierda_titulo}>{obj.apellidos}</Text>
                                <Text style={listado.texto_info_izquierda}> </Text>
                                <Text style={listado.texto_info_izquierda}>
                                  { obj.hora_ingreso < hora_de_ingreso ? 
                                  
                                  <Badge value={obj.hora_ingreso }  status="success" />

                                  :

                                  <Badge value={obj.hora_ingreso }  status="warning" />
                                  } 
                                </Text>
                                <Text style={listado.texto_info_izquierda}>{obj.hora_refrigerio} </Text>
                                <Text style={listado.texto_info_izquierda}> {obj.hora_salida} </Text>
                              </View>

                            </ListItem.Subtitle>
                          </ListItem.Content>
                      </View>
                      <View>
                          <TouchableOpacity>
                              <EvilIcons name='arrow-right' size={35} color='#2B3A55' />
                          </TouchableOpacity>
                          
                      </View>
                    {/* </View> */}
                    
                    
                  </ListItem>
                  ))

                  }
                </ScrollView>
            </View>
          </View>

           
          }
    </View>
 
    );
}

