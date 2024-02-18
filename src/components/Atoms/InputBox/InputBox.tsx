import React, { ChangeEvent } from 'react';
import sanitizeHtml from 'sanitize-html';
import he from 'he';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const InputBox: React.FC<InputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeHtml(e.target.value);
    onChange(sanitizedValue);
  };

  return (
    <input
      placeholder="Enter search text..."
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      type="text"
      value={he.decode(value)}
      onChange={handleChange}
    />
  );
};

export default InputBox;
