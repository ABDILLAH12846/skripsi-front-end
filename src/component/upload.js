"use client"

import GalleryImage from "../../public/svg/gallery.svg"
import Image from 'next/image';
import { Spin } from 'antd';
// Upload.js

import React, { useState } from 'react';
import { css } from '@/utils/stitches.config';

export default function Upload({url, setUrl}) {
  // const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState()


  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      setMessage('No file selected');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      setUrl(data.url)
      setMessage('Upload successful: ' + data.url);
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={styles.container()}>
      {
        loading
          ?
          <Spin />
          :
          <Image src={url ? url : GalleryImage} width={40} height={40} />
      }
      <input id="myfile" name="myfile" ref={(val) => setRef(val)} type="file" onChange={handleFileChange} />
    </div>
  );
};

const styles = {
  container: css({
    // height: "100%",
    // height: 40,
    width: "100%",
    // borderRadius: 12,
    // border: "1px solid #d9d9d9",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    gap: 20,
  }),
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
  })
}

