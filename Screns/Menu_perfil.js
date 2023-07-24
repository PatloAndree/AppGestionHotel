import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { TouchableOpacity,SafeAreaView ,ScrollView,Alert, View,KeyboardAvoidingView,Dimensions,TextInput,ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {menu_perfil} from '../Shared/Estilos';
import Subir_archivo from './Cargar_imagen/Subir_archivo';
import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { Button } from '@rneui/themed';
import { Stack } from 'react-native-flex-layout';
import { CheckBox, Icon } from '@rneui/themed';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
const countries = ["Administrador", "Usuario"];

export default function Listado(props){

    const [selectedIndex, setIndex] = useState(0);
    const [refresh, setRefresh] = useState((new Date()));
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const [acceder, setAcceder] = useState(false);
    const [nombre, setnombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [color,setColor] = useState('#9CB4CC');

    const obtenerUsuario = async () =>{

        let usuario_id = JSON.stringify({
            usuario: id_usuario ,
        });
        await axios({
            method: 'post',
            url: "login/getUsuario",
            data:usuario_id,
          }).then(async function (d) {
            let datos = d.data;
            // setSesion(datos);
            setnombre(datos.nombres);
            setApellido(datos.apellidos);
            setCorreo(datos.correo);
            setContrasena(datos.contrasena);
            // setUusuario(datos);
          console.log("SI TRAE DATA");
          }).catch(function (error) {
              console.log(error);
              console.log("no entro");
          });
    };

    const editarUsuario = async () => {
        setAcceder(true);
        let data = JSON.stringify({
            id:id_usuario,
            nombres: nombre ,
            apellidos: apellido ,
            correo: correo ,
            contrasena: contrasena ,
        });
        console.log(data);
        await axios({
            method: 'post',
            url: "login/editarUsuario",
            data:data,
            headers:{
                'Content-Type': 'multipart/form-data' 
            }
          }).then(async function (d) {
            console.log(d.data);
            if (d.data != 0) {
                console.log("SI TRAE DATA");
             
                setTimeout(() => {
                    obtenerUsuario();
                    setAcceder(false);
                    ToastAndroid.showWithGravity(
                        'Se actualizo correctamente',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER 
                      );
                }, 2000);
            }
          }).catch(function (error) {
              console.log(error);            
              ToastAndroid.showWithGravity(
                'Atención, no se pudo actualizar',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
              setAcceder(false);

          });

    };

    const listar = async () =>{
        // let session = [];
        // setRefresh(new Date())
        let dataSesion = await AsyncStorage.getItem('@AppA365');

            if(dataSesion != ""){
                dataSesion = JSON.parse(dataSesion.split(','));
                console.log(dataSesion);
                setSesion({
                    nombres: dataSesion.nombres,
                    apellidos: dataSesion.apellidos,
                    correo:dataSesion.correo,
                    contrasena:dataSesion.contrasena,
                    tipo:dataSesion.tipo

                })
                // setSesion([JSON.parse(dataSesion)]);
                // setSesion({id:1});
            }
    };


    useEffect(() => {
        obtenerUsuario();
        console.log(id_usuario);
      }, [refresh]);

    return(
     
    <KeyboardAvoidingView>
        <ScrollView>
            <View style={menu_perfil.contenedor}>

                    <StatusBar
                        backgroundColor="#ffff"
                        barStyle="dark-content"
                    />

                    <View style={menu_perfil.separador}></View>

                    <View style={menu_perfil.cabecera}>
                            <Subir_archivo />
                        {/* <View style={menu_perfil.cabecera_izquierda}>
                        </View>
                        <View style={menu_perfil.cabecera_derecha}>
                            
                        </View> */}
                    </View>

                    <View style={menu_perfil.separador}></View>

                    <View style={menu_perfil.cuerpo}>
                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='user' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    // placeholder='Usuario'
                                    onChangeText={value => { setnombre(value) }}
                                    defaultValue={nombre}
                                    // placeholder='Donde'
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='user' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    // placeholder='Usuario'
                                    onChangeText={value => { setApellido(value) }}
                                    defaultValue={apellido != "" ? apellido : ""  }
                                    // placeholder='Donde'
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='list-alt' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    placeholder='DNI'
                                    // onChangeText={value => { setApellido(value) }}
                                    // defaultValue={apellido != "" ? apellido : ""  }
                                    // placeholder='Donde'
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='envelope-o' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    // placeholder='Usuario'
                                    onChangeText={value => { setCorreo(value) }}
                                    defaultValue={correo}
                                    // placeholder='Donde'
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='lock' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    // placeholder='Usuario'
                                    onChangeText={value => { setContrasena(value) }}
                                    defaultValue={contrasena}
                                    // placeholder='Donde'
                                    
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        {/* <Text  style={menu_perfil.text_color}>Edad</Text> */}
                        <View style={menu_perfil.containerInputUsuario}>
                            <View>
                                <FontAwesome name='calendar-o' size={24} color={color} />
                            </View>
                            <View>
                                <TextInput style={menu_perfil.textInput}
                                    placeholder='12-02-2023'
                                    // onChangeText={value => { setApellido(value) }}
                                    // defaultValue={apellido != "" ? apellido : ""  }
                                    // placeholder='Donde'
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                        </View>

                        {/* <SelectDropdown
                            data={countries}
                            defaultButtonText={'Seleccionar perfil'}
                            buttonStyle={menu_perfil.seleccionar}
                            buttonTextStyle={menu_perfil.dropdown}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            // dropdownStyle={menu_perfil.dropdown}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#D1D1D1'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                        
                        /> */}

                        <View style={menu_perfil.separador}></View>

                        {/* <Text>Sexo</Text>
                        <Stack  align="center" style={{width: (width * 1), flexDirection:'row'}}>
                            <CheckBox
                            title="Masculino"
                            checked={selectedIndex === 0}
                            onPress={() => setIndex(0)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            />
                            <CheckBox
                            title="Femenino"
                            checked={selectedIndex === 1}
                            onPress={() => setIndex(1)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            />
                        </Stack> */}
                    </View>

                    <View style={menu_perfil.pie}>  
                        <Button 
                                title="Editar"
                                loading={acceder}
                                titleStyle={{ fontWeight: '200', fontSize: 18, color:'#ffff' }}
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

                                    elevation: 5,
                                    width: (width * 0.900)
                                }} 
                                onPress={()=>{editarUsuario();}}
                        />


                    </View>

                    <View style={menu_perfil.pie}>  
                

                </View>

            </View>
        </ScrollView>
    </KeyboardAvoidingView>
 
    );
}

