
import axios from 'axios';

export default axios.create({
    //COLOCAR TU DIREECIÓN IP : PUERTO / CARPETA 
    // baseURL: "https://teleinterconsulta.energenioperu.com/",
    // baseURL: "https://teleinterconsulta.energenioperu.com/",
    baseURL: "http://192.168.18.30:82/reserva/",

    timeout:  1000,
    headers: { 'Content-Type': 'application/json' }
});