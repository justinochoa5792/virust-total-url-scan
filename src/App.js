import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState("");
  const [scannedUrl, SetScannedUrl] = useState([]);

  const handleChange = (e) => {
    setFile(e.target.value);
  };
  const checkFile = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", `${file}`);

    let response = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      encodedParams,
      {
        headers: {
          accept: "application/json",
          "x-apikey": `${process.env.REACT_APP_API_KEY}`,
          "content-type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      }
    );
    console.log(response);
    SetScannedUrl(response.data);
  };

  return (
    <div className="App">
      <h1>Submit URL to Check for Virus</h1>
      <div className="file-upload">
        <input
          className="uploadedFile"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={checkFile}>
          Submit Url
        </button>
      </div>
      {scannedUrl.length === 0 ? (
        <p>Submit URL for scanning</p>
      ) : (
        <div className="result">
          <span>
            <strong>Id of scanned url:</strong> {scannedUrl.data.id}
          </span>
          <a href={`${scannedUrl.data.links.self}`}>
            <span>{scannedUrl.data.links.self}</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
