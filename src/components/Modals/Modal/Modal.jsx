import "./Modal.css";

function Modal({ children, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default Modal;
