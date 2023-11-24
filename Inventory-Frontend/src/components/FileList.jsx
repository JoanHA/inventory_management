import React, { useEffect, useState } from "react";
import { getFiles, deleteFiles } from "../api/devices.controller";
import axios from "axios";
import fileDownload from "js-file-download";
import { URI } from "../../config";

function FileList({ id }) {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const get = async () => {
      try {
        const res = await getFiles(id);
        console.log(res.data);
        setDatos(res.data);
      } catch (error) {
        console.log(error)
      }
   
    };
    if (id) {

      get()
    }
  }, []);
  const deleteFile = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras recuperar este archivo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFiles(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              window.location.reload();
            }
          );
        } catch (error) {
          Swal.fire(
            "Lo sentimos!",
            "Tuvimos un error intenta mas tarde.",
            "error"
          );
        }
      }
    });
  };
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
    <div
      id="addModal"
      className="back w-100 vh-100 d-flex justify-content-center d-none "
    >
      <div className="mt-1">
        <div className="bg-light h-50 w-100 px-4 py-3 rounded">
          <div className="d-flex flex-row gap-5 ">
            <div className="">
              <button
                className=" btn btn-dark btn-sm mb-2"
                type="button"
                onClick={() => {
                  document.getElementById("addModal").classList.add("d-none");
                }}
              >
                Cerrar
              </button>
            </div>
            <h3 className="mx-4">Lista de archivos de este equipo</h3>
          </div>

          <div>
            <table className="table table-striped table-hover px-3 py-2 table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo de archivo</th>
                  <th>Equipo</th>
                  <th>Fecha de subida</th>
                  <th colSpan={2}>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {datos &&
                  datos.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element && element.file_name.split("-")[1]}</td>
                        <td>{element && element.file_type.split("/")[1]}</td>
                        <td>{element && element.equip_name}</td>
                        <td>{element && element.created_at.split("T")[0]}</td>
                        <td colSpan={2}>
                          <button
                            className="btn btn-primary btn-sm mx-1"
                            onClick={() => {
                              handleDownload(
                                `${URI}${element.file_name}`,
                                element.file_name.split("-")[1]
                              );
                            }}
                          >
                            Descargar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteFile(element.id);
                            }}
                          >
                            Borrar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileList;
