import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f2f2f2;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("恭喜您 : ) ！！文件上传成功！！！祝您生活愉快");
      console.log("File upload response:", response.data);
    } catch (error) {
      console.error("File upload error:", error);
      alert("上传失败咚 : (");
    }
  };

  return (
    <UploadContainer>
      <h2>Upload Attachment</h2>
      <input type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleSubmit}>Upload</UploadButton>
    </UploadContainer>
  );
};

export default FileUpload;