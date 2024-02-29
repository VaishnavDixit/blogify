import {enqueueSnackbar} from "notistack";

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
