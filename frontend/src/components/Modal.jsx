export default function Modal({ title, children, onClose }) {
  const stopPropagation = (e) => e.stopPropagation()

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={stopPropagation}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}