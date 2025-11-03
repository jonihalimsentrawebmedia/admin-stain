import Select, { type StylesConfig } from "react-select";

const options = [
  { value: "semua", label: "Semua" },
  { value: "teknik", label: "Fakultas Teknik" },
  { value: "ekonomi", label: "Fakultas Ekonomi" },
];

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderColor: "#22c55e", // hijau
    boxShadow: state.isFocused ? "0 0 0 1px #22c55e" : "none",
    "&:hover": { borderColor: "#22c55e" },
    borderRadius: "8px",
    minHeight: "48px",
    paddingLeft: "4px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
    fontSize: "16px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#666",
    fontSize: "16px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#16a34a", // hijau
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    // zIndex: 99,
  }),
};
interface Props {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}
const SelectFilter = ({label,options}:Props) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-green-600 z-10 text-sm font-medium absolute ml-3 bg-white px-1 w-fit  -top-2.5">
        {label}
      </label>
      <Select
        defaultValue={options[0]}
        options={options}
        styles={customStyles}
        className="min-w-xs"
      />
    </div>
  );
};

export default SelectFilter;
