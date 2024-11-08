import { useState } from 'react';
import app from '../../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import './Read.css';
import '../common/header/Header.css'


function Read() {
  const [data, setData] = useState({});
  const [pdfUrl, setPdfUrl] = useState('');

  // Function to fetch data from Realtime Database
  const displayData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setData(snapshot.val());
    } else {
      alert("No data found");
    }
  };

  // Function to get PDF URL from Firebase Storage
  // Function to get PDF URL from Firebase Storage
const fetchPdf = async () => {
  const storage = getStorage(app);
  const pdfRef = storageRef(storage, 'abhiresume.pdf'); // Check path here

  try {
    const url = await getDownloadURL(pdfRef);  // Get download URL from Firebase Storage
    setPdfUrl(url);  // Set PDF URL
  } catch (error) {
    console.error("Error fetching PDF: ", error.message);  // Log error message in console
    alert("Error fetching PDF: " + error.message);  // Show more detailed alert message
  }
};

  return (
    
    <div>
      <div className='container1'>
        <img src="../../../public/images/girlimage.jpg" alt="" />
      </div>
      <button onClick={displayData}>Display Data</button>
      <ul>
        {Object.entries(data).map(([key, value], index) => (
          <li key={index}>
            {key}: {value}
          </li>
        ))}
      </ul>

      <button onClick={fetchPdf}>Fetch PDF</button>

      {pdfUrl && (
        <iframe src={pdfUrl} width="600" height="400" title="PDF Viewer">
          This browser does not support PDFs. Please download the PDF to view it: 
          <a href={pdfUrl}>Download PDF</a>.
        </iframe>
      )}
    </div>
  );
}

export default Read;
