type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  label?: string;
  errorContent?: string;
  name?: string;
  inputType?: string;
  placeholder?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  autocomplete?: "on" | "off";
  autofocus?: boolean;
  success: boolean;
};
const ClassicInput = ({
  value,
  error,
  setValue,
  setError,
  errorContent,
  placeholder,
  inputType = "text",
  label,
  autocomplete = "on",
  autofocus = false,
  name,
  success = false,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full ">
      {label && (
        <span className="text-lg         text-darkGrey  thunder   uppercase">
          {label}:
        </span>
      )}

      <input
        className={`h-[40px] py-1 px-3   text-black  gt-black   text-xl line-clamp-1  border-b-2    focus:border-b-3     w-full  duration-150 outline-none max-md:text-lg   ${
          error === errorContent && !value
            ? "border-red  text-red"
            : "border-grey"
        }`}
        readOnly={success}
        placeholder={placeholder}
        type={inputType}
        value={value}
        name={name}
        autoFocus={autofocus}
        required
        autoComplete={autocomplete}
        onChange={(e) => {
          setValue(e.target.value);
          setError?.("");
        }}
      />
    </div>
  );
};

export default ClassicInput;
