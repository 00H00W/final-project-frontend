import "./ModalWithForm.css";
import React from "react";

function ModalWithForm({
  children,
  title,
  submit,
  isOpen,
  onCloseButtonClick,
  onSubmit,
}) {
  const [valid, setValidity] = React.useState(false);
  const checkFormValidity = (e) => {
    setValidity(e.currentTarget.checkValidity());
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          onClick={onCloseButtonClick}
          type="button"
        >
          Close
        </button>
        <form
          onChange={checkFormValidity}
          onSubmit={onSubmit}
          className="modal__form"
        >
          {children}
          <button
            className="modal__submit-button"
            type="submit"
            disabled={!valid}
          >
            {submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
