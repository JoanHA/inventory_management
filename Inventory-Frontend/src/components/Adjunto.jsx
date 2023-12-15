import React, { useEffect, useState } from "react";
import { getFiles } from "../api/devices.controller";
import { GrAttachment } from "react-icons/gr";
import { URI } from "../../config";
import fileDownload from "js-file-download";
import axios from "axios";
function Adjunto({ id }) {
  const [fileQty, setFileQty] = useState(0);
  const [Filename,setFileName]=useState(null);
  const [OriginalName,setOriginalName]=useState(null);
  const getFileLength = async () => {
    const res = await getFiles(id);
    setFileQty(res.data.length);
    if (res.data.length > 0)  {
        console.log(res.data[0])
        setFileName(res.data[0].file_name)
        setOriginalName(res.data[0].original_name)
    }
  };
  useEffect(() => {
    getFileLength();
  }, []);
  const handleDownload = (url, filename) => {
   
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <>
      <div className="">
        {fileQty > 0 ? (
          <button type="button" class="btn  position-relative" onClick={()=>{handleDownload(`${URI}${Filename}`,OriginalName)}}>
            <GrAttachment size={"1.4rem"}/>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {fileQty}
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        ):""}
      </div>
    </>
  );
}

export default Adjunto;
