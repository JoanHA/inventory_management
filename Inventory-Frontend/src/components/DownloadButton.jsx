/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.mjs";
import autoTable from "jspdf-autotable"
import jsPDF from "jspdf";
function DownloadButton({ data = [], filter }) {
  const [filtering, setFiltering] = useState([]);
  const [pathname, SetPathname] = useState("");
  useEffect(() => {
    const path = window.location.pathname;
    SetPathname(path);
  }, []);

  //Guardar datos
  const handleExcel = () => {
    Swal.fire({
      title: "Espera!",
      text: "Recuerda que si estan filtrando los datos, mientras mas especifico seas, mejor 😉",
      icon: "question",
    }).then(() => {
      const datos = getData();
      if (datos.length > 0) {
        const data = [];
        datos.forEach((element) => {
          const equipo = {
            Id: element.id,
            Nombre: element.name,
            Oficina: element.office,
            Serial: element.serial,
            Usuario: element.user,
            Ram: element.ram,
            Disco_duro: element.hard_disk,
            Procesador: element.proccesor,
            Sistema_operativo: element.system,
            Descripcion: element.description,
            Estado: element.statusName,
            Marca: element.paramName,
            Creado: element.created_at.split("T")[0],
          };
          data.push(equipo);
        });
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "datosFiltrados.xlsx");
      }
    });
  };

  // const handlePDF = () => {
  //   Swal.fire({
  //       title: "Espera!",
  //       text: "Recuerda que si estan filtrando los datos, mientras mas especifico seas, mejor 😉",
  //       icon: "question",
  //     }).then(() =>  {  const datos = getData();
  //   if (datos.length > 0) {
  //     const data = [];
  //     datos.forEach((element) => {
  //       const equipo = {
  //         Id: element.id,
  //         Nombre: element.name,
  //         Oficina: element.office,
  //         Serial: element.serial,
  //         Usuario: element.user,
  //         Ram: element.ram,
  //         Disco_duro: element.hard_disk,
  //         Procesador: element.proccesor,
  //         Sistema_operativo: element.system,
  //         Descripcion: element.description,
  //         Estado: element.statusName,
  //         Marca: element.paramName,
  //         Creado: element.created_at.split("T")[0],
  //       };
  //       data.push(equipo);
  //     });
  //     const doc = new jsPDF();
  //     var x = 10;
  //     doc.text("**Equipos Registrados**", 10, 8);
  //     data.forEach((e, index) => {
  //       doc.text(`Id: ${e.Id}`, 10, x + 10);
  //       doc.text(`Nombre: ${e.Nombre}`, 10, x + 20);
  //       doc.text(`Oficina: ${e.Oficina}`, 10, x + 30);
  //       doc.text(`Serial: ${e.Serial}`, 10, x + 40);
  //       doc.text(`Usuario: ${e.Usuario}`, 10, x + 50);
  //       doc.text(`Ram: ${e.Ram}`, 10, x + 60);
  //       doc.text(`Disco duro: ${e.Disco_duro}`, 10, x + 70);
  //       doc.text(`Procesador: ${e.Procesador}`, 10, x + 80);
  //       doc.text(`Sistema operativo: ${e.Sistema_operativo}`, 10, x + 90);
  //       doc.text(`Descripcion: ${e.Descripcion}`, 10, x + 100);
  //       doc.text(`Estado: ${e.Estado}`, 10, x + 110);
  //       doc.text(`Marca: ${e.Marca}`, 10, x + 120);
  //       doc.text(`Creado: ${e.Creado}`, 10, x + 130);
  //       doc.text(
  //         "------------------------------------------------------",
  //         10,
  //         x + 140
  //       );

  //       if ((index + 1) % 2 === 0) {
  //         doc.addPage();
  //         x = 10; // Reset x for the new page
  //       } else {
  //         x += 150; // Adjust y for the next set of data
  //       }
  //     });

  //     doc.save("EquiposFiltrados.pdf");
  //   }})
  // };

  const handlePDF = () => {
    Swal.fire({
      title: "Espera!",
      text: "Recuerda que si estan filtrando los datos, mientras mas especifico seas, mejor 😉",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        const datos = getData();
        if (datos.length > 0) {
          const data = [];
          datos.forEach((element) => {
            const equipo = {
              Id: element.id,
              Nombre: element.name,
              Oficina: element.office,
              Serial: element.serial,
              Usuario: element.user,
              Ram: element.ram,
              Disco_duro: element.hard_disk,
              Procesador: element.proccesor,
              Sistema_operativo: element.system,
              Descripcion: element.description,
              Estado: element.statusName,
              Marca: element.paramName,
              Creado: element.created_at.split("T")[0],
            };
            data.push(equipo);
          });
          const doc = new jsPDF("l", "pt", "letter");
  
          var body = [
           
          ];
          data.forEach((e, index) => {
            const data = [
              e.Nombre,
              e.Oficina,
              e.Serial,
              e.Usuario,
              e.Ram,
              e.Disco_duro,
              e.Procesador,
              e.Sistema_operativo,
              e.Descripcion,
              e.Estado,
              e.Marca,
              e.Creado
            ];
            body.push(data);
          
          });
          var y = 30;
          doc.setLineWidth(1);
          doc.text(200, y-10,"Reporte de equipos filtrados");
          doc.autoTable({
            body: body,
            startY: y,
            head:[ [
              "Nombre",
              "Oficina",
              "Serial",
              "Usuario",
              "Ram",
              "Disco Duro",
              "Procesador",
              "Sistema Operativo",
              "Descripción",
              "Estado",
              "Marca",
              "Creación",
            ]],
           theme:"striped",
            headStyles :{lineWidth: 1,fillColor: [0, 0, 250],textColor: [255,255,255],
           },
          })
  
          doc.save("Reporte de Equipos.pdf");
        }
      }
    
    });
  };
  //Funcion para filtrar los datos
  const mapear = (map) => {
    var retorno = false;
    map.map((element) => {
      const datas = element.toString().toLowerCase();
      if (datas.match(filter)) {
        retorno = true;
      }
    });
    return retorno;
  };
  //obtener los datos Filtrados
  const getData = () => {
    if (filter) {
      if (data) {
        const FilteredData = data.filter((equip) => {
          const map = Object.values(equip).filter(Boolean);
          if (mapear(map)) {
            return true;
          }
        });
        setFiltering(FilteredData);
        if (FilteredData.length == 0) {
          return swal.fire(
            "No se encontraron datos para descargar",
            "",
            "error"
          );
        }
        return FilteredData;
      } else {
        return swal.fire("No se encontraron datos para descargar", "", "error");
      }
    } else {
      if (!data) {
        return swal.fire("No se encontraron datos para descargar", "", "error");
      }
      return data;
    }
  };
  return (
    <div className={pathname == "/equipments" ? "d-block" : "d-none"}>
      <div className="btn-group" role="group" aria-label="Basic  example">
        <button
          type="button"
          className="btn btn-primary no-radius "
          onClick={handleExcel}
        >
          Descargar Excel
          <FaDownload className="mx-1" />
        </button>
        <button
          type="button"
          className="btn btn-secondary no-radius"
          onClick={handlePDF}
        >
          Descargar PDF
          <FaDownload className="mx-1" />
        </button>
      </div>
    </div>
  );
}

export default DownloadButton;
