import React, { useState, useMemo } from "react";

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FinalCheck = ({ positionsInfo, phoneNumber }) => {
  const [tipPercent, setTipPercent] = useState(0);
  const [customTipInput, setCustomTipInput] = useState("");

  const subtotal = useMemo(() => {
    return Object.values(positionsInfo).reduce((acc, info) => {
      if (
        info.clients > 0 &&
        info.payingClients > 0 &&
        info.price > 0 &&
        info.count > 0
      ) {
        const pricePerPayingClient = (info.price * info.count) / info.clients;
        const positionTotal = pricePerPayingClient * info.payingClients;
        return acc + positionTotal;
      }
      return acc;
    }, 0);
  }, [positionsInfo]);

  const handlePercentButtonClick = (percent) => {
    if (tipPercent === percent && customTipInput === "") {
      setTipPercent(0);
    } else {
      setTipPercent(percent);
      setCustomTipInput("");
    }
  };

  const handleCustomTipChange = (e) => {
    let value = e.target.value;

    if (value.length > 1 && value.startsWith("0") && !value.startsWith("0.")) {
      value = value.substring(1);
    }

    if (Number(value) < 0) {
      setCustomTipInput(0);
      return;
    }

    if (Number(value) >= 0) {
      setCustomTipInput(value);

      setTipPercent(parseFloat(value) || 0);
    }

    if (Number(value) > 100) {
      setCustomTipInput("100");
      setTipPercent(100);
    }
  };

  const tipAmount = subtotal * (tipPercent / 100);
  const grandTotal = subtotal + tipAmount;

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      {subtotal > 0 ? (
        <>
          <h4 className="text-lg font-semibold mb-3 border-b pb-2">
            Детализация счета:
          </h4>
          <ul className="mb-4">
            {Object.entries(positionsInfo).map(([positionName, info]) => {
              const totalPriceForPosition =
                info.clients > 0 &&
                info.payingClients > 0 &&
                info.price > 0 &&
                info.count > 0
                  ? ((info.price * info.count) / info.clients) *
                    info.payingClients
                  : 0;

              if (info.payingClients > 0) {
                return (
                  <li
                    key={positionName}
                    className="flex flex-col py-2 border-b last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{positionName}</span>
                      <span className="text-sm text-gray-700">
                        {info.count} шт. x{" "}
                        {currencyFormatter.format(info.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Участников: {info.clients}</span>
                      <span>Платят: {info.payingClients}</span>
                    </div>
                    {totalPriceForPosition > 0 && (
                      <div className="flex justify-end mt-1 text-sm">
                        <span className="text-gray-800">
                          С вас за позицию:{" "}
                          <span className="font-medium">
                            {currencyFormatter.format(totalPriceForPosition)}
                          </span>
                        </span>
                      </div>
                    )}
                  </li>
                );
              }
              return null;
            })}
          </ul>

          <div className="flex justify-between items-center mb-4 pt-4 border-t">
            <span className="text-md font-semibold">Подытог:</span>
            <span className="text-md font-semibold">
              {currencyFormatter.format(subtotal)}
            </span>
          </div>

          <div className="w-full mt-2 mb-4">
            <h5 className="text-md font-semibold mb-2 ">Добавить чаевые:</h5>
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {[0, 5, 10, 15, 20].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className={`px-3 py-1 border rounded-full text-sm transition-colors duration-150 ${
                    tipPercent === percent && customTipInput === ""
                      ? "bg-green-600 text-white border-green-600 font-semibold shadow-sm"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => handlePercentButtonClick(percent)}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <div className="relative flex justify-center py-2">
              <input
                type="text"
                inputMode="decimal"
                min="0"
                placeholder="Свой %"
                className={`py-1 border rounded-full transition-all duration-150 w-24
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    text-center text-sm ${
                      customTipInput !== ""
                        ? "border-green-500 font-semibold ring-1 ring-green-200"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                value={customTipInput}
                onChange={handleCustomTipChange}
              />
              {customTipInput !== "" && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  %
                </span>
              )}
            </div>
            {tipAmount > 0 && (
              <div className="text-right text-sm text-green-700 mt-2">
                Чаевые ({tipPercent}%): +{currencyFormatter.format(tipAmount)}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-semibold text-xl mb-4">
              <span>К оплате:</span>
              <span className="text-green-600">
                {currencyFormatter.format(grandTotal)}
              </span>
            </div>

            {phoneNumber !== "undefined" && (
              <div className="flex flex-col items-end gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `https://www.sberbank.com/sms/pbpn?requisiteNumber=${phoneNumber}`;
                  }}
                  className="text-gray-600 hover:text-green-600 hover:cursor-pointer transition-colors duration-150"
                >
                  Перевести через СБП
                </button>

                <button
                  type="button"
                  onClick={() => alert("Оплата улыбкой пока в разработке!")}
                  className="text-gray-600 hover:text-green-600 hover:cursor-pointer transition-colors duration-150"
                >
                  Оплатить улыбкой
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Нет позиций для оплаты.
        </p>
      )}
    </div>
  );
};

export default FinalCheck;
