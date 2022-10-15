import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // Redirect

    count === 0 && navigate("/");

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="alert alert-warning text-center">
        <h4>
          ບໍ່ອະຍຸຍາດໃຫ້ເຂົ້າ, ກະລຸນາລ໋ອກອີນ : &nbsp;
          <span className="badge bg-primary">{count}</span>
        </h4>
      </div>
    </>
  );
};

export default LoadingToRedirect;
