import Modal from "./Modal";
import Button from "./Button";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}) {
  const footer = (
    <>
      <Button variant="ghost" onClick={onClose}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        className={
          isDestructive
            ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
            : ""
        }
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth="max-w-md"
    >
      <p className="text-slate-600 leading-relaxed">{message}</p>
    </Modal>
  );
}

export default ConfirmModal;
