"use client"
import { Box, Typography, Stack, Button, TextField, Grid, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { firestore } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Navbar from "@/component/Navbar";

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
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  //const [expiryDate, setExpiryDate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1});
    } else {
      await setDoc(docRef, { quantity: 1});
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updatePantry();
  };

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, quantity: doc.data().quantity});
    });
    setPantry(pantryList);
  };

  const filteredPantry = pantry.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    updatePantry();
  }, []);

  return (
      <Box>
        <Navbar />
        
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column">
          <Typography variant="h5"  textAlign="center" fontWeight="bold">
            Enter the item from your pantry
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
            <TextField
              id="outline-basic"
              label="Add item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            {/* <DateTimePicker label="Basic date time picker" /> */}
            
            <Button variant="contained" onClick={() => { addItem(itemName); setItemName(''); handleClose(); }} sx={{ backgroundColor: '#e99469' }}>
              Add
            </Button>
          </Box>
          <Box >
            <Box width="800px" height="80px" bgcolor="#e99469" display="flex" justifyContent="center" alignItems="center" sx={{borderRadius: "20px"}}>
              <Typography variant="h6" color="#ffffff" textAlign="center" fontWeight="bold">
                Your Pantry Items
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2} mb={1}>
              <TextField
                label="Search for item"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginRight: 2 }} // Adjust margin as needed
              />
            </Box>
            <Stack width="800px" height="300px" spacing={2} overflow="auto">
              <Grid item xs={12} md={6}>
                <List dense>
                  {filteredPantry.map(({ name, quantity }) => (
                    <ListItem key={name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", background: "#f4f7e4", marginBottom: "5px", borderRadius: "10px"}}>
                      <ListItemText
                        primary={<Typography variant="body1" sx={{ color: '#333' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>}
                        secondary={`Quantity: ${quantity}`}
                      />
                      <IconButton edge="end" aria-label="delete" onClick={() => removeItem(name)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Box>
  );
}
