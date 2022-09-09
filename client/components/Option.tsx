import { useState } from "react";

export default function Option({ option, answer, setAnswer }: any) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="relative flex items-center">
      <input
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          setAnswer({ ...answer, [option._id]: !checked });
        }}
        type="checkbox"
        name="option"
        value={option.title}
        id={option._id}
      />

      <label
        className="ml-4 flex-grow p-4 text-sm font-medium border rounded-lg cursor-pointer transition-colors shadow-sm hover:bg-gray-50"
        htmlFor={option._id}
      >
        {option.title}
      </label>
    </div>
  );
}
