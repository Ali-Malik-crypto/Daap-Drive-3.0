import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";


const FileUpload = ({ contract, account, provider }) => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");


  const handleSubmit = async (e) => {

    e.preventDefault();
    if (file) {

      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `
            95f328a012f1634eab8b`,
            pinata_secret_api_key: `
            
            8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);

      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
  };


  const retrieveFile = (e) => {

    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
    
  };



  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>

        <label htmlFor="file-upload" className="choose"> Choose Image </label>

        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>

        <span className="textArea">Image: {fileName}</span>

        <button type="submit" className="upload" disabled={!file}> Upload File </button>

      </form>
    </div>
  );
};
export default FileUpload;
