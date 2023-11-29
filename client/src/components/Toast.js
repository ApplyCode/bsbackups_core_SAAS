import { toast } from "react-toastify"

export const showToast = (message, options = {}) => {
  const defaultOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return toast(message, mergedOptions)
}
