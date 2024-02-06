
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



export default function StudentForm() {
    const [name, setName] = useState("");
    const[address,setAddress]=useState("");
    const[students,setStudents]=useState([]);

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8090/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("se agrego nuevo estudiante")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8090/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
    )},[])


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh',
        marginTop:"200px"
        
      }}
    >
        
     <Paper
        elevation={3} // Establecer la elevación en 0 para eliminarla

     
        sx={{
          width: '600px', // Ancho deseado
          height: '300px', // Alto deseado
          padding: '16px', // Espaciado interno deseado
          background: 'white', // Color de fondo deseado
          display:"flex",
          flexDirection:"column",
          justifyContent: 'center',
          alignItems: 'center'

        }}
        
      >
         <Typography
      align="center"
      gutterBottom
      noWrap
      paragraph
      sx={{
        fontSize:"40px",
        color: 'blue', // Cambia el color del texto a azul
        textDecoration: 'underline', // Agrega subrayado al texto
        // Agrega otros estilos personalizados aquí si es necesario
      }}
      variant="h1" // Cambia la variante del texto a h1
    >
      Agregar estudiante
    </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {width: '100%', background:"",marginTop:"30px",marginBottom:"10px"},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Student Name" variant="outlined" 
          value={name} 
          onChange={(e)=>setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Student Address" variant="outlined" 
          value={address} 
          onChange={(e)=>setAddress(e.target.value)}
          />
            
        </Box>
        <Button variant="contained" onClick={handleClick}>Ingresar</Button>
      </Paper>
      {/*paper de muestra*/}
      <Paper
                elevation={3}
                sx={{
                    width: '600px',
                    padding: '16px',
                    marginTop:"50px"
                }}
            >
                <Typography
                    align="center"
                    gutterBottom
                    paragraph
                    variant="h4"
                >
                    Lista de Estudiantes
                </Typography>
                {students.map((student, index) => (
                    <Box key={index}>
                        <Typography variant="body1">ID: {student.id}</Typography>
                        <Typography variant="body1">Nombre: {student.name}</Typography>
                        <Typography variant="body1">Dirección: {student.address}</Typography>
                        <hr />
                    </Box>
                ))}
            </Paper>
    </Box>
  );
}
