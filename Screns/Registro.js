import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { BackHandler,KeyboardAvoidingView ,Text,ScrollView, View,Image,Dimensions,TextInput, Pressable, ToastAndroid, ImageBackground } from 'react-native';
import { Stack } from 'react-native-flex-layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/themed';
import {registro}  from '../Shared/Estilos';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function Registro(props){
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [acceder, setAcceder] = useState(false);
    const [selectedIndex, setIndex] = useState(1);
    const [selectEdad, setEdad] = useState(0);
    console.log(selectEdad);


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

    // <ImageBackground source={image} resizeMode="cover" style={{ flex:1,resizeMode:'stretch',width: width * 1 , alignItems:'center',}}>
    <KeyboardAvoidingView>

        <ScrollView>
            <View style={registro.containerLogin}>
                {/* <StatusBar backgroundColor="#F3F1F5" barStyle="light-content"/> */}

                <View style={registro.cabeceraFoto} >
                    <Image  style={registro.image} source={require('../assets/logi.png')}></Image>
                </View>

                <View style={registro.containerInputs}>

                    <View>
                        <Text style={registro.titulo}>Registrarme</Text>
                    </View>

                    {/* <Text style={registro.textInputs}>Nombres</Text> */}
                    <View style={registro.containerInputUsuario}>
                        <View>
                                <FontAwesome name='user' size={24} color='#495464' />
                        </View>
                        <View>
                            <TextInput style={registro.textInput}
                            onChangeText={value => { setNombres(value) }}
                            placeholderTextColor={'#495464'}
                            defaultValue={nombres}
                            placeholder='Nombres'
                            autoCapitalize='none'
                            >          
                            </TextInput>
                        </View>
                      
                    </View>

                    <View style={registro.containerInputUsuario}>
                        <View>
                                <FontAwesome name='user' size={24} color='#495464' />
                        </View>
                        <View>
                            <TextInput style={registro.textInput}
                            onChangeText={value => { setApellidos(value) }}
                            placeholderTextColor={'#495464'}
                                defaultValue={apellidos}
                                placeholder='Apellidos'
                                autoCapitalize='none'
                            >          
                            </TextInput>
                        </View>
                    </View>

                    {/* <Text style={registro.textInputs}>Correo</Text> */}
                    <View style={registro.containerInputUsuario}>
                        <View>
                                <Ionicons name='md-mail' size={24} color='#495464' />
                        </View>
                        <View>
                            <TextInput style={registro.textInput}
                                onChangeText={value => { setCorreo(value) }}
                                placeholderTextColor={'#495464'}

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
                            <View>
                                    <FontAwesome name='lock' size={24} color='#495464' />
                            </View>
                            <View>
                                <TextInput style={registro.textInputContrasena}
                                        onChangeText={value => { setContrasena(value) }}
                                        secureTextEntry={passwordVisibility}
                                        defaultValue={contrasena}
                                        placeholderTextColor={'#495464'}

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
                        containerStyle ={{backgroundColor: 'transparent',borderRadius:200}}
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor='#364E68'
                        

                        // style={{color:'#0A7258'}}
                        />
                        <CheckBox
                        title="Femenino"
                        checkedColor='#364E68'
                        containerStyle ={{backgroundColor: 'transparent',borderRadius:200}}
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        />
                    </Stack>

                    <Stack direction='row' justify='between' w={width * 0.950}>

                        <CheckBox
                            title="Acepto que soy mayor de edad (*) "
                            containerStyle ={{backgroundColor: 'transparent',borderRadius:200}}
                            checked={selectEdad === 1}
                            onPress={() => selectEdad === 1 ? setEdad(0) : setEdad(1)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor='#364E68'
                            

                            // style={{color:'#0A7258'}}
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
                            borderRadius: 10,
                            backgroundColor:'rgba(39,79,103,0.93)',
                            height:55,  
                        }}  onPress={()=>{}}/>
                    </View>
                    
                </View>

                <View style={registro.footer}>
                        <Text style={{fontSize:16,color:'#495464'}}>Ya tienes una cuenta?</Text>
                        <Button
                            title="Inicia sesión"
                            type="clear"
                            onPress={() => props.navigation.push('Login')}
                            titleStyle={{ fontSize:17, fontStyle:'normal',fontWeight:'800' ,color: '#495464', textAlign:'left' }}
                        />
                </View>

            </View>
        </ScrollView>

    </KeyboardAvoidingView>
    // </ImageBackground>
    
    );
}


    