import "./Button.css";

function Button({ children, className, onClick, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
