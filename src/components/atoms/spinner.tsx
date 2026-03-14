export const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-12" aria-label="loading-spinner">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute -inset-1 bg-linear-to-tr from-blue-600/20 to-transparent rounded-full blur-sm"></div>
      </div>
    </div>
  );
};
