import React from "react";
import OrderAssignment from "../components/OrderAssignment";
import { useParams } from "react-router";

const FormedCheckPage = () => {
  const { checkHash } = useParams();

  return (
    <div>
      <OrderAssignment checkHash={checkHash} />
    </div>
  );
};

export default FormedCheckPage;
