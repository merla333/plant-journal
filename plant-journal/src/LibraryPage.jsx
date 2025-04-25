return (
  <div>
    <Header />
    <div style={{ padding: '20px' }}>
      <h2>My Plant Library 📚</h2>
      {photos.length === 0 ? (
        <p>No plants saved yet. Go upload some!</p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center'
        }}>
          {photos.map((entry) => (
            <div key={entry.id} style={{
              width: 'calc(50% - 10px)',
              maxWidth: '250px',
              border: '1px solid gray',
              borderRadius: '8px',
              padding: '10px'
            }}>
              <img
                src={entry.photo}
                alt="Plant"
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
              <h4 style={{ margin: '10px 0 5px 0' }}>{entry.name || "Unnamed Plant"}</h4>
              <p style={{ fontSize: '0.8em', color: 'gray' }}>
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
