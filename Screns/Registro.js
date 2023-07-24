import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { BackHandler,KeyboardAvoidingView ,Text,ScrollView, View,Image,Dimensions,TextInput, Pressable, ToastAndroid } from 'react-native';
import { Stack } from 'react-native-flex-layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/themed';
import {registro}  from '../Shared/Estilos';
import axios from '../Shared/Axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function Registro(props){
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const [nombres, setNombres] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [acceder, setAcceder] = useState(false);
    const [selectedIndex, setIndex] = useState(1);

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
                setRightIcon('eye-slash');
                setPasswordVisibility(!passwordVisibility);
            } else if (rightIcon === 'eye-slash') {
                setRightIcon('eye');
                setPasswordVisibility(!passwordVisibility);
            }
    };

    const fnRegistrarUsuario = async () =>{
        setAcceder(true);
        if(nombres.trim() == "" && correo.trim() == "" &&  contrasena.trim() == "" ){
            ToastAndroid.showWithGravity(
                'Ingrese sus datos',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            setAcceder(false);

            }else if(nombres.trim() == ""){
                ToastAndroid.showWithGravity(
                    'Ingresar nombres',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);

            }else if(correo.trim() == ""){
                ToastAndroid.showWithGravity(
                    'Ingresar correo',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setAcceder(false);

            }else if(contrasena.trim() == ""){
            ToastAndroid.showWithGravity(
                'Ingresar su contraseña',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            setAcceder(false);
        }
        else{
            let validar = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if(validar.test(correo)){
                let registro = JSON.stringify({
                    names: nombres,
                    email: correo,
                    password:contrasena,
                    sexo:selectedIndex
                  });
                  console.log(registro);
                await axios({
                    method: 'post',
                    url: "login/agregarUsuario",
                    data:registro,
                  }).then(async function (d) {
                    console.log(d.data);
                    console.log('---------------------');
                    if (d.data==0 ) {
                        ToastAndroid.showWithGravity(
                            'Atención, intentelo de nuevo...',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                          );
                          setAcceder(false);
                    }else {
                        let datos = d.data;
                        console.log("esta es mi data", datos);
                        console.log('---------------------');
                        setTimeout(() => {
                            props.navigation.push('Login');
                            ToastAndroid.showWithGravity(
                                'Te registraste con exito !',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                              );
                        }, 2000);
                    }
                  }).catch(function (error) {
                      console.log(error);
                      setAcceder(false);
                      console.log("no me registre");
                  });
            }else{
                ToastAndroid.showWithGravity(
                    'Atención, correo mal digitado...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                  setAcceder(false);

            }
        }
    };
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
          );
        backHandler.remove();
    });
return(
    acceder,
    passwordVisibility,
    rightIcon,

    <KeyboardAvoidingView>
        <ScrollView>
            <View style={registro.containerLogin}>
                <StatusBar backgroundColor="#F3F1F5" barStyle="light-content"/>

                <View style={registro.cabeceraFoto} >
                    <Image  style={registro.image} source={require('../assets/registro.png')}></Image>
                </View>

                <View style={registro.containerInputs}>

                    <View>
                        <Text style={registro.titulo}>Registrarme</Text>
                    </View>

                    {/* <Text style={registro.textInputs}>Nombres</Text> */}
                    <View style={registro.containerInputUsuario}>
                        <View>
                            <TextInput style={registro.textInput}
                            onChangeText={value => { setNombres(value) }}
                            defaultValue={nombres}
                                placeholder='Nombres'
                                autoCapitalize='none'
                            >          
                            </TextInput>
                        </View>
                    </View>

                    {/* <Text style={registro.textInputs}>Correo</Text> */}
                    <View style={registro.containerInputUsuario}>
                        <View>
                            <TextInput style={registro.textInput}
                                onChangeText={value => { setCorreo(value) }}
                                defaultValue={correo}
                                placeholder='Correo electronico'
                                autoCapitalize='none'
                            >          
                            </TextInput>
                        </View>
                    </View>
                    
                    {/* CONTRASEÑA */}
                    {/* <Text style={registro.textInputs}>Contraseña</Text> */}

                    <View style={[registro.containerInputContraseña]}>
                        {/* <View>
                            
                        </View> */}
                            <View>
                                <TextInput style={registro.textInputContrasena}
                                        onChangeText={value => { setContrasena(value) }}
                                        secureTextEntry={passwordVisibility}
                                        defaultValue={contrasena}
                                        placeholder='Contraseña'                                    
                                    >
                                </TextInput>
                            </View>
                            <View>
                                    <Pressable onPress={handlePasswordVisibility}>
                                        <FontAwesome name={rightIcon} size={24} color='#364E68' />
                                    </Pressable>
                            </View>
                    </View>

                    {/* <Text style={registro.textInputs}>Sexo</Text> */}
                    <Stack direction='row' justify='between' w={width * 0.950}>
                        <CheckBox
                        title="Masculino"
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor='#364E68'

                        // style={{color:'#0A7258'}}
                        />
                        <CheckBox
                        title="Femenino"
                        checkedColor='#10AC84'
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        />
                    </Stack>

                </View>

                <View style={[registro.containerBoton]}>
                    <View>
                        <Button title="Registrarme" 
                        titleStyle={{ fontWeight: '200', fontSize: 18 }}
                        loading={acceder}
                        buttonStyle={{
                            borderWidth: 0,
                            borderColor: 'transparent',
                            borderRadius: 200,
                            backgroundColor:'#364E68',
                            height:55,  
                        }}  onPress={()=>{fnRegistrarUsuario()}}/>
                    </View>
                    
                </View>

                <View style={registro.footer}>
                        <Text style={{fontSize:16}}>Ya tienes una cuenta?</Text>
                        <Button
                            title="Inicia sesión"
                            type="clear"
                            onPress={() => props.navigation.push('Login')}
                            titleStyle={{ fontSize:17, fontStyle:'normal',fontWeight:'800' ,color: '#364E68', textAlign:'left' }}
                        />
                </View>

            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}


    