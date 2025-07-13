import { useEffect, type ReactNode } from "react";
import { useAuth } from "./auth.controller";
import { useNavigate } from "react-router-dom";


export function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()


  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated()) return null;

  return <>{children}</>


}

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};
export const AuthInputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`placeholder:text-gray-500 focus:border-transparent border ${
          error ? "border-red-500" : "border-gray-800"
        } w-full px-4 py-2 rounded-xl`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

