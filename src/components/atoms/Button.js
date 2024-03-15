export const Button = ({
  title,
  type,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={"css_button " + ` ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

