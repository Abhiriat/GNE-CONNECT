import { useState } from 'react';
import app from '../../firebaseConfig';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import './Read.css';

function Read() {
  const [pdfFiles, setPdfFiles] = useState([]); // State for storing PDF details (URLs and names)
  const [loadingPdfs, setLoadingPdfs] = useState(false); // State for fetching PDFs
  const [error, setError] = useState(null); // State for handling errors

  // Function to fetch all PDF URLs and names from Firebase Storage
  const fetchAllPdfs = async () => {
    setLoadingPdfs(true); // Start loading indicator
    setError(null); // Clear previous errors
    try {
      const storage = getStorage(app);
      const pdfFolderRef = storageRef(storage, 'dsa'); // Specify the 'dccn' folder
  
      const fileList = await listAll(pdfFolderRef); // Get all files in the folder
      const pdfDetails = await Promise.all(
        fileList.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef); // Generate URL for each file
          return { name: fileRef.name, url }; // Return name and URL
        })
      );
      setPdfFiles(pdfDetails); // Store PDF details in state
    } catch (err) {
      console.error("Error fetching PDFs:", err.message);
      setError("Error fetching PDFs: " + err.message);
    } finally {
      setLoadingPdfs(false); // Stop loading indicator
    }
  };
  
  return (
    <div className="read-container">
      {/* Fetch and Display PDFs */}
      <button onClick={fetchAllPdfs} disabled={loadingPdfs}>
        {loadingPdfs ? "Fetching PDFs..." : "Fetch PDFs"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="pdf-container">
        {pdfFiles.length > 0 ? (
          pdfFiles.map(({ name, url }, index) => (
            <div className="pdf-item" key={index}>
              <iframe
                src={url}
                width="100%"
                height="300"
                title={`PDF Viewer ${index}`}
                style={{ border: '1px solid #ccc' }}
              >
                This browser does not support PDFs. Please download the PDF to view it:
                <a href={url}>Download PDF</a>.
              </iframe>
              <p className="pdf-name">{name}</p>
              <a href={url} download={name} className="download-link">
                Download
              </a>
            </div>
          ))
        ) : (
          !loadingPdfs && <p>No PDFs found. Click  to load.</p>
        )}
      </div>
    </div>
  );
}

export default Read;
