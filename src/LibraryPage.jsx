import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Header from './Header';

function LibraryPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      const querySnapshot = await getDocs(collection(db, "plants"));
      const plantList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPlants(plantList);
    }

    fetchPlants();
  }, []);

  return (
    <div>
      <Header />

      <div style={{ padding: '20px' }}>
        <h2>My Plant Library 📚</h2>

        {plants.length === 0 ? (
          <p>No plants uploaded yet.</p>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            {plants.map(plant => (
              <div key={plant.id} style={{
                width: 'calc(50% - 10px)',
                maxWidth: '250px',
                border: '1px solid gray',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <img
                  src={plant.photoURL}
                  alt={plant.name || "Plant"}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <h4 style={{ margin: '10px 0 5px 0' }}>{plant.name || "Unnamed Plant"}</h4>
                <p style={{ fontSize: '0.8em', color: 'gray' }}>
                  {plant.timestamp && new Date(plant.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
