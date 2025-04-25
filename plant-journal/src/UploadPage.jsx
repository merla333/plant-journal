import { useState } from 'react';
import { addPlantPhoto } from './db';
import Header from './Header';

function UploadPage() {
  const [preview, setPreview] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setPreview(base64Data);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    if (!preview) {
      alert('Please select a photo!');
      return;
    }

    await addPlantPhoto({
      photo: preview,
      name: "", // blank name for now
    });

    alert('Plant photo saved!');
    setPreview(null);
  }

  return (
    <div>
      <Header /> {/* <--- Header goes INSIDE here at the very top */}

      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h2>Upload a New Plant Photo 📸</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        {preview && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={preview}
              alt="Uploaded Preview"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <button
              onClick={handleSave}
              style={{ marginTop: '20px', width: '100%', padding: '10px', fontSize: '18px' }}
            >
              Save Plant Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
