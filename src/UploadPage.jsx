import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from './firebase'; // this should work now

async function handlePhotoUpload(file, plantName) {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });

    const storageRef = ref(storage, `plants/${compressedFile.name}`);
    await uploadBytes(storageRef, compressedFile);

    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "plants"), {
      name: plantName,
      photoURL: downloadURL,
      timestamp: new Date(),
    });

    console.log("Upload successful!");
  } catch (error) {
    console.error("Upload failed", error);
  }
}
