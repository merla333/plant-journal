import { useEffect, useState } from 'react';
import { getAllPlantPhotos, updatePlantName } from './db';
import Header from './Header';

function AssociatePage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      const allPlants = await getAllPlantPhotos();
      setPlants(allPlants.filter(p => !p.name));
    }
    fetchPlants();
  }, []);

  async function handleNameChange(id, newName) {
    await updatePlantName(id, newName);

    const allPlants = await getAllPlantPhotos();
    setPlants(allPlants.filter(p => !p.name));
  }

  return (
    <div>
      <Header /> {/* 🏡 Home Button and Title */}

      <div style={{ padding: '20px' }}>
        <h2>Associate Names with Plants 🏷️</h2>
        {plants.length === 0 ? (
          <p>No unnamed plants! 🌿</p>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            {plants.map((plant) => (
              <div key={plant.id} style={{
                width: 'calc(50% - 10px)',
                maxWidth: '250px',
                border: '1px solid gray',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <img
                  src={plant.photo}
                  alt="Plant"
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <input
                  type="text"
                  placeholder="Enter plant name"
                  onBlur={(e) => handleNameChange(plant.id, e.target.value)}
                  style={{ marginTop: '8px', padding: '8px', width: '100%', fontSize: '16px' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssociatePage;
