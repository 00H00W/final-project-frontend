import "./Modal.css";

function Modal({ children, isOpen, closeActiveModal }) {
  const handleClick = (e) => {
    if (e.target == e.currentTarget) closeActiveModal();
  };

  return (
    <div
      onClick={handleClick}
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      {children}
    </div>
  );
}

export default Modal;
