import "./ProfileModal.css";
import Modal from "../Modal/Modal";
import Button from "../../Button/Button";

function ProfileModal({ isOpen, closeActiveModal, userData }) {
  return (
    <Modal isOpen={isOpen} closeActiveModal={closeActiveModal}>
      <div className={`profile-modal${isOpen ? " profile-modal_opened" : ""}`}>
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        >
          {/* <img src={closeIcon} alt="Close Icon" /> */}
          Close
        </button>
        <img
          className="profile-modal__avatar"
          src={userData?.data?.avatar}
          alt="User's avatar"
        />
        <h2 className="profile-modal__name">{userData?.data?.name}</h2>
        <Button>Edit Profile</Button>
      </div>
    </Modal>
  );
}

export default ProfileModal;
