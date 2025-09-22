const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // If the modal isn't open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    // The modal-overlay is the semi-transparent background
    <div className="modal-overlay" onClick={onClose}>
      {/* We stop propagation on the content so clicking it doesn't close the modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </header>
        <main className="modal-body">{children}</main>
        {/* The footer is optional and will only render if provided */}
        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
