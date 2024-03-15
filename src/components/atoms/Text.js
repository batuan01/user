export const TextRequired = ({ children }) => {
  return (
    <p className="flex items-center gap-2">
      <span className="text-[#FF6868]  text-2xl">*</span>
      {children}
    </p>
  );
};
