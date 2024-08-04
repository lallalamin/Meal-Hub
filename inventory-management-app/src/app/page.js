"use client"
import { Box, Typography, Stack, Button, Modal, TextField } from "@mui/material";
import Image from "next/image";
import { firestore } from "../../firebase";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  gap: 3,
  flexDirection: 'column',
};

export default function Home() {
const [pantry, setPantry] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [itemName, setItemName] = useState('')

  const addItem = (item) => {
    console.log(item);
  }

  useEffect(() => {
    const updatePantry = async () =>{
      const snapshot = query(collection(firestore, "pantry"))
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach((doc) => {
        pantryList.push(doc.id)
      });
      setPantry(pantryList);
    }

    updatePantry();
  }, [])

  return (
    <Box width="100vw" height="100vh" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} flexDirection={"column"}>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}>X</Button>
          <p id="child-modal-description">
            Add item
          </p>
          <Stack width="100%" direction={"row"} gap={2}>
            <TextField id="outline-basic" label="Item" variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)}>Search</TextField>
            <Button variant="contained" onClick={()=>{addItem(itemName) ; setItemName(''); handleClose() }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>ADD</Button>
      <Box border={"1px solid #333"}>
        <Box width="800px" height="100px" bgcolor={"#ADD8E6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"h2"} color={"#333"} textAlign={"center"} fontWeight={"bold"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {pantry.map((i) => (
            <Box key={i} width="100%" minHeight="150px" display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={"#f0f0f0"}>
              <Typography variant={"h4"} color={"#333"} textAlign={"center"}>
                {i.charAt(0).toUpperCase()+ i.slice(1)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
