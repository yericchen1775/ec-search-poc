// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE

import { DefaultAzureCredential   } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import axios from 'axios';

const containerName = process.env.REACT_APP_AZURE_STORAGE_CONTAINER_NAME;
const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_RESOURCE_NAME;
// </snippet_package>

const signInOptions = {
  // the client id is the application id, from your earlier app registration
  clientId: "5ad55452-6ac3-4b88-86ce-fc0332323db9",
  // this is your tenant id - the id of your azure ad tenant. available from your app registration overview
  tenantId: "582f455c-1b4e-44a0-9a74-e6703f9005d9"
}
//const defaultAzureCredential = new DefaultAzureCredential();
// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
//const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/`;
console.log(uploadUrl);

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);
//const blobService = new BlobServiceClient(uploadUrl, new DefaultAzureCredential(signInOptions));

// get Container - full public read access
const containerClient =
  blobService.getContainerClient(containerName);
// </snippet_get_client>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobsInContainer = async () => {
  const returnedBlobUrls = [];
  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
   
    console.log(`${blob.name}`);
    console.log(`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`);
    
    const resp2 = await axios.get(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`
    ).then(res => {
      const urlContent = res.data;
      const blobItem = {
        url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
        urlContent: urlContent.length < 500 ? urlContent : '',
        name: blob.name
      }
       // if image is public, just construct URL
      returnedBlobUrls.push(blobItem);
      
    });
  }
  
  return returnedBlobUrls;
};
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file) => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
