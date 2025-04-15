import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  closeActiveModal,
  isOpen,
  handleRegistration,
  isLoading,
  openLoginModal,
}) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
      name: "",
      avatar: "",
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(data);
  }

  return (
    <ModalWithForm
      title="Sign up"
      submit="Next"
      isOpen={isOpen}
      onCloseButtonClick={closeActiveModal}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      altSubmit={"or Log in"}
      onAltSubmit={openLoginModal}
    >
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          id="register-email"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          id="register-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          id="register-name"
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          id="register-avatarUrl"
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
