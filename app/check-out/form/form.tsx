import ClassicInput from "./input";
import statesData from "~/lib/data/states-data";
interface formType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  selectedState: string;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  places: string[];
  handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  successfulPayment: boolean;
}
const Form = ({
  email,
  setEmail,
  selectedState,
  city,
  setCity,
  setAddress,
  setError,
  setName,
  setPhone,
  places,
  phone,
  error,
  handleCountryChange,
  name,
  address,
  successfulPayment,
}: formType) => {
  return (
    <div className="w-full flex flex-col gap-8 p-5 max-md:gap-6">
      <ClassicInput
        value={email}
        success={successfulPayment}
        setValue={setEmail}
        autocomplete="on"
        placeholder="EMAIL *"
        error={error}
        setError={setError}
        autofocus
        name="email"
        errorContent="All fields are required"
      />
      <ClassicInput
        success={successfulPayment}
        value={name}
        setValue={setName}
        autocomplete="on"
        placeholder="NAME *"
        error={error}
        setError={setError}
        name="fullName"
        errorContent="All fields are required"
      />
      <ClassicInput
        value={phone}
        success={successfulPayment}
        setValue={setPhone}
        autocomplete="on"
        placeholder="PHONE *"
        error={error}
        setError={setError}
        inputType="tel"
        name="phone"
        errorContent="All fields are required"
      />
      <ClassicInput
        success={successfulPayment}
        value={address}
        setValue={setAddress}
        autocomplete="on"
        placeholder="ADDRESS *"
        error={error}
        setError={setError}
        inputType="text"
        name="	addressLine1"
        errorContent="All fields are required"
      />

      <div className="flex flex-col gap-0 w-full ">
        <select
          className={`border-b-2  focus:border-b-3     h-[40px]   gt-black   text-xl  outline-none  max-md:text-lg  ${
            error === "All fields are required" && selectedState === ""
              ? "border-red"
              : "border-black "
          }`}
          onChange={(e) => {
            handleCountryChange(e);
            setError("");
          }}
          value={selectedState}
          disabled={successfulPayment}
        >
          <option value="" className="text-base  gt-reg    ">
            STATE
          </option>
          {Object.keys(statesData).map((state) => (
            <option key={state} value={state} className="text-base gt-reg   ">
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-0 w-full ">
        <select
          className={`border-b-2  focus:border-b-3     h-[40px] text-black  gt-black   text-xl  outline-none max-md:text-lg ${
            error === "All fields are required" && !city
              ? "border-red"
              : "border-black"
          }`}
          disabled={!selectedState || successfulPayment}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
        >
          <option value="" className="text-base gt-reg   ">
            CITY
          </option>
          {places.map((place) => (
            <option
              key={place}
              value={place}
              onClick={() => setCity(place)}
              className="text-base gt-reg   "
            >
              {place}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;
