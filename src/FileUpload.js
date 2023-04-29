import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

const LoadingIcon = styled.div`
  margin-top: 20px;
  font-size: 50px;
`;

const StatusText = styled.div`
  margin-top: 10px;
`;

const ResultBox = styled.div`
  width: 60%;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 20px;
`;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("请至少上传一个文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      // const response = await axios.post("http://localhost:5001/api/upload", formData, {
      const response = await axios.post("https://20.243.46.110:5001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
      setCharCount(response.data.length);
      alert("上传成功");
      console.log("File upload response:", response.data);
    } catch (error) {
      console.error("File upload error:", error);
      alert(`上传失败 ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadContainer>
      <h2>Upload Attachment</h2>
      <input type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleSubmit}>Upload</UploadButton>
      {loading && (
        <>
          <LoadingIcon><FontAwesomeIcon icon={faSpinner} spin size="lg" /></LoadingIcon>
          <StatusText>总结生成中...</StatusText>
        </>
      )}
      {result && (
        <>
          <ResultBox>
            <div>{result}</div>
            <StatusText>总字数: {charCount}</StatusText>
          </ResultBox>
        </>
      )}
    </UploadContainer>
  );
};

export default FileUpload;

