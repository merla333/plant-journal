import { Routes, Route, Link } from 'react-router-dom';
import UploadPage from './UploadPage'
import LibraryPage from './LibraryPage'
import AssociatePage from './AssociatePage'

function App() {
  return (
    <div>
      <h1>My Plant Journal 🌿</h1>
      <nav>
        <Link to="/upload"><button>Upload Plant Sighting</button></Link>
        <Link to="/library"><button>View Plant Library</button></Link>
        <Link to="/associate"><button>Associate Names with Plants</button></Link>
      </nav>

      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/associate" element={<AssociatePage />} />
      </Routes>
    </div>
  )
}

export default App;
