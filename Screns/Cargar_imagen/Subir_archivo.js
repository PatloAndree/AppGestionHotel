import React, { useState, useEffect , useCallback} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, RefreshControl,StyleSheet , Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import axios from 'axios';
import axies from '../../Shared/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

let urlBase = 'http://192.168.18.30:82/Php_Hotel/uploads/imagen/';

export default function Subir_archivo() {

  const [image, setImage] = useState(null);
  const [sesion , setSesion] = useState([]);
  const [id_usuario,setIid_usuario] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState((new Date()));

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      if (!_image.canceled) {
        //   setImage(_image.assets[0].uri);
      }
      console.log(JSON.stringify(_image));
      const form = new FormData();
      form.append("user_id",id_usuario);
      form.append("foto",{
        uri: _image.assets[0].uri,
        type: 'image/jpeg',
        name: _image.assets[0].uri.substring(_image.assets[0].uri.lastIndexOf('/') + 1, _image.assets[0].uri.length)
      });
     
      console.log("esta es formdata", form);

      await axios({
            method: "post",
            url: "http://192.168.18.30:82/Php_Hotel/login/grabarFoto",
            data:form,
            timeout:  1000,
            headers: { "Content-Type": "multipart/form-data" } 
             })
            .then(response => {
                console.log("de aqui para abajo es mi formdata");
                setearImagen();
                console.log(response.data);
            })
            .catch(function(error) {
            console.log(error);
            });
            
        
    //  await axios.post('http://192.168.18.30:82/Php_Hotel/login/grabarFoto', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     timeout:  1000,
    //   }).then(response => {
    //     console.log(response.data);
    //   }).catch(error => {
    //     console.error(error);
    //   });

    //   await axios({
    //     method: 'post',
    //     url: "login/grabarFoto",
    //     formData,
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    //   }).then(async function (d) {
    //     console.log("esta es mi data"+ d.data);
    //   }).catch(function (error) {
    //       console.log(error);            
       
    //   });
  }


    const traerData = async () => {
        let datos_sesion = await AsyncStorage.getItem('@asistencias');
        let valores = JSON.parse(datos_sesion);
        setIid_usuario(valores.id);
        setImage(valores.nombre_imagen);
        
        console.log(valores);
    }

    const setearImagen = async () => {
        let data = JSON.stringify({
            usuario:id_usuario,
        });
        await axies({
            method: 'post',
            url: "login/getUsuario",
            data:data,
          }).then(async function (d) {
            if (d.data != 0) {
                let datos = d.data;
                setImage(datos.nombre_imagen);
            }
          }).catch(function (error) {
              console.log(error);            
          });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // wait(5000).then(() => 
        refresh,
        setTimeout(() => {
            traerData(),
            setRefreshing(false);
        }, 3000);
    }, []);

  useEffect(() => {
    traerData();
    onRefresh();
    // setearImagen();
    // setImage(urlBase);

  }, [refresh]);
  return (
        // <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
        // </ScrollView>
            <View style={imageUploaderStyles.container}>
                    <View style={imageUploaderStyles.imagen_box}>
                    {
                        image == null ?
                        <Image source={require('../../assets/avatar.jpg')} style={imageUploaderStyles.imagen} />

                        :
                        <Image source={{ uri:urlBase+image }} style={imageUploaderStyles.imagen} />
                    }
                    </View>
                    
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                                {/* <Text style={imageUploaderStyles.texto}>Subir</Text> */}
                                <AntDesign name="camera" size={25} color="#FFFF" />
                            </TouchableOpacity>
                        </View>
            </View>
  )
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        // elevation:1,
        width: (width * 0.870),
        height: (height * 0.130),        
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
    },
    imagen_box:{
        width:(width * 0.230),
        // backgroundColor:'blue',
        // borderRadius:50
    },
    imagen:{
        width: ( width * 0.300),
        height: (height * 0.145),
        borderRadius:60,
        // borderWidth:2,
        // 82CD47
        // borderColor:'#54B435',
        resizeMode:'contain'

        // backgroundColor:'red'
    },
    uploadBtnContainer:{
        // opacity:0.7,
        // position:'absolute',2
        // backgroundColor:'lightgrey',
        width:(width * 0.120),
        justifyContent:'flex-end',
        // backgroundColor:'red'
    },
    uploadBtn:{
        backgroundColor:'#02475E',
        // borderWidth:1,
        // borderRadius:50,
        borderColor:'#548CA8',
        borderRadius:60,
        width: ( width * 0.115),
        height: (height * 0.055),
        // display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    texto:{
        color:'white'
    }
})