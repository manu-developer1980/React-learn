import React from "react";

export default function LoadingSpinner() {
  console.log("Spinner Spineando!");
  return (
    <div className="loadingContainer">
      <span className="loadingSpinner"></span>
      <p>Cargando datos...</p>
    </div>
  );
}
