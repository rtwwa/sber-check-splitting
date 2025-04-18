// SplitEquallyModal.js
import React, { useState, useEffect } from "react";

const SplitEquallyModal = ({ isOpen, onClose, onSubmit }) => {
  const [totalParticipants, setTotalParticipants] = useState("");
  const [payingParticipants, setPayingParticipants] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTotalParticipants("");
      setPayingParticipants("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const total = parseInt(totalParticipants, 10);
    const paying = parseInt(payingParticipants, 10);

    if (isNaN(total) || isNaN(paying) || total < 0 || paying < 0) {
      setError("Пожалуйста, введите корректные неотрицательные числа.");
      return;
    }
    if (paying > total) {
      setError(
        "Количество платящих не может быть больше общего количества участников."
      );
      return;
    }

    onSubmit(total, paying);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Поделить счет поровну
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="totalParticipants"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Общее кол-во участников:
            </label>
            <input
              type="number"
              id="totalParticipants"
              min="0"
              step="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={totalParticipants}
              onChange={(e) => setTotalParticipants(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="payingParticipants"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Кол-во платящих участников:
            </label>
            <input
              type="number"
              id="payingParticipants"
              min="0"
              step="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={payingParticipants}
              onChange={(e) => setPayingParticipants(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Применить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SplitEquallyModal;
