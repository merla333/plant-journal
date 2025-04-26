import { useState } from 'react';
import { handlePhotoUpload } from './db'; // ← correct

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [plantName, setPlantName] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await handlePhotoUpload(selectedFile, plantName);
      setSelectedFile(null);
      setPlantName('');
    }
  };

  return (
    <div>
      <h2>Upload Plant</h2>
      <input
        type="text"
        placeholder="Plant Name"
        value={plantName}
        onChange={(e) => setPlantName(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPage; // <--- THIS is what you're missing
