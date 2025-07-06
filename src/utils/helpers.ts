import { RentalApplication } from "../types";

export const getApplicationStatusColor = (status:RentalApplication["status"])=>{
    switch (status) {
        case "DRAFT":
            return "#bdbdbd"; // gray
        case "PENDING":
            return "#1976d2"; // blue
        case "UNDER_REVIEW":
            return "#ffa000"; // amber
        case "APPROVED":
            return "#388e3c"; // green
        case "REJECTED":
            return "#d32f2f"; // red
        case "WITHDRAWN":
            return "#757575"; // dark gray
        case "EXPIRED":
            return "#616161"; // darker gray
        case "CONDITIONAL_APPROVAL":
            return "#fbc02d"; // yellow
        default:
            return "#9e9e9e"; // fallback gray
    }
}