import "./LoginModal";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  closeActiveModal,
  isOpen,
  handleAuthorization,
  isLoading,
  openRegisterModal,
  modalData,
}) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    reset();
  }, [isOpen]);

  function reset() {
    setData({
      email: "",
      password: "",
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleAuthorization(data);
  }

  return (
    <ModalWithForm
      title="Log in"
      submit="Log in"
      isOpen={isOpen}
      onCloseButtonClick={closeActiveModal}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      altSubmit={"or Register"}
      onAltSubmit={openRegisterModal}
      modalData={modalData}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          id="login-email"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          id="login-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
