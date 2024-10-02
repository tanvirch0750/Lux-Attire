// Custom Input component
export const NumberInput: React.FC<{
  value: number | string;
  onChange: (value: number) => void;
  onBlur?: () => void;
}> = ({ value, onChange, onBlur }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={onBlur}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-0"
    />
  );
};
