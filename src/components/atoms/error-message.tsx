interface ErrorMessageProps {
    message: string;
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="text-center text-red-500">{message}</p>
  )
}
