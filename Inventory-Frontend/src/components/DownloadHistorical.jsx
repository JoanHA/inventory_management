/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaDownload } from "react-icons/fa6";
import { downloadHistoric } from "../api/devices.controller";
function DownloadHistorical({ id }) {
  const handleDownload = async () => {
    const res = await downloadHistoric(id);
    console.log(res.data)
    //Falta pasarlo a PDF 
  };
  return (
    <div>
      <button className="btn btn-info" type="button" onClick={handleDownload}>
        Hoja de vida <FaDownload className="mx-1" />
      </button>
    </div>
  );
}

export default DownloadHistorical;
