import React, { useState, useEffect } from "react";
import CustomerManager from "../api/CustomerManager";
import Card from "./Card";
import FinalCheck from "./FinalCheck";
import SplitEquallyModal from "./SplitEqualModal";
import axios from "axios";
import ShareButton from "./ShareButton";

const OrderAssignment = ({ checkHash }) => {
  const [products, setProducts] = useState([]);
  const [totalCustomersArray, setTotalCustomersArray] = useState([]);
  const [positionsInfo, setPositionsInfo] = useState([]);
  const [selectedCustomersPerPosition, setSelectedCustomersPerPosition] =
    useState([]);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const [customerManager] = useState(() => new CustomerManager());

  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);

  const url = `http://localhost:8090/small-router/${checkHash}`;
  const shareUrl = `http://localhost:5173/check/${checkHash}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url);

        const initialOrderData = res.data.client;
        const phoneNumber = res.data.client.numberPhone;

        console.log(phoneNumber);

        if (phoneNumber !== undefined) {
          setPhone(phoneNumber);
        }

        setProducts(initialOrderData.products);

        const initialPositionInfo = {};
        initialOrderData.products.forEach((product) => {
          initialPositionInfo[product.name] = {
            price: product.price,
            count: product.numberServings,
            clients: 0,
            payingClients: 0,
          };
        });

        const initialSelectedCustomersPerPosition = {};
        initialOrderData.products.forEach((product) => {
          initialSelectedCustomersPerPosition[product.name] = [];
        });

        setPositionsInfo(initialPositionInfo);
      } catch (err) {
        setError("Не удалось инициализировать данные");
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleCustomerToggle = (productIdentifier, customerId) => {
    setSelectedCustomersPerPosition((prev) => {
      const currentState = prev[productIdentifier] || [];
      const isSelected = currentState.includes(customerId);

      let updatedState;
      if (isSelected) {
        updatedState = currentState.filter((id) => id !== customerId);
      } else {
        updatedState = [...currentState, customerId];
      }

      updatePositionInfoPayingCount(productIdentifier, updatedState.length);

      return {
        ...prev,
        [productIdentifier]: updatedState,
      };
    });
  };

  const handleAddCustomers = (toAdd) => {
    customerManager.addCustomers(toAdd);
    setTotalCustomersArray(customerManager.getCustomers());
  };

  const updatePositionInfoCount = (positionName, newCount) => {
    setPositionsInfo((prevPositionInfo) => {
      return {
        ...prevPositionInfo,
        [positionName]: {
          ...prevPositionInfo[positionName],
          clients: newCount,
        },
      };
    });
  };

  const updatePositionInfoPayingCount = (positionName, newPaying) => {
    setPositionsInfo((prevPositionInfo) => {
      return {
        ...prevPositionInfo,
        [positionName]: {
          ...prevPositionInfo[positionName],
          payingClients: newPaying,
        },
      };
    });
  };

  const handleApplyEqualSplit = (total, paying) => {
    setPositionsInfo((prevInfo) => {
      const updatedInfo = { ...prevInfo };
      Object.keys(updatedInfo).forEach((positionKey) => {
        updatedInfo[positionKey] = {
          ...updatedInfo[positionKey],
          clients: total,
          payingClients: paying,
        };
      });
      return updatedInfo;
    });

    const clearedSelections = {};
    Object.keys(positionsInfo).forEach((positionKey) => {
      clearedSelections[positionKey] = [];
    });
    setSelectedCustomersPerPosition(clearedSelections);

    setIsSplitModalOpen(false);
  };

  return (
    <div className="p-4 mx-auto w-fit max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Распределение позиций заказа
      </h1>
      {error && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="flex flex-col">
        {products.map((product) => {
          return (
            <Card
              key={product.name}
              product={product}
              totalCustomersArray={totalCustomersArray}
              countOfClients={positionsInfo[product.name].clients}
              selectedCustomers={
                selectedCustomersPerPosition[product.name] || []
              }
              addCustomers={handleAddCustomers}
              onCustomerToggle={handleCustomerToggle}
              updatePositionInfoCount={updatePositionInfoCount}
            />
          );
        })}
      </div>

      <div className="mb-2 text-center">
        <button
          onClick={() => setIsSplitModalOpen(true)}
          className="mt-2 p-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors disabled:opacity-50"
          disabled={products.length === 0}
        >
          Поделить все поровну
        </button>
      </div>

      <div className="mt-2 text-lg font-semibold">
        <FinalCheck positionsInfo={positionsInfo} phoneNumber={phone} />
      </div>

      <SplitEquallyModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        onSubmit={handleApplyEqualSplit}
      />

      <ShareButton url={shareUrl} />
    </div>
  );
};

export default OrderAssignment;
