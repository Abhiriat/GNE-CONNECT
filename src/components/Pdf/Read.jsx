import { useState } from 'react';
import app from '../../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import './Read.css';

function Read() {
  const [data, setData] = useState({});
  const [pdfUrls, setPdfUrls] = useState([]); // State for storing multiple PDF URLs
  const [loadingData, setLoadingData] = useState(false); // State for fetching database data
  const [loadingPdfs, setLoadingPdfs] = useState(false); // State for fetching PDFs
  const [error, setError] = useState(null); // State for handling errors

  // Function to fetch data from Realtime Database
  const displayData = async () => {
    setLoadingData(true); // Start loading indicator
    setError(null); // Clear previous errors
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "nature"); // Change 'nature' to your desired database path
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        alert("No data found in the database.");
      }
    } catch (err) {
      console.error("Error fetching data from Realtime Database:", err.message);
      setError("Error fetching data: " + err.message);
    } finally {
      setLoadingData(false); // Stop loading indicator
    }
  };

  // Function to fetch all PDF URLs from Firebase Storage
  const fetchAllPdfs = async () => {
    setLoadingPdfs(true); // Start loading indicator
    setError(null); // Clear previous errors
    try {
      const storage = getStorage(app);
      const pdfFolderRef = storageRef(storage, ''); // Assuming your PDFs are stored in a 'pdfs' folder

      const fileList = await listAll(pdfFolderRef); // Get all files in the folder
      const urls = await Promise.all(
        fileList.items.map((fileRef) => getDownloadURL(fileRef)) // Generate URLs for each file
      );
      setPdfUrls(urls); // Store URLs in state
    } catch (err) {
      console.error("Error fetching PDFs:", err.message);
      setError("Error fetching PDFs: " + err.message);
    } finally {
      setLoadingPdfs(false); // Stop loading indicator
    }
  };

  return (
    <div className="read-container">
      {/* <div className="container1">
        <button onClick={displayData} disabled={loadingData}>
          {loadingData ? "Fetching Data..." : "Fetch Data"}
        </button>
      </div> */}

      {/* Display Database Data */}
      {error && <p className="error-message">{error}</p>}
      {Object.keys(data).length > 0 ? (
        <ul>
          {Object.entries(data).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}</strong>: {value}
            </li>
          ))}
        </ul>
      ) : (
        !loadingData && <p>click on fetch pdf</p>
      )}

      {/* Fetch and Display PDFs */}
      <button onClick={fetchAllPdfs} disabled={loadingPdfs}>
        {loadingPdfs ? "Fetching PDFs..." : "Fetch PDFs"}
      </button>

      <div className="pdf-container">
        {pdfUrls.length > 0 ? (
          pdfUrls.map((url, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <iframe
                src={url}
                width="600"
                height="400"
                title={`PDF Viewer ${index}`}
                style={{ border: '1px solid #ccc' }}
              >
                This browser does not support PDFs. Please download the PDF to view it:
                <a href={url}>Download PDF</a>.
              </iframe>
            </div>
          ))
        ) : (
          !loadingPdfs && <p>No PDFs found. Click 'Fetch PDFs' to load.</p>
        )}
      </div>
    </div>
  );
}

export default Read;
