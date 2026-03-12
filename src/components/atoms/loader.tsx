interface LoaderProps {
    text: string;
}

export const Loader = ({ text }: LoaderProps) => {
  return (
    <p className="text-center text-gray-500">{text}</p>
  )
}
