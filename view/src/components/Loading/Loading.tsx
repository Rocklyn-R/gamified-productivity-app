import { motion } from "framer-motion";

export const Loading = () => {
  const spinnerSize = "5rem"; // Matches the min-width of the .command-button

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: spinnerSize,
        width: "full",
        padding: "0.19rem",
        borderRadius: "1rem",
        color: "#acd6fc",
      }}
    >
      <motion.div
        style={{
          width: "2rem",
          height: "2rem",
          border: "3px solid #acd6fc",
          borderTop: "3px solid #0c3d63",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};