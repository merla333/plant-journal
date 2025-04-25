import { openDB } from 'idb';

const DB_NAME = 'plantJournal';
const STORE_NAME = 'plants';

// Open the database
export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Add a new plant photo
export async function addPlantPhoto(data) {
  const db = await getDB();
  await db.add(STORE_NAME, {
    photo: data.photo,
    name: data.name,
    timestamp: Date.now(),
  });
}

// Get all stored plant photos
export async function getAllPlantPhotos() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function updatePlantName(id, newName) {
  const db = await getDB();
  const plant = await db.get(STORE_NAME, id);
  if (plant) {
    plant.name = newName;
    await db.put(STORE_NAME, plant);
  }
}
