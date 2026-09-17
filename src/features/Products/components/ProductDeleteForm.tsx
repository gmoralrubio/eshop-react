import type { Product } from '@features/Products/types/product.types'

interface Props {
  product: Product
  isMutating: boolean
  deleteProduct: (product: Product) => void
  closeDialog: () => void
}

export const ProductDeleteForm: React.FC<Props> = ({
  product,
  isMutating,
  deleteProduct,
  closeDialog,
}) => {
  return (
    <form method="dialog">
      <p className="mb-4">
        Do you really want to delete: <strong>{product?.name}</strong>
      </p>
      <div className="space-x-4">
        <button
          type="button"
          className="btn btn-error"
          disabled={isMutating}
          onClick={() => deleteProduct(product)}
        >
          {isMutating ? 'Deleting...' : 'Delete'}
        </button>
        <button
          type="button"
          className="btn"
          onClick={closeDialog}
        >
          Close
        </button>
      </div>
    </form>
  )
}
