import React, { useState, useEffect, useRef } from 'react';

// Style
import styled from 'styled-components';

// util
import { bytesToSize } from 'util/index';

// component
import Select from 'react-select';

// aws
import AWS from 'aws-sdk';

const Converter = () => {
  // variables
  const options = [
    { value: 'text', label: 'text' },
    { value: 'epub', label: 'epub' },
  ];

  // useState
  const [file, setFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState('text');
  const [bucket, setBucket] = useState(null);

  // useRef
  const hiddenFileInput = useRef(null);

  // useEffect
  useEffect(() => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    });

    AWS.config.region = 'ap-northeast-2';

    setBucket(new AWS.S3({ params: { Bucket: process.env.REACT_APP_S3_BUCKET_NAME } }));
  }, []);

  // function
  const handleChange = (event) => {
    const uploadFile = event.target.files[0];
    setFile(uploadFile);
  };

  const handleSelectBoxChange = (event) => {
    setSelectedValue(event.value);
  };

  const handleConvertButtonClick = async () => {
    try {
      const params = {
        Key: generateKey(selectedValue, file.name),
        ContentType: file.type,
        Body: file,
        ACL: 'public-read', // 접근 권한
      };

      const result = await bucket.putObject(params).promise();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseBtnClick = () => {
    setFile(null);
    setSelectedValue('text');
  };

  const generateKey = (selectedValue, fileName) => {
    return `${selectedValue}/${new Date().getTime()}_${fileName}`;
  };

  return (
    <ConverterContainer>
      <FileButton
        onClick={() => {
          hiddenFileInput.current.click();
        }}
      >
        <ButtonText>파일 선택</ButtonText>
        <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} /* Make the file input element invisible */ />
      </FileButton>

      {file && (
        <>
          <SelectBox options={options} defaultValue={options[0]} onChange={handleSelectBoxChange} />

          <FileContainer>
            <span>{file.name}</span>
            <span>{bytesToSize(file.size)}</span>
            <CloseBtn src="/close.png" onClick={handleCloseBtnClick}></CloseBtn>
          </FileContainer>

          <ConvertButton onClick={handleConvertButtonClick}>
            <ButtonText>변환 하기</ButtonText>
          </ConvertButton>
        </>
      )}
    </ConverterContainer>
  );
};

export default Converter;

const ConverterContainer = styled.div`
  background-color: #3c3c3c;
  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0), linear-gradient(-45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0);
  background-size: 24px 24px;
  background-position: 0 0, 0 12px, 12px -12px, -12px 0;
  width: 60%;
  padding: 45px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 200px;
`;

const Button = styled.div`
  user-select: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 20px;
  width: 50%;
  text-align: center;
`;

const FileButton = styled(Button)`
  box-shadow: 2px 7px 10px 0 rgba(0, 0, 0, 0.1), 2px 11px 11px 0 rgba(0, 0, 0, 0.1), 2px 6px 8px 0 rgba(0, 0, 0, 0.08), 2px 5px 8px 0 rgba(252, 22, 0, 0.05);
  background-color: #f33;
`;

const ConvertButton = styled(Button)`
  box-shadow: 2px 7px 10px 0 rgba(0, 0, 0, 0.1), 2px 11px 11px 0 rgba(0, 0, 0, 0.1), 2px 6px 8px 0 rgba(0, 0, 0, 0.08), 2px 5px 8px 0 rgba(125, 156, 177, 0.05);
  background-color: #7d9cb1;
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 16px;
  line-height: 25px;
  font-weight: 400;
`;

const FileContainer = styled.div`
  width: 50%;
  padding: 20px;
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const CloseBtn = styled.img`
  cursor: pointer;
`;

const SelectBox = styled(Select)`
  width: 25%;
  box-sizing: content-box;
  margin: 30px;
`;
