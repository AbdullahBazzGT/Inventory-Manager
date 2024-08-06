"use client";
import { useState, useEffect, use } from "react";
import {
  collection,
  doc,
  Firestore,
  query,
  setDoc,
  getDoc,
  getDocs,
  deleteDocs,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import {
  Box,
  Typography,
  Modal,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { firestore } from "@/firebase";

const db = getFirestore();

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(db, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(db, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(db, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (arguments.length == 1) {
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
    }

    if (arguments.length == 2) {
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: quantity });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        padding={5}
        flexDirection="column"
      >
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            left="50%"
            top="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            width={400}
            bgcolor="white"
            border="2px soild #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Typography variant="h6"> Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                placeholder="Item Name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName, parseInt(quantity, 10));
                  setItemName("");
                  setQuantity("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
        >
          ADD NEW ITEM
        </Button>
        <Box border="1px solid #FFF">
          <Box
            width="800px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2" color="#FFF">
              Inventory Items{" "}
            </Typography>
          </Box>
        </Box>
        <Stack width="800px" height="auto" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#E66C2C"
              padding={5}
            >
              <Typography variant="h3" color="#FFF" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#FFF" textAlign="center">
                {quantity}
              </Typography>
              <Button variant="contained" onClick={() => addItem(name)}>
                Add One
              </Button>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove One
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
