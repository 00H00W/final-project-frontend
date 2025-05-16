import "./Modal.css";

function Modal({ children, isOpen, closeActiveModal }) {
  return (
    <div
      onClick={closeActiveModal}
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default Modal;
