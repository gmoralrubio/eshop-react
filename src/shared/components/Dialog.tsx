import { type ReactNode, type RefObject } from 'react'

interface Props {
  children: ReactNode | string
  dialogRef: RefObject<HTMLDialogElement | null>
}

export const Dialog: React.FC<Props> = ({ children, dialogRef }) => {
  return (
    <dialog
      id="modal"
      className="modal"
      ref={dialogRef}
    >
      <div className="modal-box">{children}</div>
    </dialog>
  )
}
