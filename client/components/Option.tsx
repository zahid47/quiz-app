import React from "react";

export default function Option() {
  return (
    <div className="relative">
      <input
        className="hidden group peer"
        type="checkbox"
        name="option"
        value="option"
        id="option"
      />

      <label
        className="block p-4 text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-blue-500 hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-blue-500"
        htmlFor="option"
      >
        Regularly
      </label>
    </div>
  );
}
