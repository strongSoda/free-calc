import React from "react";

const CidrComponent = ({ cidrValue }) => {
  // Determine the use case based on CIDR value
  const getUseCase = (value) => {
    if (value <= 32) return "ISP allocation";
    if (value <= 48) return "Organization subnet";
    if (value <= 64) return "End-user network";
    return "Device-specific subnet";
  };

  const useCase = getUseCase(cidrValue);

  return (
    <li>
      Typical use case: {useCase}
    </li>
  );
};

export default CidrComponent;
