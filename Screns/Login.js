import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { BackHandler,RefreshControl ,Pressable,Text, View,Image,ToastAndroid,TextInput,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import {styles} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function Login(props){

    const [usuario, setUusuario] = useState('');
    const [password, setPass] = useState('');
    const [acceder, setAcceder] = useState(false);
    const [fuente, setFuente] = useState(Boolean);


    const [fontsLoaded] = useFonts({
        'Open':require("../assets/fonts/OpenB.ttf"),
        'OpenBI':require("../assets/fonts/OpenBI.ttf"),
        // 'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
        // 'OpenR':require("../assets/fonts/OpenR.ttf"),
    });

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
                        await AsyncStorage.setItem('@asistencias', JSON.stringify(datos));
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
        setFuente(fontsLoaded);
       
      }, []);

    return(
        acceder,
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
    <View style={styles.containerLogin}>
            <StatusBar
                backgroundColor="#EEEEEE"
                barStyle="dark-content"
                // translucent = {true}
            />
            <View style={styles.cabeceraFoto} >
                <Image  style={styles.image} source={require('../assets/fondo.png')}></Image>
            </View>
            <View style={styles.espaciador2}></View>
            

            <View style={styles.espaciador}> 
                <Text style={{
                    // fontWeight:'800',
                    fontSize:21,
                    color:'#5C636E',
                    fontFamily: fontsLoaded == true ? 'OpenBI' : '' ,
                }}>T&M Asociados</Text>
                <Text style={{
                    fontWeight:'500',
                    fontSize:18,
                    color:'#6F7579',
                    fontFamily:fontsLoaded == true ? 'Open' : '' ,


                }}>Inciar sesión</Text>
                {/* <Text style={{fontFamily:"Open1", fontSize:20}}>Inciar sesión</Text> */}


            </View>

            <View style={styles.espaciador2}></View>


            <View style={styles.containerInputs}>
                {/* <View >
                    <Text style={styles.titulo}>Iniciar sesión</Text>
                </View> */}
                {/* <Text style={styles.textInputs}>Usuario</Text> */}

                <View style={styles.containerInputUsuario}>
                    <View>
                            <FontAwesome name='user' size={24} color='#364E68' />
                    </View>
                    <View>
                        <TextInput style={styles.textInput}
                            placeholder='Usuario'
                            placeholderTextColor={'#6F7579'}
                            onChangeText={value => { setUusuario(value) }}
                            defaultValue={usuario}
                            autoCapitalize='none'
                        >          
                        </TextInput>
                    </View>
                    <View>
                            <FontAwesome name='user' size={24} color='#ffff' />
                    </View>
                </View>
                
                <View style={styles.espaciador2}></View>
                {/* CONTRASEÑA */}
                    {/* <Text style={styles.textInputs}>Contraseña</Text> */}
                    
                <View style={[styles.containerInputContraseña]}>
                    {/* <View>
                    </View> */}
                        <View>
                            <FontAwesome name='lock' size={24} color='#364E68' />
                        </View>
                        <View>
                            <TextInput style={styles.textInput}
                                    placeholder='Contraseña'
                                    placeholderTextColor={'#6F7579'}
                                    onChangeText={value => { setPass(value) }}
                                    secureTextEntry={passwordVisibility}
                                    defaultValue={password}
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

            <View style={styles.espaciador2}></View>

            <View style={[styles.containerBoton]}>
                <View>
                    <Button 
                    title="Ingresar"
                    loading={acceder}
                    titleStyle={{ fontWeight: '400', fontSize: 19 }}
                    buttonStyle={{
                        
                        backgroundColor:'#364E68',
                        borderRadius: 200,
                        height:55,  
                        // borderWidth:1,
                        // borderColor:'#6ACAB2',
                        // shadowColor: "#10AC84",
                        // shadowOffset: {
                        //     width: 0,
                        //     height: 4,
                        // },
                        // shadowOpacity: 0.29,
                        // shadowRadius: 10,
                        // elevation: 9

                    }}  onPress={()=>{fnValidarIngresar();}}/>
                </View>

                <View style={styles.espaciador2}></View>

                <View style={styles.footer}>
                    <Text style={{fontSize:16}}>No tienes una cuenta?</Text>
                    <Button
                        onPress={() => props.navigation.push('Registro')}
                        title="Registrate aqui"
                        type="clear"
                        titleStyle={{ fontSize:16, fontStyle:'normal',fontWeight:'700', color: '#364E68' }}
                    />
                </View>
                <Button
                        title="Olvide mi contraseña"
                        type="clear"
                        onPress={() => props.navigation.push('OlvideContrasena')}
                        titleStyle={{ fontSize:16, fontStyle:'normal',fontWeight:'600',bottom:10 ,color: '#364E68' }}
                    />
                
            </View>
            <View style={styles.footer}>
                <Text > Powered by</Text>
                <Text style={{fontWeight:'bold',fontSize:15}}> TL Soft  </Text>

                {/* <Image  style={styles.image_footer} source={require('../assets/logo.png')}></Image> */}

            </View>

    </View>
 
    );
}

