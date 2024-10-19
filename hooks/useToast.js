import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';  // MUI Icons

// Create the Toast Context
const ToastContext = createContext();

// Define severity-based icons
const severityIcons = {
  success: <CheckCircle style={{ color: '#4CAF50', marginRight: '8px' }} />,
  error: <Error style={{ color: '#F44336', marginRight: '8px' }} />,
  warning: <Warning style={{ color: '#FFC107', marginRight: '8px' }} />,
  info: <Info style={{ color: '#2196F3', marginRight: '8px' }} />,
};

// ToastProvider component that wraps the app
export const ToastProvider = ({ children }) => {
  const showToast = ({
    message,
    severity = 'info', // Default severity
    backgroundColor,    // You can still customize background color
    autoClose = 5000
  }) => {
    // Choose icon based on severity
    const icon = severityIcons[severity];

    toast(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: backgroundColor || severityToColor(severity) }, // Use severity color or custom one
      }
    );
  };

  // A helper function to set default background color based on severity
  const severityToColor = (severity) => {
    switch (severity) {
      case 'success':
        return '#d4edda';
      case 'error':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
      default:
        return '#cce5ff';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast
export const useToast = () => {
  return useContext(ToastContext);
};
