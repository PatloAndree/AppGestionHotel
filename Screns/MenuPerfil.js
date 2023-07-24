import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { TouchableOpacity,Text ,ScrollView,Alert,Image, View,KeyboardAvoidingView,Dimensions,TextInput,ToastAndroid } from 'react-native';
import {menu_perfil} from '../Shared/Estilos';
// import Subir_archivo from './Cargar_imagen/Subir_archivo';
import axios from '../Shared/Axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from '@rneui/themed';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuPerfil(props){

    const [selectedIndex, setIndex] = useState(0);
    const [refresh, setRefresh] = useState((new Date()));
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const [acceder, setAcceder] = useState(false);
    const [nombre, setnombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [color,setColor] = useState('#2B4865');

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
            setDni(datos.dni);

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
            dni:dni
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
                        backgroundColor="#FCFCFC"
                        barStyle="dark-content"
                    />

                    <View style={menu_perfil.separador}></View>

                    <View style={menu_perfil.cabecera}>
                        <Image  style={menu_perfil.imagen_cabecera} source={require('../assets/avatar.jpg')}></Image> 
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
                                    onChangeText={value => { setDni(value) }}
                                    defaultValue={dni}
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

                        <View style={menu_perfil.separador}>
                            <Text>   {   dni != "" && dni != null ? "" : "Completar su datos por favor..." } </Text>
                        </View>

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
                                    backgroundColor:'rgba(39,79,103,0.93)',
                                    borderRadius: 10,
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

