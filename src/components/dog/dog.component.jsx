import {Box,Modal, Card, Typography,Button, CardContent } from "@mui/material";
import React, {useState} from "react";
import {Image} from "mui-image";
const Dog = ({title,url,description,modalOpen})=>{
    const [open, setOpen] = useState(modalOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                 {description}
            </CardContent>
        
            {open && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                        <Box 
                            sx={{
                                backgroundColor:"white",
                                width:"35%",
                                margin:"0px auto",
                                height:"200px",
                                borderRadius:"20px",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        >
                            <Typography id="modal-modal-description" sx={{
                                width:"70%",
                                textAlign:"center"
                             }}>
                                {description}
                            </Typography>
                        </Box>
                    </Modal>
                )}
            
        </Card>
    )
}

export default Dog;