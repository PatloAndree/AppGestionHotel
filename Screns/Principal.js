import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem } from '@rneui/themed';
import {mi_principal} from '../Shared/Estilos';
import axios from '../Shared/Axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Feather from 'react-native-vector-icons/Feather';

import { Badge } from '@rneui/themed';
// const wait = timeout => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

export default function Principal(props){

    const [usuario, setUusuario] = useState([]);
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');


    return(
     
    <View style={mi_principal.contenedor}>
            <StatusBar
                backgroundColor=""
                barStyle="dark-content"
            />
           
            {/* <View style={mi_principal.espaciador}>
                <Text>fsdf</Text>
            </View>
            <View style={mi_principal.espaciador}>
                <Text>fsdf</Text>
            </View> */}

            <View style={mi_principal.contenedor_menu}>
                <View style={mi_principal.espaciador}>
                </View>
                <View style={mi_principal.fila1}>
                    <View style={mi_principal.izquierdo}>
                    <Image style={mi_principal.menu_imagen} source={require('../assets/logoss.jpg')}></Image>
                    <Text>   </Text>
                    <Text style={mi_principal.textoIcono}>PAPACHO'S</Text>


                    </View>

                    <View style={mi_principal.derecho}>
                        <MaterialIcons name='menu' size={34} color='white' />
                        
                    </View>


                </View>

                <View style={mi_principal.fila2}>
                    <View style={mi_principal.containerInputUsuario}>
                        <Feather name='search' size={25} color='#86A3B8' />

                        <TextInput style={mi_principal.textInput}
                            // placeholder='Usuario'
                            // onChangeText={value => { setUusuario(value) }}
                            // defaultValue={usuario}
                            placeholder='Buscar...'
                            placeholderTextColor="#86A3B8" 
                            autoCapitalize='none'
                        >          
                        </TextInput>
                    </View>

                </View>

            </View>

            <View style={mi_principal.espaciador}>
            </View> 

            <View style={mi_principal.espaciador}>
                <Text style={mi_principal.subtitulos}>MENU PRINCIPAL</Text>
            </View> 

            <View style={mi_principal.contenedor_opciones}>
                <View style={mi_principal.opcion1}>
                    <Ionicons name='person-outline' size={34} color='white' />
                    
                </View>

                <View style={mi_principal.opcion2}>
                    <Ionicons name='ios-car-sport-outline' size={34} color='white' />

                </View>

                <View style={mi_principal.opcion3}>
                    <FontAwesome5 name='hamburger' size={34} color='white' />

                </View>

                <View style={mi_principal.opcion4}>
                    <MaterialCommunityIcons name='glass-cocktail' size={34} color='white' />

                </View>


            </View>

            <View style={mi_principal.espaciador}>
            </View> 

            <View style={mi_principal.espaciador}>
                <Text style={mi_principal.subtitulos}>POPULARES AHORA</Text>
            </View>

            <View style={mi_principal.contenedor_scroll}>
                <View>
                    <Image style={mi_principal.scroll_imagen} source={require('../assets/saludable.jpg')}></Image>

                </View>

                <View style={mi_principal.detalle}>
                    <View style={mi_principal.detalle1}>
                        <Text style={mi_principal.texto_detalle}>Gado en salsa Soya</Text>
                        <View style={mi_principal.stars}>
                            <Ionicons name='star' size={14} color='#FFC077' />
                            <Ionicons name='star' size={14} color='#FFC077' />
                            <Ionicons name='star' size={14} color='#FFC077' />
                            <Ionicons name='star' size={14} color='#FFC077' />
                            <Ionicons name='star' size={14} color='#FFC077' />
                            
                            <Text style={mi_principal.texto_stars}> (+ 100 recomendaciones)</Text>

                        </View>
                        

                    </View>

                    <View style={mi_principal.detalle2}>
                        {/* <Text>chau</Text> */}

                        <Ionicons name='heart' size={24} color='#FF0032' />
                        
                    </View>

                </View>

            </View>

            {/* TAB */}

        </View>
    );
}