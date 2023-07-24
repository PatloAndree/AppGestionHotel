import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { TouchableOpacity,StyleSheet ,Pressable,Text, View,Image,Dimensions,TextInput,ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from '@rneui/themed';
import {recuperar_password} from '../Shared/Estilos';
import axios from '../Shared/Axios';


export default function OlvideContraseña(props){

    const [contrasena, setPass] = useState('');
    const [acceder, setAcceder] = useState(false);
    const [correo, setCorreo] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-slash');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
                setRightIcon('eye-slash');
                setPasswordVisibility(!passwordVisibility);
            } else if (rightIcon === 'eye-slash') {
                setRightIcon('eye');
                setPasswordVisibility(!passwordVisibility);
            }
    };

    const fnRecuperarContrasena = async () =>{
        setAcceder(true);
        if(correo.trim() == "" && contrasena.trim() == "" ){
            ToastAndroid.showWithGravity(
                'Ingrese sus datos',
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
            console.log("entrando 1");
            let registro = JSON.stringify({
                email: correo,
                password:contrasena,
              });
            await axios({
                method: 'post',
                url: "login/recuperarContrasena",
                data:registro,
              }).then(async function (d) {
                console.log(d.data);
                console.log('---------------------');
                if (d.data==0 ) {
                    ToastAndroid.showWithGravity(
                        'Atención, el correo ingresado no existe...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                      setAcceder(false);
                    console.log("entrando 2");

                }else {
                    let datos = d.data;
                    console.log("esta es mi data", datos);
                    setTimeout(() => {
                        props.navigation.push('Login');
                        ToastAndroid.showWithGravity(
                            'Exito, Se restablecio su contraseña !',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                          );
                          setAcceder(false);

                    }, 2000);
                    console.log("entrando 3");
                }
              }).catch(function (error) {
                  console.log(error);
                  setAcceder(false);
                  ToastAndroid.showWithGravity(
                    'Atención, hay un problema de conexión !',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                  console.log("no actualize");
                  console.log("entrando 4");

              });
        }
    };

    return(
        acceder,
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
    <View style={recuperar_password.containerLogin}>
             <StatusBar
                backgroundColor="#F3F1F5"
                barStyle="light-content"
            />
            <View style={recuperar_password.cabeceraFoto} >
                <Image  style={recuperar_password.image} source={require('../assets/send_mail.png')}></Image>
            </View>
            
            <View style={recuperar_password.espaciador}> 
                <Text style={recuperar_password.titulo}>Recuperar mi contraseña</Text>
             </View>

            <View style={recuperar_password.containerInputs_registro}>
                {/* <View >
                    <Text style={recuperar_password.titulo}>Iniciar sesión</Text>
                </View> */}
                {/* <Text style={recuperar_password.textInputs}>Correo</Text> */}
                <View style={recuperar_password.containerInputUsuario}>
                    <View>
                        <TextInput style={recuperar_password.textInput}
                            placeholder='Ingresa tu correo'
                            onChangeText={value => { setCorreo(value) }}
                            autoCapitalize='none'
                            defaultValue={correo}
                        >          
                        </TextInput>
                    </View>
                    <View>
                            <FontAwesome name='user' size={24} color='#ffff' />
                    </View>
                </View>
            </View>

            <View style={recuperar_password.containerInputs_registro}>
                {/* <Text style={recuperar_password.textInputs}>Nueva contraseña</Text> */}
                <View style={[recuperar_password.containerInputContraseña]}>
                        <View>
                            <TextInput style={recuperar_password.textInput}
                                    // placeholder='Contraseña'
                                    onChangeText={value => { setPass(value) }}
                                    secureTextEntry={passwordVisibility}
                                    defaultValue={contrasena}
                                    placeholder='Ingresa tu nueva contraseña'
                                    enablesReturnKeyAutomaticallyonChangeText={text => setPassword(text)}
                                >
                            </TextInput>
                        </View>
                        <View>
                            <Pressable onPress={handlePasswordVisibility}>
                                <FontAwesome name={rightIcon} size={24} color='#364E68' />
                            </Pressable>
                        </View>
                </View>
            </View>


            <View style={recuperar_password.espaciador2}></View>

            <View style={[recuperar_password.containerBoton]}>
                <View>
                    <Button 
                    title="Restablecer"
                    loading={acceder}
                    titleStyle={{ fontWeight: '200', fontSize: 17 }}
                    buttonStyle={{
                        backgroundColor:'#364E68',
                        borderRadius: 200,
                        height:55,  

                    }}  onPress={()=>{fnRecuperarContrasena();}}/>
                </View>

                <View style={recuperar_password.footer}>
                    <Text style={{fontSize:16}}>Ya tienes una cuenta?</Text>
                    <Button
                        title="Inicia sesión"
                        type="clear"
                        onPress={() => props.navigation.push('Login')}
                        titleStyle={{ fontSize:17, fontStyle:'normal',fontWeight:'700' ,color: '#364E68', textAlign:'left' }}
                    />
                </View>
                
                
            </View>

    </View>
 
    );
}

