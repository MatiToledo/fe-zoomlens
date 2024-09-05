import { toast } from "react-toastify";

export default function notify(message: string, type: "success" | "error") {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
