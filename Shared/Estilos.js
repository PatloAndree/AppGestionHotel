import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Constants from 'expo-constants';
import {NativeModules} from 'react-native';
// import { useHeaderHeight } from '@react-navigation/elements';
// const headerHeight = useHeaderHeight();
    const {StatusBarManager} = NativeModules;
    const heightStatus = StatusBarManager.HEIGHT;
    // blanco plomo F1F2F3
    const colors = {
    backgroundPanel: '#10AC84',
    backgroundColor: '#FCFCFC',
    primary: '#2199F5',
    secondary: '#263238',
    default: '#FFFFFF',
    info: '#2055eb',
    success: '#2E7D32',
    warnning: '#fffb9e',
    error: '#ec5a65',
    black: '#000000'
    };

    const styles = StyleSheet.create({
        image: {
            alignSelf: 'center',
            width: ( width * 1 ),
            height:( height * 0.250 ),
            backgroundColor:'white',
            // borderBottomEndRadius:200,
            // borderBottomStartRadius:200,
            borderBottomRightRadius:200,
            borderBottomLeftRadius:200,
        },
        containerLogin: {
            height: (height * 1000),
            // flex: 1,
            backgroundColor:'white'
        },
        cabeceraFoto:{
            height:( height * 0.320 ),
            justifyContent:'center',
            flexDirection:'column',
            // backgroundColor:'#67D1DB', //10AC84
            // borderBottomLeftRadius:100,
            borderBottomEndRadius:200,
            borderBottomStartRadius:200,
            borderBottomRightRadius:100,


            // backgroundColor:'#3E64FF'
        },
        espaciador:{
            height: ( height * 0.100 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            // backgroundColor:'#3E64FF'
            // alignContent:'center',
            // backgroundColor:'#C3ACD0'
        },
        espaciador2:{
            height: ( height * 0.030 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
        },
        containerInputs:{
            height:( height * 0.250 ),  
            alignItems:'center',
            width:'100%',
            flexDirection:'column',
            justifyContent:'center',
            // backgroundColor:'#B4B5B5'

        }, 
        containerInputs_registro:{
            height:( height * 0.150 ),  
            alignItems:'center',
            width:'100%',
            // backgroundColor:'#F1D88D',
            // justifyContent:'center',
            flexDirection:'column'
        }, 
        titulo:{
            fontWeight:'800',
            fontSize:21,
            color:'#10AC84'
        },
        subTitulo:{
            fontWeight:'500',
            fontSize:18,
            color:'#6F7579'
        },
        textInputs:{
            textAlign:'left',
            alignSelf:'center',
            width:  ( width *  0.920 ),
            // backgroundColor:'#000'
        },
        containerInputUsuario:{
            // borderWidth:0.5,
            borderRadius:200,
            borderWidth:.4,
            borderColor:'#364E68',
            alignItems:'center',
            width:  ( width *  0.920 ),
            height: ( height * 0.070 ),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        },
        containerInputContraseña:{
            // borderWidth:0.5,
            borderRadius:200,
            borderWidth:.4,
            borderColor:'#364E68',
            alignItems:'center',
            width: ( width * 0.920 ),
            height: ( height * 0.070),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        
        },
        textInput:{
            width: ( width * 0.600  ),
        },
        espaciador2:{
            height: ( height * 0.010 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            // alignContent:'center',
            // backgroundColor:'#C3ACD0'
        },
        containerBoton:{
            width:'100%',
            height: ( height * 0.230 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            // backgroundColor:'#E8E2E2',
            justifyContent:'flex-start',
            // marginBottom:( height * 0.050)
            
        },
        buttonIngresar:{
            width:  ( width *  0.920 ),
            borderRadius:10
        },
        footer:{
            flexDirection:'row',
            height: ( height * 0.070 ),
            // backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center',
            position: 'relative', //Here is the trick
            bottom: 0,
        },
        image_footer:{
            width: ( width * 0.250 ),
            height: ( height * 0.050),
        }

    });

    const recuperar_password = StyleSheet.create({
        image: {
            alignSelf: 'center',
            width: ( width * 0.870 ),
            height:( height * 0.280 ),
        },
        containerLogin: {
            height: (height * 1000),
            // flex: 1,
            backgroundColor:'white'
        },
        cabeceraFoto:{
            height:( height * 0.350 ),
            justifyContent:'center',
            flexDirection:'column',
            // backgroundColor:'#3E64FF'
        },
        espaciador:{
            height: ( height * 0.100 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
        },
        containerInputs:{
            height:( height * 0.270 ),  
            alignItems:'center',
            width:'100%',
            flexDirection:'column'
        }, 
        containerInputs_registro:{
            height:( height * 0.120 ),  
            alignItems:'center',
            width:'100%',
            // backgroundColor:'#F1D88D',
            // justifyContent:'center',
            flexDirection:'column'
        }, 
        titulo:{
            fontWeight:'500',
            fontSize:19,
            color:'#606470'
        },
        textInputs:{
            textAlign:'left',
            alignSelf:'center',
            width:  ( width *  0.920 ),
            // backgroundColor:'#000'
        },
        containerInputUsuario:{
            borderWidth:0.5,
            borderRadius:200,
            borderColor:'#364E68',
            alignItems:'center',
            width:  ( width *  0.920 ),
            height: ( height * 0.070 ),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        },
        containerInputContraseña:{
            borderWidth:0.5,
            borderRadius:200,
            borderColor:'#364E68',
            alignItems:'center',
            width: ( width * 0.920 ),
            height: ( height * 0.070),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        
        },
        textInput:{
            width: ( width * 0.720  ),
        },
        espaciador2:{
            height: ( height * 0.010 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            // alignContent:'center',
            // backgroundColor:'#C3ACD0'
        },
        containerBoton:{
            width:'100%',
            height: ( height * 0.230 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            // backgroundColor:'#E8E2E2',
            justifyContent:'flex-start',
            // marginBottom:( height * 0.050)
            
        },
        buttonIngresar:{
            width:  ( width *  0.920 ),
            borderRadius:10
        },
        footer:{
            flexDirection:'row',
            height: ( height * 0.070 ),
            // backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center',
            position: 'relative', //Here is the trick
            bottom: 0,
    
        }
    
    });

    const registro = StyleSheet.create({

        image: {
            alignSelf: 'center',
            width: ( width * 0.700 ),
            height:( height * 0.270 ),
        },
        containerLogin: {
            height: (height * 1000),
            width: (width * 1),
            backgroundColor:'white'
        },
        cabeceraFoto:{
            height:( height * 0.300 ),
            justifyContent:'center',
            flexDirection:'column',
            // backgroundColor:'#3E64FF'
        },
        containerInputs:{
            height:( height * 0.530 ),  
            alignItems:'center',
            width:'100%',
            // backgroundColor:'#F1D88D',
            // justifyContent:'center',
            flexDirection:'column'
        }, 
        sexo:{
            flexDirection:'row',
            // alignContent:'space-between',
            width : (width * 0.9),
            // backgroundColor:'tomato'
        },
        titulo:{
            fontWeight:'bold',
            fontSize:19,
            bottom:20,
            marginTop:20,
            color:'#606470'
        },
        textInputs:{
            textAlign:'left',
            alignSelf:'center',
            width:  ( width *  0.920 ),
        },
        containerInputUsuario:{
            borderWidth:0.5,
            borderRadius:200,
            borderColor:'#364E68',
            alignItems:'center',
            width:  ( width *  0.920 ),
            height: ( height * 0.070 ),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-around',
        },
        containerInputContraseña:{
            borderWidth:0.5,
            borderRadius:200,
            borderColor:'#364E68',
            alignItems:'center',
            width: ( width * 0.920 ),
            height: ( height * 0.070),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        },
        textInput:{
            width: ( width * 0.820  ),
        },
        textInputContrasena:{
            width: ( width * 0.750  ),
        },
        containerBoton:{
            width:'100%',
            height: ( height * 0.070 ),
            width:  ( width *  0.920 ),
            alignSelf:'center',
            // backgroundColor:'tomato',
            justifyContent:'flex-start',
            // marginBottom:( height * 0.050)
            
        },
        buttonIngresar:{
            width:  ( width *  0.920 ),
            borderRadius:10
        },
        footer:{
            flexDirection:'row',
            height: ( height * 0.070 ),
            // backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center'
    
        }
    
    });

    const menu_index = StyleSheet.create({
        contenedor:{
            backgroundColor: (colors.backgroundColor),
            alignItems:'center',
            height: height ,
            flex:1
        },
        espaciador:{
            height: heightStatus,
            // backgroundColor: '#10AC84',
            width: (width * 1),

        },
        detalle_usuario:{
            height: (height * 0.140),
            width: (width * 1),
            // justifyContent:'space-around',
            alignItems:'center',
            backgroundColor: (colors.backgroundColor),
            flexDirection:'column',
            borderBottomEndRadius:20,
            borderBottomStartRadius:20,
        },
        fila1:{
            width : (width * 0.900),
            height: (height * 0.080),
            // backgroundColor: 'red',
            justifyContent:'space-between',
            alignItems:'center',
            flexDirection:'row',
            borderColor:'white',
            // borderWidth:.4,
            borderRadius:20
        },
        fila2:{
            width: (width * 0.900),
            height: (height * 0.040),
            // backgroundColor: 'green',
            flexDirection:'row',

        },
        detalle_usuario_c1:{
            width: (width * 0.160),
            justifyContent:'flex-end',
            alignItems:'flex-end'
        },
        imagen_logo:{
            width:45,
            height:45,
            borderWidth:1,
            borderRadius:10,
        },
        detalle_usuario_c2:{
            backgroundColor: '#FFFFFF',
            width: (width * 0.110),
            height: (height * 0.050),
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
            borderWidth:1,
            borderColor:'#FCFCFC',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        titulo:{
            fontSize:18,
            fontWeight:'500',
            color:'#214151'
        },
        subtitulo:{
            fontSize:19,
            fontWeight:'600',
            color:'#214151',
        },
        detalle_usuario_c3:{
            // backgroundColor: 'yellow',
            width: (width * 0.900),
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center'
        },
        cuerpoMedio:{
            backgroundColor:'#ffff',
            height: (height * 0.880),
            width: (width * 1),
            borderTopEndRadius:30,
            borderTopStartRadius:30,
            alignItems:'center',
            borderRadius:5,
            borderWidth:1,
            borderColor:'#FCFCFC',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

        },
        menu_grid:{
            height: (height * 0.130),
            width: (width * 0.850),
            // backgroundColor:'red',
            alignSelf:'center',
        },
        Campo: {
            flexDirection: 'row',
            width: (width * 0.850),
            height: (height * 0.130),
            marginBottom:20,
            justifyContent:'space-around',
            // backgroundColor:'#F3F3F3'
        },
        imagen_menu:{
            width: (width * 0.100),
            height:(height * 0.050),
            top:5
        
        },
        contorno_img:{
            width: (width * 0.150),
            height:(height * 0.065),
            // justifyContent:'flex-end',
            //F8F0DF
            backgroundColor:'#FCFCFC',
            alignItems:'center',
            // alignItems:'stretch',
            borderWidth:1,
            borderRadius:5,
            borderColor:'#EEF2F5',
            alignItems:'center',
            borderRadius:5,
            borderWidth:1,
            borderColor:'#FCFCFC',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            // borderColor:'#E1EEDD'
        },
        buttonText: {
            // backgroundColor:'#3366FF',
            borderRadius:5,
            top:10,
            color: '#000',
            textAlign: 'center',
            fontSize: 13
        },
        menu_central:{
            height: (height * 0.300),
            width: (width * 0.950),
            // backgroundColor:'green',
            alignSelf:'center',
            // top: (height * 0.010)
        },
        slider:{
            height: (height * 0.170),
            width: (width * 0.950),
            alignSelf:'center',
            // backgroundColor:'tomato',
        },
        imagen_slider:{
            height: (height * 0.200),
            width: (width * 0.900),
            borderRadius:15,
            resizeMode:'contain'
        },
        textoSlider:{
            fontSize:16,
            fontWeight:'500',
            color:'#2B4865'
        },
        menu_aviso:{
            height: (height * 0.100),
            width: (width * 0.900),
            backgroundColor:'#FCFCFC',
            justifyContent:'space-around',
            // top: (height * 0.040),
            flexDirection:'row',
            borderRadius:5,
            borderWidth:1,
            borderColor:'#E1E1E1',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        menu_aviso_img:{
            width: (width * 0.220),
            height: (height * 0.100),
            justifyContent:'center', //centro forma vertical
            alignItems:'center', //centro forma horizontal
            // backgroundColor:'purple',
            
        },
        menu_aviso_texto:{
            width: (width * 0.600),
            height: (height * 0.100),
            justifyContent:'center', //centro forma vertical
            alignItems:'center', //centro forma horizontal
            flexDirection:'column',
            // backgroundColor:'yellow',
        },  
        titulo_aviso:{
            fontWeight:'600',
            fontSize:16,
            color:'#1A2E35',
            bottom:5
        },
        subtitulo_aviso:{
            fontWeight:'500',
            color:'#1A2E35'
        },
        imagen_aviso:{
            height: (height * 0.090),
            width: (width * 0.210),
            borderRadius:5,
            resizeMode:'cover'
        },
        textoSlider_dudas:{
            fontSize:16,
            // textAlign:'center',
            fontWeight:'500',
            color:'#2B4865'
        },
        footer:{
            alignSelf:'center',
            alignItems: 'center',
            textAlign:'center',
            position: 'absolute', //Here is the trick
            bottom: (width * 0.200), //Here is the trick
            borderWidth:1,
            borderRadius:5
        },
        opcionMenu:{
            backgroundColor:'white',
            height:140, 
            justifyContent:'space-evenly',
            flexDirection:'column'
        },
        botonesMenu:{
            backgroundColor:'#ffff',
            height:(height * 0.065),
            borderRadius:4,
            borderWidth:.2,
            borderColor:'#FCFCFC',
            alignItems:'center',
            justifyContent:'flex-start',
            flexDirection:'row',
            shadowColor: "#7B8FA1",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        botonesMenuC:{
            backgroundColor:'#ffff',
            height:(height * 0.065),
            borderRadius:4,
            borderWidth:.2,
            borderColor:'#FCFCFC',
            alignItems:'center',
            justifyContent:'flex-start',
            flexDirection:'row',
            shadowColor: "#7B8FA1",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        textoMenu:{
            fontSize:15,
            fontWeight:'600',
            color:'#2E86C6',
            marginLeft:10
        },
        textoMenuR:{
            fontSize:15,
            fontWeight:'600',
            color:'#FF6464',
            marginLeft:10
        },
        textoTitulo:{
            fontSize:15,
            fontWeight:'600',
            color:'#6E828A',
            marginLeft:10
        },

    });

    const menu_perfil = StyleSheet.create({
    contenedor:{
        height: (height * 1),
        width: (width * 1),
        backgroundColor:'white',
        alignItems:'center'
    },
    separador:{
        height: (height * 0.020)

    },
    cabecera:{
        // backgroundColor:'tomato',
        width: (width * 0.900),
        height: (height * 0.150),
        flexDirection:'row',
        // justifyContent:'space-around'

    },
    cabecera_derecha:{
        width: (width * 0.400),
        // backgroundColor:'pink',

    },
    cabecera_izquierda:{
        width: (width * 0.400),
        // backgroundColor:'purple',
    },
    cuerpo:{
        width: (width * 0.900),
        height: (height * 0.480),
        alignItems:'center'
        // backgroundColor:'yellow',
    },
    containerInputUsuario:{
        borderWidth:.4,
        borderRadius:200,
        borderColor:'#848789',
        // borderBottomWidth:.4,
        alignItems:'center',
        width:  ( width *  0.900 ),
        height: ( height * 0.060 ),
        marginTop:5,
        marginBottom:7,
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },    
    textInput:{
        width:  ( width *  0.720 ),
    },
    text_color:{
        color:'#7F8487',
        fontWeight:'600'
    },
    input_gemeral:{
        // borderRadius:5,
        // borderWidth:1
    },  
    seleccionar:{
        width:  ( width *  0.900 ),
        marginTop:10,
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'#D1D1D1',
        backgroundColor:'white',
        fontSize:13
    },
    dropdown:{
        fontSize:15
    },
    pie:{
        flexDirection:'row',
        width: (width * 0.870),
        height: (height * 0.080),
        justifyContent:'space-between',
        // backgroundColor:'green'
    },

    });

    const listado = StyleSheet.create({
        containerLogin: {
            height: (height * 1),
            alignItems:'center',
            backgroundColor:'white'
        },
        espaciador:{
            height: ( height * 0.030 ),
            // width:  ( width *  0.920 ),
            // alignSelf:'center',
            // justifyContent:'center',
            // alignItems:'center',
        },
        imagen_check:{
            width : (width * 0.080),
            height: (height * 0.040),
        },
        cuerpo_principal:{
            width : (width * 0.950),
            height: (height * 0.500),
            // borderWidth:1,
            // borderRadius:3,
            borderColor:'#4D455D',
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 5,
        },
        cuerpo_principal2:{
            width : (width * 0.920),
            height: (height * 0.700),
            // borderWidth:.1,
            // borderRadius:3,
            // borderColor:'#4D455D',
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 5,
        },
        border_item:{
            // margin:5,
            // borderWidth:1,
            // width : (width * 0.520),

            borderRadius:1,
            // borderColor:'#D6E4E5',
            borderColor:'#000',
            borderWidth:2,

        },
        contenedor_info:{
            
            height: (height * 0.130),
            width : (width * 0.600),
            borderRadius:5,
            flexDirection:'row',
     
        },
        lado_izquierdo:{
            // backgroundColor:'tomato',
            width : (width * 0.270),
            height: (height * 0.130),
            alignSelf:'flex-end'
            
        },
        lado_derecho:{
            // backgroundColor:'green',
            width : (width * 0.300),
            height: (height * 0.130),

        },

        texto_info_derecha:{
            color:'#474E68',
            marginLeft:5,
            fontSize:13,
            fontWeight:'600',
            textAlign:'left'
        },
        texto_info_derecha_titulo:{
            // marginLeft:10,
            color:'#20262E',
            fontSize:15,
            fontWeight:'700',
            textAlign:'right'
        },
        texto_info_izquierda:{
            color:'#474E68',
            fontSize:13,
            fontWeight:'600',
            textAlign:'left'
            
        },
        texto_info_izquierda_titulo:{
            color:'#20262E',
            marginLeft:5,
            fontSize:15,
            fontWeight:'700',
            textAlign:'left'

        },
        contenedorFecha:{
            width : (width * 0.950),
            height: (height * 0.100),
            backgroundColor:'white',
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderWidth:.5,
            borderColor:'#f3f3f3',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        contenedorFecha1:{
            // backgroundColor:'red',
            width : (width * 0.350),
            height: (height * 0.080),
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center'



        },
        contenedorFecha2:{
            // backgroundColor:'blue',
            width : (width * 0.350),
            height: (height * 0.080),
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center'



        },contenedorFecha3:{
            // backgroundColor:'yellow',
            width : (width * 0.250),
            height: (height * 0.080),
            justifyContent:'center',
            alignItems:'center'
        },
        resultados:{
            width : (width * 0.950),
            height: (height * 0.580),
            // backgroundColor:'red'
        }


    });

    const marcar_asistencia = StyleSheet.create({
        containerLogin: {
            height: (height * 1),
            alignItems:'center',
            backgroundColor:'white',
            
        },
        cuadro_biendenida:{
            height: ( height * 0.200 ),
            width : (width * 0.900),
            // borderWidth:1

        },
        imagen_bienvenida:{
            height: ( height * 0.200 ),
            width : (width * 0.900),
        },
        fecha_hora:{
            height: ( height * 0.060 ),
            width : (width * 0.250),
            bottom:  ( height * 0.110),
            backgroundColor:'white',
            alignItems:'center',
        },
        fecha_texto:{
         fontSize:17,
         fontFamily:'monospace',
         fontWeight:'600'
        },
        espaciador:{
            height: ( height * 0.020 ),
            flexDirection:'row'
        },
        espaciador2:{
            height: ( height * 0.050 ),
            flexDirection:'row'
        },
        text_espaciador:{
            fontSize:18,
            fontWeight:'500'
        },
        cuerpo_principal:{
            width : (width * 0.9),
            height: (height * 0.430),
            borderRadius:5,
            flexDirection:'column',
            justifyContent:'space-around',
          
            // backgroundColor:'#FAF8F1',
        },
        cuerpo_entrada:{
            width : (width * 0.9),
            height: (height * 0.100),
            backgroundColor:'#FAF8F1',
            flexDirection:'row',
            alignItems:'center',
            borderWidth:.5,
            borderRadius:5,
            borderColor:'#FFFBF5',
            borderRadius:3,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        cuerpo_imagen:{
            width : (width * 0.200),
            height: (height * 0.100),
            alignItems:'center',
            justifyContent:'center',
        },
        imagen:{
            width : (width * 0.130),
            height: (height * 0.070),
        },
        imagen_check:{
            width : (width * 0.080),
            height: (height * 0.040),
        },
        cuerpo_texto:{
            width : (width * 0.500),
            height: (height * 0.100),
            alignItems:'center',
            justifyContent:'center'
        },
        cuerpo_boton:{
            width : (width * 0.200),
            height: (height * 0.100),
            alignItems:'center',
            justifyContent:'center'

        },
        cuerpo_refrigerio:{
            width : (width * 0.9),
            height: (height * 0.100),
            flexDirection:'row',
            alignContent:'center',
            alignItems:'center',
            backgroundColor:'#FAF8F1',
            borderColor:'#4D77FF',
            borderWidth:.4,
            borderRadius:5,
            borderColor:'#FFFBF5',
            borderRadius:3,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,

        },
        cuerpo_salida:{
            width : (width * 0.9),
            height: (height * 0.100),
            flexDirection:'row',
            alignContent:'center',
            alignItems:'center',
            backgroundColor:'#FAF8F1',//C1F4C5
            borderColor:'#4D77FF',
            borderWidth:.4,
            borderRadius:5,
            borderRadius:5,
            borderColor:'#FFFBF5',
            borderRadius:3,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,

        },
        contenedor_info:{
            // backgroundColor:'#2155CD',
            borderColor:'#03C988',
            borderWidth:1,
            height: (height * 0.100),
            width : (width * 0.6),
            borderRadius:5,
        },
        texto_info:{
            color:'#474E68',
            marginLeft:5,
            fontSize:12.4,
            fontWeight:'600',
        }

    });

    const mis_alertas = StyleSheet.create({
        containerLogin: {
            height: (height * 1),
            alignItems:'center',
            backgroundColor:'#FFFFFF',
        },
        espaciadorAltura:{
            height: heightStatus,
            // backgroundColor: '#10AC84',
            width: (width * 1),
    
        },
        espaciador:{
            height: ( height * 0.040 ),
            width:  ( width *  0.920 ),
            alignItems:'center'
        },
        cuerpo_principal:{
            width : (width * 0.900),
            height: (height * 0.500),
            // borderWidth:.1,
            // borderRadius:2,
            // borderColor:'#4D455D',
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 1,
            // },
            // shadowOpacity: 0.20,
            // shadowRadius: 1.04,
            // elevation: 4,
        },
        contenedor_info_alerta:{
            height: (height * 0.030),
            width : (width * 0.8),
            borderRadius:5,
            alignItems:'center',
            justifyContent:'center'
        },
        texto_info:{
            color:'#474E68',
            // height: (height * 0.040),
            marginLeft:5,
            fontSize:17.4,
            fontWeight:'600',
            // backgroundColor:'tomato'
        },
        dropdown2BtnStyle: {
            width : (width * 0.900),
            height: 50,
            borderWidth:.5,
            borderColor:'#999999',
            backgroundColor:'white',
            borderRadius: 8,
          },
          alertar:{
            width : (width * 1),
            height: (height * 0.800),
            backgroundColor:'yellow'
          },
          alertas:{
            width : (width * 1),
            height: (height * 0.800),
            backgroundColor:'green'
          },
          textarea:{
            borderWidth:.5,
            borderColor:'#999999',
            width: (width * 0.900),
            borderRadius: 5,
            textAlignVertical: 'top',
            paddingLeft:10,
            paddingTop:10
            
          },
          boton_enviar:{
            height: ( height * 0.010 ),
            width:  ( width *  0.900 ),
          },
          border_item:{
            margin:5,
            borderWidth:1,
            borderRadius:1,
            borderColor:'#D6E4E5',
            // backgroundColor:'#F3EFE0',
        },
        contenedor_info:{
            width : (width * 0.700),
            borderRadius:5,
            // backgroundColor:'red',
            // borderWidth:.5,
            // borderColor:'#C2DED1',
            borderRadius:5,
            flexDirection:'row'
        },
        lado_izquierdo:{
            // backgroundColor:'tomato',
            width : (width * 0.270),
            height: (height * 0.130),
            alignSelf:'flex-end'
        },
        lado_derecho:{
            // backgroundColor:'green',
            width : (width * 0.330),
            height: (height * 0.130),
        },

        texto_info_derecha:{
            color:'#474E68',
            marginLeft:5,
            fontSize:13,
            fontWeight:'600',
            textAlign:'left'
        },
        texto_info_derecha_titulo:{
            width : (width * 0.600),
            // backgroundColor:'red',
            // marginTop:15,
            color:'#20262E',
            fontSize:15,
            fontWeight:'700',
            textAlign:'center'
        },
        texto_info_izquierda:{
            color:'#474E68',
            fontSize:13,
            fontWeight:'600',
            textAlign:'right'
            
        },
        texto_info_izquierda_titulo:{
            color:'#20262E',
            marginLeft:5,
            fontSize:15,
            fontWeight:'700',
            textAlign:'left'
        },
        texto_info_izquierda_mensaje:{
            width : (width * 0.650),
            flex:1,
            color:'#73777B',
            marginLeft:5,
            fontSize:13,
            fontWeight:'700',
            textAlign:'justify',
            // bottom:3,
            // textAlign:'left'
        },
        campo_icono:{
            // backgroundColor:'red',
            height: (height * 0.080),
            justifyContent:'space-around',
            alignItems:'center'

        }

    });

    const mis_avisos = StyleSheet.create({
        containerLogin: {
            height: (height * 1),
            alignItems:'center',
            backgroundColor:'white',
        },
        espaciador:{
            height: ( height * 0.020 ),
            width:  ( width *  0.920 ),
            alignItems:'center'
        },
        cuerpo_principal:{
            width : (width * 0.920),
            height: (height * 0.500),
            borderWidth:.1,
            borderRadius:2,
            borderColor:'#4D455D',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.04,
            elevation: 4,
        },
        contenedor_info_alerta:{
            height: (height * 0.030),
            width : (width * 0.7),
            borderRadius:5,
            alignItems:'center',
            justifyContent:'center'
        },
        texto_info:{
            color:'#474E68',
            // height: (height * 0.040),
            marginLeft:5,
            fontSize:17.4,
            fontWeight:'600',
            // backgroundColor:'tomato'

        },
        dropdown2BtnStyle: {
            width : (width * 0.900),
            height: 50,
            borderWidth:.5,
            borderColor:'#999999',
            backgroundColor:'white',
            borderRadius: 8,
          },
          alertar:{
            width : (width * 1),
            height: (height * 0.800),
            backgroundColor:'yellow'
          },
          alertas:{
            width : (width * 1),
            height: (height * 0.800),
            backgroundColor:'green'
          },
          textarea:{
            borderWidth:.5,
            borderColor:'#999999',
            width: (width * 0.900),
            borderRadius: 5,
            textAlignVertical: 'top',
            paddingLeft:10,
            paddingTop:10
            
          },
          boton_enviar:{
            height: ( height * 0.010 ),
            width:  ( width *  0.900 ),
          },
          border_item:{
            margin:5,
            borderWidth:1,
            borderRadius:1,
            borderColor:'#D6E4E5',
            // backgroundColor:'#F3EFE0',

        },
        contenedor_info:{
            height: (height * 0.130),
            width : (width * 0.720),
            borderRadius:5,
            flexDirection:'row',
            // backgroundColor:'tomato',

        },
        lado_izquierdo:{
            // backgroundColor:'tomato',
            width : (width * 0.350),
            height: (height * 0.130),
            alignSelf:'flex-end'
        },
        lado_derecho:{
            // backgroundColor:'green',
            width : (width * 0.350),
            height: (height * 0.130),
            alignItems:'flex-start'

        },

        texto_info_derecha:{
            color:'#20262E',
            marginLeft:5,
            fontSize:14,
            fontWeight:'600',
            // textAlign:'left'
        },
        texto_info_derecha_titulo:{
            width : (width * 0.700),
            bottom:10,
            color:'#20262E',
            fontSize:15,
            fontWeight:'800',
            textAlign:'center'
        },
        texto_info_izquierda:{
            color:'#20262E',
            fontSize:14,
            fontWeight:'600',
            // textAlign:'left'
            
        },
        texto_info_izquierda_mensaje:{
            width : (width * 0.700),
            // justifyContent:''
            // 434242:'red',
            color:'#73777B',
            marginLeft:5,
            fontSize:13,
            fontWeight:'700',
            textAlign:'justify'
            // textAlign:'left'
        }

    });

    const mi_principal = StyleSheet.create({
        contenedor: {
            height: (height * 1),
            width : (width * 1),
            alignItems:'center',
            // alignContent:'center',
            
            backgroundColor:'white'
        },
        espaciador:{
            height: ( height * 0.040 ),
            width : (width * 0.850),
            // backgroundColor:'red',

            // justifyContent:'flex-start',
            // alignSelf:'flex-start'
            // backgroundColor:'pink',
        },
        imagen_check:{
            width : (width * 0.080),
            height: (height * 0.040),
        },
        contenedor_menu:{
            width : (width * 1),
            height: (height * 0.230),
            borderWidth:.1,     
            backgroundColor:(colors.backgroundPanel), //1496DB
            flexDirection:'column',
            alignItems:'center'

        },
        fila1:{
            width : (width * 0.930),
            height: (height * 0.070),
            borderWidth:.1,     
            // margin:5,
            backgroundColor:(colors.backgroundPanel),
            flexDirection:'row',
            // backgroundColor:'green',
            justifyContent:'space-around',

        },
        izquierdo:{
            width : (width * 0.400),
            // backgroundColor:'orange',
            alignItems:'center',
            justifyContent:'flex-start',
            flexDirection:'row'

        },
        derecho:{
            width : (width * 0.400),
            // backgroundColor:'tomato',
            alignItems:'flex-end',
            justifyContent:'center',
        
        },
        menu_imagen:{
            width : (width * 0.080),
            height: (height * 0.060),
        },
        textoIcono:{
            fontSize:18,
            color:'white',
            fontWeight:'800'
        },
        cuerpo_principal:{
            width : (width * 0.920),
            height: (height * 0.500),
            borderWidth:.1,
            borderRadius:3,
            borderColor:'#1496DB',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        fila2:{
            width : (width * 0.850),
            height: (height * 0.080),
            borderWidth:.1,     
            backgroundColor:(colors.backgroundPanel),
            flexDirection:'row',
            // backgroundColor:'yellow',
            justifyContent:'center'
        },
        containerInputUsuario:{
            // borderWidth:0.5,
            borderRadius:5,
            // backgroundColor:'rgba(179, 218, 233, 0.9)',
            backgroundColor:'white',
            alignItems:'center',
            width:  ( width *  0.850 ),
            height: ( height * 0.070 ),
            margin:10 ,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        },
        textInput:{
            width: ( width * 0.600  ),
            height: ( height * 0.070 ),
            
            // backgroundColor:'red'
        },
        contenedor_opciones:{
            width : (width * 0.850),
            height: (height * 0.100),
            borderWidth:.1,
            borderRadius:3,
            borderColor:'#4D455D',
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center'
        },
        opcion1:{
            backgroundColor:'#0779E4',
            width: (width * 0.140),
            height : (height * 0.070),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5
        },
        opcion2:{
            backgroundColor:'#FF7777',
            width: (width * 0.140),
            height : (height * 0.070),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5

        },
        opcion3:{
            backgroundColor:'#00BD56',
            width: (width * 0.140),
            height : (height * 0.070),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5

        },
        opcion4:{
            backgroundColor:'#064ACB',
            width: (width * 0.140),
            height : (height * 0.070),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5

        },
        contenedor_scroll:{
            width : (width * 0.850),
            height: (height * 0.400),
            borderWidth:.1,
            // backgroundColor:'red',
            borderRadius:10,
            borderColor:'#4D455D',
            flexDirection:'column',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            // justifyContent:'space-around',
            alignItems:'center'
        },
        scroll_imagen:{
            width : (width * 0.850),
            height: (height * 0.300),
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
        },
        detalle:{
            flexDirection:'row',
            backgroundColor:'white',
            width : (width * 0.850),
            height: (height * 0.100),
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            justifyContent:'space-around',
            alignItems:'center'
        },
        detalle1:{
            
            // height: (height * 0.130),
            width : (width * 0.600),
            borderRadius:5,
            // backgroundColor:'green',
        },
        detalle2:{
            // backgroundColor:'tomato',
            width : (width * 0.100),
            height : (height * 0.050),
            borderRadius:200,
            borderWidth:.1,
            justifyContent:'center',
            alignItems:'center',
            // height: (height * 0.130),
            backgroundColor:'#EEEEEE',
            borderColor:'#EEEEEE'
        },
        texto_detalle:{
            fontSize:24,
            color:'#133C52',
            fontWeight:'600'
        },
        subtitulos:{  
            fontSize:14,
            color:'#133C52',
            fontWeight:'600'

        },
        stars:{
            flexDirection:'row'
        },
        texto_stars:{
            fontSize:13,
            color:'#868686'
        },
        lado_derecho:{
            // backgroundColor:'green',
            width : (width * 0.300),
            height: (height * 0.130),

        },

        texto_info_derecha:{
            color:'#474E68',
            marginLeft:5,
            fontSize:13,
            fontWeight:'600',
            textAlign:'left'
        },
        texto_info_derecha_titulo:{
            // marginLeft:10,
            color:'#20262E',
            fontSize:15,
            fontWeight:'700',
            textAlign:'right'
        },
        texto_info_izquierda:{
            color:'#474E68',
            fontSize:13,
            fontWeight:'600',
            textAlign:'left'
            
        },
        texto_info_izquierda_titulo:{
            color:'#20262E',
            marginLeft:5,
            fontSize:15,
            fontWeight:'700',
            textAlign:'left'

        }

    });

    
    export {
    styles, menu_index, menu_perfil, registro , listado , recuperar_password, marcar_asistencia, mis_alertas, mis_avisos, mi_principal,
    
    
};      