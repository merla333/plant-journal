import { storage, db } from './firebase'; // ✅ single import from firebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; // ✅ combined Firestore imports
import imageCompression from 'browser-image-compression';

// --- Upload and Compress Plant Photo ---
export async function handlePhotoUpload(file, plantName) {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true
    });

    const storageRef = ref(storage, `plants/${compressedFile.name}`);
    await uploadBytes(storageRef, compressedFile);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "plants"), {
      name: plantName,
      photoURL: downloadURL,
      timestamp: new Date()
    });

    console.log("Upload successful!");
  } catch (error) {
    console.error("Upload failed", error);
  }
}

// --- Get All Plant Photos ---
export async function getAllPlantPhotos() {
  try {
    const querySnapshot = await getDocs(collection(db, "plants"));
    const plants = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return plants;
  } catch (error) {
    console.error("Error fetching plant photos:", error);
    return [];
  }
}

// --- Update Plant Name ---
export async function updatePlantName(id, newName) {
  try {
    const plantDocRef = doc(db, "plants", id);
    await updateDoc(plantDocRef, {
      name: newName
    });
    console.log("Plant name updated successfully!");
  } catch (error) {
    console.error("Error updating plant name:", error);
  }
}
