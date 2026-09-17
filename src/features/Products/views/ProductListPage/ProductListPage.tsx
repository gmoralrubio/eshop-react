import { useAuth } from '@features/Auth/hooks/useAuth'
import { ProductCreateForm } from '@features/Products/components/ProductCreateForm'
import { ProductDeleteForm } from '@features/Products/components/ProductDeleteForm'
import { ProductEditForm } from '@features/Products/components/ProductEditForm'
import { useProducts } from '@features/Products/hooks/useProducts'
import type {
  Product,
  ProductCreateDTO,
} from '@features/Products/types/product.types'
import { formatDate, toEuro } from '@features/Products/utils/product.utils'
import { Badge } from '@shared/components/Badge'
import { Dialog } from '@shared/components/Dialog'
import { useToast } from '@shared/hooks/useToast'
import { useRef, useState, useEffect } from 'react'
import { useLoaderData } from 'react-router'

interface LoaderProducts {
  products: Product[]
}

const ProductListPage: React.FC = () => {
  const { products } = useLoaderData<LoaderProducts>()
  const { user } = useAuth()
  const { addProduct, deleteProduct, updateProduct, isMutating, error } =
    useProducts()
  const { showError } = useToast()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [action, setAction] = useState<string>()

  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error, showError])

  const userProducts = products.filter(
    (product) => product.userId === Number(user?.id)
  )

  const handleShowDialog = (
    event: React.MouseEvent<HTMLButtonElement>,
    product?: Product
  ) => {
    dialogRef.current?.showModal()
    if (product) setProduct(product)
    setAction(event.currentTarget.dataset.action)
  }

  const handleShowCreateDialog = () => {
    dialogRef.current?.showModal()
    setAction('create')
  }

  const handleCloseDialog = () => {
    dialogRef.current?.close()
  }

  const handleDelete = async (product: Product) => {
    await deleteProduct(product.id)
    dialogRef.current?.close()
  }

  const handleEdit = async (product: Product) => {
    await updateProduct(product)
    dialogRef.current?.close()
  }

  const handleCreate = async (product: ProductCreateDTO) => {
    await addProduct(product)
    dialogRef.current?.close()
  }

  return (
    <main className="overflow-x-auto p-4">
      <Dialog dialogRef={dialogRef}>
        {action === 'delete' && (
          <ProductDeleteForm
            product={product!}
            isMutating={isMutating}
            deleteProduct={handleDelete}
            closeDialog={handleCloseDialog}
          />
        )}
        {action === 'edit' && (
          <ProductEditForm
            product={product!}
            isMutating={isMutating}
            editProduct={handleEdit}
            closeDialog={handleCloseDialog}
          />
        )}
        {action === 'create' && (
          <ProductCreateForm
            onSubmit={handleCreate}
            isMutating={isMutating}
            closeDialog={handleCloseDialog}
          />
        )}
      </Dialog>
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={handleShowCreateDialog}
      >
        New Product
      </button>
      <table className="table-zebra table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Tags</th>
            <th>On sale</th>
            <th>Image</th>
            <th>Updated at</th>
            <th className="w-0"></th>
          </tr>
        </thead>
        <tbody>
          {userProducts.map((product) => (
            <tr key={product.id}>
              <td className="font-semibold">{product.name}</td>
              <td>{toEuro(product.price)}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      style="soft"
                      color="accent"
                      size="sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td>
                {product.isOnSale ? (
                  <Badge
                    style="soft"
                    color="success"
                    size="sm"
                  >
                    On sale
                  </Badge>
                ) : (
                  <Badge
                    style="soft"
                    color="ghost"
                    size="sm"
                  >
                    No
                  </Badge>
                )}
              </td>
              <td>
                <img
                  src={
                    product.image ||
                    'https://placehold.co/600x600?text=Image+not+provided'
                  }
                  alt={product.name}
                  className="h-10 w-10 rounded object-cover"
                />
              </td>
              <td className="text-nowrap">{formatDate(product.updatedAt)}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline btn-info btn-sm"
                    data-action="edit"
                    onClick={(event) => handleShowDialog(event, product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-error btn-sm"
                    data-action="delete"
                    onClick={(event) => handleShowDialog(event, product)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
export default ProductListPage
