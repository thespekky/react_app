import React, { useContext } from "react";
import AlertContext from "./alert.context";
const alertStyles = {
  padding: "16px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: 400,
  width: "300px",
  position: "fixed",
  top: "120px",
  right: "10px",
};
const severityStyles = {
  success: {
    color: "#0f5132",
    background: "#d1e7dd",
  },
  info: {
    color: "#055160",
    background: "#cff4fc",
  },
  warning: {
    color: "#664d03",
    background: "#fff3cd",
  },
  danger: {
    color: "#842029",
    background: "#f8d7da",
  },
};
export const Alert = () => {
  const [alert] = useContext(AlertContext);
  if (!alert) {
    return null;
  }
  const fullStyles = { ...alertStyles, ...severityStyles[alert.type] };
  return <div style={fullStyles}>{alert.text}</div>;
};
