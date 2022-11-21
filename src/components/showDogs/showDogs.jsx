
import React from "react";
import { useState } from "react";
import "./showDogs.css";
import { getDog } from "../../api/querys";
import { useQuery } from "react-query";
import { CircularProgress, Button, Modal, Card, Grid, Typography, Alert, CardContent } from "@mui/material";
import { Box } from "@mui/material";
import Dog from "../dog/dog.component";
import { Image } from "mui-image";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Tooltip from '@mui/material/Tooltip';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
const ShowDogs = () => {

    const { data, isLoading, refetch } = useQuery("perro", getDog, { refetchInterval: 4000 })

    const [aprobados, setAprobados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
    const [contador, setContador] = useState(0);
    const description = "error voluptatum quibusdam quisquam odio, perspiciatis dolor blanditiis. Dicta velit maiores consequatur animi! Doloribus.";
   
   

    const like = (img, description) => {

        let perro = {
            id: contador,
            nombre: generateRandomString(6),
            img: img,
            description: description,
            state: true,
        }
        setContador(contador + 1);
        let perritosaprobados = aprobados.concat(perro);

        setAprobados(perritosaprobados.reverse());

    }
    const dislike = (img, description) => {
        setContador(contador + 1);

        let perro = {
            id: contador,
            nombre: generateRandomString(6),
            img: img,
            description: description,
            state: false
        }
        let perritosrechazados = rechazados.concat(perro);
        setRechazados(perritosrechazados.reverse());
    }

    const arrepentido = (perro) => {

        if (perro.state === true) {

            perro.state = false;
            let perros_rechazados = rechazados.concat(perro);
            setRechazados(perros_rechazados);
            let aprobados_actualizado = aprobados.filter((perro_original) => perro_original.nombre !== perro.nombre);

            setAprobados(aprobados_actualizado);

        } else if (perro.state === false) {

            perro.state = true;
            let perros_aprobados = aprobados.concat(perro);
            setAprobados(perros_aprobados);
            let rechazados_actualizado = rechazados.filter((perrox) => perrox.nombre !== perro.nombre);
            setRechazados(rechazados_actualizado);
        }

    }
    
    const generateRandomString = (cant) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cadena = ' ';
        const largo = caracteres.length;
        for (let i = 0; i < cant; i++) {
            cadena += caracteres.charAt(Math.floor(Math.random() * largo));
        }
        return cadena;
    }

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="success" />
            </div>
        )
    }

    return (
        <Grid container
          
            
            sx={{
                display: "flex",
                width: '100%',
                flexDirection: "row",
                marginTop: "20px",
                justifyContent: "center",
               
            }}
        >
           
            <Grid
             item
             md={3}
             sm={10}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    height: "auto",
                    marginRight:"10px",
                    backgroundColor:"white",
                    maxHeight: "500px",
                    
                }}
            >
                <Card outlined="true" sx={{
                    width: "70%",
                    padding: "20px",
                    display: "flex",
                   
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: 3,
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                   
                    <Image
                        src={data.message}
                        width="250px"
                        height="250px"
                        style={{
                            borderRadius: "40px"
                        }}
                    />
                    <CardContent>
                        {description}
                    </CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            marginTop: "5px"
                        }}
                    >
                        <Tooltip title="Me gusta">
                            <ThumbUpOffAltIcon
                                sx={{
                                    width: "30px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                                color="primary"
                                onClick={() =>{ like(data.message, description); refetch(getDog) }}
                            />
                        </Tooltip>
                        <Tooltip title="No me gusta">
                            <NotInterestedIcon
                                sx={{
                                    width: "30px",
                                    cursor: "pointer"
                                }}
                                color="error"
                                onClick={() => { dislike(data.message, description); refetch(getDog) }}
                            />
                        </Tooltip>
                    </Box>

                </Card>


            </Grid>

            {/* Card de perritos aprobados */}

            <Grid
                item
                md={3}
                sm={5}
                sx={{
                    maxHeight: "500px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflowY: "scroll",
                    backgroundColor: "white",
                    flexWrap: "nowrap"
                }}
            >
                <Typography variant="h5" sx={{ marginTop: "10px" }} >Perritos Aprobados</Typography>
                {
                    aprobados.length > 0 ? aprobados.map((perro, idx) => {
                        return (
                            <Grid item key={idx}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "10px",
                                    height: "450px",

                                }}
                            >
                                <Dog title={perro.nombre} url={perro.img} description={description} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "flex",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                <Tooltip title="Arrepentirme">
                                    <ChangeCircleIcon
                                        sx={{
                                            cursor: "pointer"
                                        }}

                                        color="primary"
                                        onClick={() => { arrepentido(perro); refetch(getDog) }}
                                    />
                                </Tooltip>


                                </Box>
                            </Grid>
                        )
                    }) : <Alert severity="error" sx={{ marginTop: "10px" }} >No hay perritos seleccionados</Alert>
                }
            </Grid>


            {/* Box de perritos rechazados */}
            <Grid
                item
                md={3}
                sm={5}
                sx={{            
                    maxHeight: "500px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflowY: "scroll",
                    flexWrap: "nowrap",
                    backgroundColor: "white",
                    marginLeft:"10px"
                }}
            >
                <Typography variant="h5" sx={{ marginTop: "10px" }} >Perritos Rechazados</Typography>
                {
                    rechazados.length > 0 ? rechazados.map((perro, idx) => {
                        return (
                            <Grid item key={idx}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "10px",
                                    maxHeight:"450px",
                                    overflowY:"scroll"
                                   
                                }}
                            >
                                <Dog title={perro.nombre} url={perro.img} description={perro.description} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "flex",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    <Tooltip title="Arrepentirse" >
                                        <ChangeCircleIcon
                                            sx={{
                                                cursor: "pointer"
                                            }}

                                            color="primary"
                                            onClick={() => { arrepentido(perro); refetch(getDog) }}
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                        )
                    }) : <Alert sx={{ marginTop: "10px" }} severity="error">No hay perritos seleccionados</Alert>
                }
            </Grid>

        </Grid>
    )
};

export default ShowDogs;