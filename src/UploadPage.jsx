import { useState } from 'react';
import { handlePhotoUpload } from './db';  // <-- updated this import
import Header from './Header';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSave() {
    if (!file) {
      alert('Please select a photo!');
      return;
    }

    await handlePhotoUpload(file, ""); // blank name for now

    alert('Plant photo saved!');
    setFile(null);
    setPreview(null);
  }

  return (
    <div>
      <Header />

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
