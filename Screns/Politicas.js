import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ScrollView,RefreshControl ,Pressable,Text, View,Image,Dimensions,TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import {lista_oferta} from '../Shared/Estilos';
// const wait = timeout => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

export default function Politicas(props){

    const [usuario, setUusuario] = useState([]);
    const [id_usuario,setId] = useState(props.route.params?.id_usuario || '');
    const hora_de_ingreso = useState('08:00:00');
    const hora_de_salida = useState('08:00:00');
    return(
        <View style={lista_oferta.contenedor}>
                <StatusBar
                    backgroundColor=""
                    barStyle="dark-content"
                />
            
                <View style={lista_oferta.contenedor_menu}>
                    <View style={lista_oferta.contenedor_imagen}>
                        <Image
                            style={lista_oferta.foto_politica}
                            source={require('../assets/help.png')}
                        />
                    </View>
                    <View style={lista_oferta.contendedor_politicas}>
                        <View style={lista_oferta.politica_titulo}>
                            <Text>Politicas de EMEN HOTEL</Text>
                        </View>
                        <View style={lista_oferta.politica_cuerpo}>
                            <Text>Términos y condiciones para el uso de la App</Text>
                            <Text style={lista_oferta.texto_cuerpo}>
                                Toda la información brindada a nosotros no será compartida con ninguna aplicación , organización o base de datos externa, puede tener la seguridad y confianza en nosotros. Esperando que su estadia sea de las mejores y pueda
                                pasar momentos amenos en nuestras instalaciones.

                            </Text>
                            <Text style={lista_oferta.texto_cuerpo}>
                                
                                Tentiendo en cuenta de su conocimiento al crearse una cuenta con nosotros, usted confirmo que cuenta con la mayoria de edad que son 18 años, por lo cual es responsable de el uso de este aplicativo para las reservas en este establecimiento.

                            </Text>

                        </View>
                    </View>
                </View>
        </View>
    );
}