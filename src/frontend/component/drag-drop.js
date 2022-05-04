import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import './drag-drop.css'
const fileTypes = ["JPG", "PNG", "GIF",'md'];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };



  
   
  return (
    <FileUploader  handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export  {DragDrop};