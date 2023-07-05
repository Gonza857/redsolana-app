import { toast } from "react-toastify";

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
