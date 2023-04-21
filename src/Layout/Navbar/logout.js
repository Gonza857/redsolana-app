import { toast } from "react-toastify";
import { logoutFB } from "../../firebase/firebase";

export const closeSession = () => {
  logoutFB();
  toast.success("Cerraste sesión correctamente!", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
