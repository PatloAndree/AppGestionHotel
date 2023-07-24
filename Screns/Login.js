import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { BackHandler,Dimensions ,Pressable,Text, View,Image,ToastAndroid,Alert,TextInput,ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from '@rneui/themed';
import { useIsFocused } from "@react-navigation/native"; 
import {styles} from '../Shared/Estilos';
import axios from '../Shared/Axios';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function Login(props){

    const [usuario, setUusuario] = useState('');
    const [password, setPass] = useState('');
    const [acceder, setAcceder] = useState(false);
    const [fuente, setFuente] = useState(Boolean);
    const focus = useIsFocused(); 
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

    const fnValidarIngresar = async () =>{
        setAcceder(true);
        if(usuario.trim() == "" && password.trim() == ""){
            ToastAndroid.showWithGravity(
                'Ingresar usuario y contraseña',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            setAcceder(false);

        }else if(usuario.trim() == ""){
            ToastAndroid.showWithGravity(
                'Ingresar usuario',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            setAcceder(false);
              

        }else if(password.trim() == ""){
            ToastAndroid.showWithGravity(
                'Ingresar contraseña',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            setAcceder(false);
        }
        else{
            let datas = JSON.stringify({
                usuario: usuario ,
                contrasena: password
              });
            await axios({
                method: 'post',
                url: "login/login",
                data:datas,
              }).then(async function (d) {
                if (d != null || d != "") {
                    
                    if (d.data == -1 || d.data==0) {
                        ToastAndroid.showWithGravity(
                            'Error, intentelo de nuevo',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                          );
                          setAcceder(false);
                    }else {
                        let datos = d.data;
                            console.log("esta es mi data", datos);
                        await AsyncStorage.setItem('@reservas', JSON.stringify(datos));
                         setTimeout(() => {
                            props.navigation.push('MenuPrincipal',{nombreUsuario:datos.apellidos != null ? datos.nombres : datos.nombres , tipo:datos.tipo, id_usuario:datos.id});
                            ToastAndroid.showWithGravity(
                                'Bienvenido !',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                              );
                        }, 2000);
                    }
                }else{
                    ToastAndroid.showWithGravity(
                        'Error de conexión !',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                }

              }).catch(function (error) {
                  console.log(error);
                  setAcceder(false);
                  console.log("no entro");
                    console.log(d);
              });
        }
    };
        
    useEffect(() => {
        setAcceder(false);
        if(focus == true){ // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
            BackHandler.addEventListener('hardwareBackPress', ExitApp);
        }        
        return () => BackHandler.removeEventListener('hardwareBackPress', ExitApp);

      }, [focus],[ExitApp]);

      const ExitApp = () => {

        Alert.alert('Espera !', '¿ Deseas salir del App ?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Si', onPress: () => { BackHandler.exitApp()}},
        ]);
        return true;
      };

    return(
        
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
        <View style={styles.containerLogin}>
            
            <View style={styles.espaciador_bar}></View>
   
            <ImageBackground source={require('../assets/fondo2.jpg')}  style={{width:width*1,height:height*1}}>
                
                        <View style={styles.cabeceraFoto} >
                            <Image  style={styles.image} source={require('../assets/logi.png')}></Image>
                        </View>
                        <View style={styles.espaciador2}></View>
                    

                        <View style={styles.espaciador}> 
                    
                            <Text style={{
                                fontWeight:'400',
                                fontSize:25,
                                textAlign:'center',
                                color:'#ffff',
                            }}>Luxury Resort´s</Text>


                        </View>

                    <View style={styles.espaciador2}></View>


                    <View style={styles.containerInputs}>
                        {/* <View >
                            <Text style={styles.titulo}>Iniciar sesión</Text>
                        </View> */}
                        {/* <Text style={styles.textInputs}>Usuario</Text> */}

                        <View style={styles.containerInputUsuario}>
                            <View>
                                    <FontAwesome name='user' size={24} color='#495464' />
                            </View>
                            <View>
                                <TextInput style={styles.textInput}
                                    placeholder='Usuario'
                                    placeholderTextColor={'#495464'}
                                    onChangeText={value => { setUusuario(value) }}
                                    defaultValue={usuario}
                                    autoCapitalize='none'
                                >          
                                </TextInput>
                            </View>
                            <View>
                                    <FontAwesome name='at' size={22} color='#495464' />
                            </View>
                        </View>
                        
                        <View style={styles.espaciador2}></View>
                        {/* CONTRASEÑA */}
                            {/* <Text style={styles.textInputs}>Contraseña</Text> */}
                            
                        <View style={[styles.containerInputContraseña]}>
                                <View>
                                    <FontAwesome name='lock' size={24} color='#495464' />
                                </View>
                                <View>
                                    <TextInput style={styles.textInput}
                                            placeholder='Contraseña'
                                            placeholderTextColor={'#495464'}
                                            onChangeText={value => { setPass(value) }}
                                            secureTextEntry={passwordVisibility}
                                            defaultValue={password}
                                            enablesReturnKeyAutomaticallyonChangeText={text => setPassword(text)}
                                        >
                                    </TextInput>
                                </View>
                                <View>
                                    <Pressable onPress={handlePasswordVisibility}>
                                        <FontAwesome name={rightIcon} size={24} color='#495464' />
                                    </Pressable>
                                </View>
                        </View>
                    </View>

                    <View style={styles.espaciador2}></View>

                    <View style={[styles.containerBoton]}>
                        <View>
                            <Button 
                            title="Ingresar"
                            loading={acceder}
                            titleStyle={{ fontWeight: '400', fontSize: 19 }}
                            buttonStyle={{
                                backgroundColor:'rgba(39,79,103,0.93)',
                                borderRadius: 10,
                                height:55,  
                            }}  onPress={()=>{fnValidarIngresar()}}/>
                        </View>

                        {/* <View style={styles.espaciador2}></View> */}

                
                    </View>

                    <View style={styles.containerBoton}>
                        {/* <Text > Powered by  </Text>
                        <Image  style={styles.image_footer} source={require('../assets/logo.png')}></Image> */}
                        <View style={styles.footer}>
                            <Text style={{fontSize:16,color:'white',fontWeight:'500'}}>No tienes una cuenta?</Text>
                            <Button
                                onPress={() => props.navigation.push('Registro')}
                                title="Registrate aquí"
                                type="clear"
                                titleStyle={{ fontSize:16, fontStyle:'normal',fontWeight:'800', color: '#ffff' }}
                            />
                        </View>
                        <Button
                                title="Olvide mi contraseña"
                                type="clear"
                                onPress={() => props.navigation.push('OlvideContrasena')}
                                titleStyle={{ fontSize:16, fontStyle:'normal',fontWeight:'500',bottom:10 ,color: '#ffff' }}
                            />
                        
                    </View>

            </ImageBackground>

        </View>
 
    );
}

