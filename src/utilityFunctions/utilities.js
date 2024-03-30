import moment from "moment";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
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

export const dateFormat = (date) =>
    moment(date).calendar({
        sameDay: "[Today], h:mm a",
        nextDay: "[Tomorrow], h:mm a",
        nextWeek: "dddd, hh:mm a",
        lastDay: "[Yesterday], h:mm a",
        lastWeek: "[Last] ddd, h:mm a",
        sameElse: "D MMMM, YY",
    });
