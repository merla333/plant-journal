import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{
      backgroundColor: '#e0f7e9',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #ccc'
    }}>
      <h1 style={{ fontSize: '20px', margin: 0 }}>🌱 Plant Journal</h1>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '16px'
        }}>
          Home
        </button>
      </Link>
    </header>
  );
}

export default Header;
