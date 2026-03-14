import { ButtonPrimary } from "../atoms/button-primary";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="p-4 my-4 bg-red-50 border border-red-200 rounded-lg text-center">
      <p className="text-red-600 font-medium mb-2">{message}</p>
      {onRetry && <ButtonPrimary onRetry={onRetry} text="Reintentar" />}
    </div>
  );
};
