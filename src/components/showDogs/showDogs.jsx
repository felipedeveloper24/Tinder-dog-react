import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./showDogs.css";

const ShowDogs = () => {
    const BASE_API = "https://dog.ceo/api/breeds/image/random";

    const [perro, setPerro] = useState({});
    const [aprobados, setAprobados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
    const [cargando,setCargando] = useState(false);
    const [contador,setContador] = useState(0);
    useEffect(()=>{
        getDog();
    },[]);
    const getDog = async ()=>{
        const response = await axios.get(BASE_API);
        setPerro(response.data);
        setCargando(true);

    }
    const like = (img)=>{
        let perro = {
            id: contador,
            nombre: generateRandomString(6),
            img:img
        }
        setContador(contador+1);
        let perritosaprobados = aprobados.concat(perro)

        let perritosordenados = perritosaprobados.sort()

        setAprobados(perritosordenados);

        getDog()

    }
    const dislike = (img) =>{
        setContador(contador+1);

        let perro = {
            id: contador,
            nombre: generateRandomString(6),
            img:img
        }
        let perritosrechazados = rechazados.concat(perro);
        setRechazados(perritosrechazados);

        getDog()
    }
    const generateRandomString = (cant) => {
        const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cadena= ' ';
        const largo = caracteres.length;
        for ( let i = 0; i < cant; i++ ) {
            cadena += caracteres.charAt(Math.floor(Math.random() * largo));
        }
        return cadena;
    }


    if(cargando){
        return(
            <div className="contenedor">
                <div className="box">
                    <h1>Perros aprobados</h1>
                    {
                        aprobados.map((perro,idx)=>{
                            return(
                                <div className="cajita" key={idx}>
                                    <h1>{perro.nombre}</h1>
                                    <img src={perro.img} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="box-perros">
                    <h1 className="text-white">Perrito candidato</h1>
                    <img src={perro.message} className="img" alt="" />
                    <div className="box-button">
                        <button className="btn btn-primary" onClick={()=> like(perro.message) } >Me gusta</button>
                        <button className="btn btn-danger" onClick={()=> dislike(perro.message) } >No me gusta</button>
                    </div>
                    
                </div>
                <div className="box">
                    <h1>Perros rechazados</h1>
                    {
                        rechazados.map((perro,idx)=>{
                            return(
                                <div className="cajita" key={idx}>
                                    <h1>{perro.nombre}</h1>
                                    <img src={perro.img} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
    
            </div>
        )
    }else{
        return(
            <div>
                Cargando datos .........
            </div>
        )
    }
    
};

export default ShowDogs;