import React, { useState, useEffect } from "react";

import "./App.css";
import { getTestData } from "./data/api";
import { getStorageData } from "./data/azureapi";
import uploadFileToBlob, {
  isStorageConfigured,
  getBlobsInContainer,
} from "./data/azure-storage-blob";
import DisplayImagesFromContainer from "./data/containerImages";

import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

const storageConfigured = isStorageConfigured();

function App() {
  const [testdata, setTestData] = useState([1]);

  const [azuredata, setAzureData] = useState();

  const [id, setId] = useState(1);

  const [url, setUrl] = useState();

  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState();
  const [fileUploaded, setFileUploaded] = useState("");

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Web Link", field: "website" },
  ];

  const getData = async () => {
    try {
      const data = await getTestData(id);
      setTestData(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAzureData = async () => {
    try {
      const azureData = await getStorageData(url);
      setAzureData(azureData);
      console.log(azureData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const override = `
  display: block;
  margin: 0 auto;
  border-color: gray;
  `;

  useEffect(() => {
    getData();

    getBlobsInContainer().then((list) => {
      // prepare UI for results
      setBlobList(list);
    });
  }, [fileUploaded]);

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (fileSelected && fileSelected?.name) {
      // prepare UI
      setUploading(true);

      // *** UPLOAD TO AZURE STORAGE ***
      await uploadFileToBlob(fileSelected);

      // reset state/form
      setFileSelected(null);
      setFileUploaded(fileSelected.name);
      setUploading(false);
      setInputKey(Math.random().toString(36));
    }
  };

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ""} />
      <button type="submit" onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );

  return (
    <div className="App">
      <div className="card">
        <h2 className="title">
          <i className="fa fa-cloud"></i>Azure POC App
        </h2>
        <div className="search-form">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter your Id"
          />
          <button type="button" onClick={() => getData()}>
            Search
          </button>
        </div>
        <p></p>
        <p></p>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">UserName</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Website</TableCell>
                  <TableCell align="left">Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testdata.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.website}</TableCell>
                    <TableCell align="left">
                      {JSON.stringify(row.company)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div>
        <hr />
        <h2>Upload file to Azure Blob Storage</h2>
        {storageConfigured && !uploading && DisplayForm()}
        {storageConfigured && uploading && <div>Uploading</div>}
        <hr />

        {storageConfigured && blobList.length > 0 && (
          <DisplayImagesFromContainer blobList={blobList} />
        )}
        {!storageConfigured && <div>Storage is not configured.</div>}
      </div>

      <div className="search-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your url"
        />
        <button type="button" onClick={() => getAzureData()}>
          Retrieve
        </button>
        <div>
          <b>{azuredata}</b>
        </div>

        <hr />
      </div>
    </div>
  );
}

export default App;
