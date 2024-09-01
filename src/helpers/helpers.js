import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const toastError = (errorMsg) => {
  toast.error(errorMsg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};

export const toastSuccess = (successMsg) => {
  toast.success(successMsg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const toastInfo = (infoMsg) => {
  toast.info(infoMsg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const sleep = async (time) => {
  setTimeout(() => {}, time);
};

export const askForDeleteDraw = () => {
  return Swal.fire({
    title: "¿Seguro que deseas eliminar el sorteo actual?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
};
