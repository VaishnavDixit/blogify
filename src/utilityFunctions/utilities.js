import {enqueueSnackbar} from "notistack";
import { useNavigate } from "react-router-dom";
export const snackbar = (type = "success", message = "-") => {
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            horizontal: "center",
            vertical: "top",
        },
        style: {
            background: type === "success" ? "green" : "red",
        },
    });
};
