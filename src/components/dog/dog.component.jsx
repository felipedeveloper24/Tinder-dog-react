import {Box,Modal, Card, Typography,Button, CardContent } from "@mui/material";
import React, {useState} from "react";
import {Image} from "mui-image";
import SimpleAccordion from "../accordion/acordion";

const Dog = ({title,url,description})=>{
 

    return(
        <Card outlined="true" sx={{
                width:"70%",
                padding:"20px",
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                boxShadow: 3,
                marginTop:"10px",
                marginBottom:"10px",
                overflowY:"scroll"
               
            }}>
            <Typography variant="h4" >{title}</Typography>
            <Image 
                src={url}
                width="250px"
                height="250px"
                style={{
                    borderRadius:"40px"
                }}
             />
            <CardContent
                sx={{
                    padding:"10px"
                }}
            >
               <SimpleAccordion description={description} />
            </CardContent>
            
           
            
        </Card>
    )
}

export default Dog;