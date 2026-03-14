interface ButtonPrimaryProps {
  onRetry: () => void;
  text: string;
}

export const ButtonPrimary = ({ onRetry, text }: ButtonPrimaryProps) => {
  return (
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      {text}
    </button>
  );
};
