import React from "react";
import "./adminCajeros.css";
import { FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function AdminCajeros() {
  // td columna
  // tr fila
  // th encabezado (negrita)
  return (
    <div>
      <div className="table redB d-flex flex-column">
        <table className="greenB col-10 m-auto">
          <tr>
            <th>Red</th>
            <th>Nombre</th>
            <th>Genero</th>
            <th>Numero</th>
            <th>Enlace</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
          <tr>
            <td>Red 1</td>
            <td>Fernando</td>
            <td>M</td>
            <td>1112345678</td>
            <td>google.com</td>
            <td>
              <button>
                <FaTrash />
              </button>
            </td>
            <td>
              <button>
                <ImCross />
              </button>
            </td>
          </tr>
          <tr>
            <td>Red 1</td>
            <td>Fernando</td>
            <td>M</td>
            <td>1112345678</td>
            <td>google.com</td>
            <td>
              <button>
                <FaTrash />
              </button>
            </td>
            <td>
              <button>
                <ImCross />
              </button>
            </td>
          </tr>
          <tr>
            <td>Red 1</td>
            <td>Fernando</td>
            <td>M</td>
            <td>1112345678</td>
            <td>google.com</td>
            <td>
              <button>
                <FaTrash />
              </button>
            </td>
            <td>
              <button>
                <ImCross />
              </button>
            </td>
          </tr>
          <tr>
            <td>Red 1</td>
            <td>Fernando</td>
            <td>M</td>
            <td>1112345678</td>
            <td>google.com</td>
            <td>
              <button>
                <FaTrash />
              </button>
            </td>
            <td>
              <button>
                <ImCross />
              </button>
            </td>
          </tr>
        </table>
        <div className="greenB col-4 m-auto">
          <form className="d-flex flex-column">
            <h5>Editar cajero</h5>
            <div>
              <input placeholder="Red" />
              <input placeholder="Nombre" />
            </div>
            <input placeholder="Genero" />
            <input placeholder="Numero" />
            <input placeholder="Enlace" />
            <button>Editar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCajeros;
