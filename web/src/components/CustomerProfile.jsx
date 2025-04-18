import React from "react";

const CustomerProfile = ({ customer, isSelected, onClick }) => {
  const selectedBorderStyle = isSelected
    ? { border: "3px solid green", borderRadius: "50%" }
    : { border: "3px solid transparent", borderRadius: "50%" };

  const selectedTextStyle = isSelected ? { color: "green" } : {};

  return (
    <div
      className="flex flex-col items-center text-center cursor-pointer select-none"
      onClick={() => onClick(customer.id)}
    >
      <img
        src={customer.avatar}
        alt={customer.name}
        className="w-10 h-10 rounded-full object-cover"
        style={selectedBorderStyle}
      />
      <span className="text-xs mt-1" style={selectedTextStyle}>
        {customer.name}
      </span>
    </div>
  );
};

export default CustomerProfile;
