import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { TouchableOpacity,StyleSheet ,Pressable,Text, View,Image,Dimensions,TextInput,ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from '@rneui/themed';
import {recuperar_password} from '../Shared/Estilos';



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

    return(
        acceder,
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
    <View style={recuperar_password.containerLogin}>
             <StatusBar
                backgroundColor="#FCFCFC"
                barStyle="dark-content"
            />
            <View style={recuperar_password.cabeceraFoto} >
                <Image  style={recuperar_password.image} source={require('../assets/logi.png')}></Image>
                <Text style={recuperar_password.titulo_principal}></Text>

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
                    <Ionicons name='md-mail' size={24} color='#495464' />
                            
                    </View>
                    <View>
                        <TextInput style={recuperar_password.textInput}
                            placeholder='Ingresa tu correo'
                            onChangeText={value => { setCorreo(value) }}
                            autoCapitalize='none'
                            placeholderTextColor={'#495464'}
                            defaultValue={correo}
                        >          
                        </TextInput>
                    </View>
                    <View>
                            <FontAwesome name='user' size={24} color='rgba(205, 209, 209, 0.03)' />
                    </View>
                </View>
            </View>

            <View style={recuperar_password.containerInputs_registro}>
                {/* <Text style={recuperar_password.textInputs}>Nueva contraseña</Text> */}
                <View style={[recuperar_password.containerInputContraseña]}>
                        <View>
                        <Ionicons name='lock-closed-sharp' size={24} color='#495464' />
                                
                        </View>
                        <View>
                            <TextInput style={recuperar_password.textInput}
                                    // placeholder='Contraseña'
                                    onChangeText={value => { setPass(value) }}
                                    secureTextEntry={passwordVisibility}
                                    placeholderTextColor={'#495464'}
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
                        backgroundColor:'rgba(39,79,103,0.93)',
                        borderRadius: 10,
                        height:55,  

                    }}  onPress={()=>{}}/>
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

