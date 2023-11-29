/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaDownload } from "react-icons/fa6";
import { downloadHistoric } from "../api/devices.controller";
import jsPDF from "jspdf";
function DownloadHistorical({ id }) {
  const handleDownload = async () => {
    try {
      const doc = new jsPDF();
      const res = await downloadHistoric(id);
      const Data = res.data;
      console.log(Data);

      var x = 10;
      var y = 70;
      var body = [];

      //Cabeceras de la tabla
      const headers = [
        "Nombre",
        "Tipo",
        "Razon",
        "Estado",
        "Importancia",
        "Descripción",
        "Creador evento",
        "Realización",
      ];

      //Llenado de datos de los eventos
      Data.forEach((e) => {
        const evento = [
          e.eventName,
          e.event_type_name,
          e.event_reason_name,
          e.event_status_name,
          e.event_importance,
          e.eventDescription,
          e.event_created_by_name,
          e.eventCreatedAt.split("T")[0],
        ];
        body.push(evento);
      });

      // Imprimir info del equipo

      doc.text(`Hoja del vida del equipo ${Data[0].equipment_name}`, 65, 10);
      doc.text(`Modelo: ${Data[0].model}`, 10, x + 20);
      doc.text(`Serial: ${Data[0].serial}`, 120, x + 20);
      doc.text(`Marca: ${Data[0].mark_name}`, 10, x + 30);
      doc.text(`Estado: ${Data[0].status_name}`, 120, x + 30);
      doc.text(`Reponsable: ${Data[0].user_name}`, 10, x + 40);
      doc.text(`Creado el: ${Data[0].created_at.split("T")[0]}`, 120, x + 40);

      doc.text("Eventos de este equipo", 65, 60);

      //Imprimir tabla de eventos

      doc.autoTable({
        body: body,
        startY: y,
        head: [headers],
        theme: "striped",
        headStyles: {
          lineWidth: 1,
              fillColor: [204, 204, 255],
          textColor: [0, 0, 0],
        },
      });
      //Guardar documento
      doc.save(`Hoja del vida del equipo ${Data[0].equipment_name}.pdf`);
    } catch (error) {
      swal.fire("Este equipo no tiene eventos", "Si intentas descargar la informacion de solamente el equipo lo puede haces desde la pagina de equipos", "info");
      console.log(error);
    }
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
