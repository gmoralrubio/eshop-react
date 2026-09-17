import type { Product, Tag } from '@features/Products/types/product.types'
import { useState } from 'react'

interface Props {
  product: Product
  isMutating: boolean
  editProduct: (product: Product) => void
  closeDialog: () => void
}

export const ProductEditForm: React.FC<Props> = ({
  product,
  isMutating,
  editProduct,
  closeDialog,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setUpdatedProduct((prev) => {
      if (type === 'checkbox') return { ...prev, [name]: checked }
      if (name === 'price') return { ...prev, price: Number(value) }
      return { ...prev, [name]: value }
    })
  }

  const handleTagToggle = (tag: Tag) => {
    setUpdatedProduct((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
      return { ...prev, tags: tags as Product['tags'] }
    })
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    editProduct({
      ...updatedProduct,
      image: updatedProduct.image || null,
    })
  }

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset">
        <label
          htmlFor="product-name"
          className="label"
        >
          Product name
        </label>
        <input
          type="text"
          name="name"
          id="product-name"
          className="input w-full"
          placeholder="Product name"
          onChange={handleChange}
          value={updatedProduct.name}
          required
        />
      </fieldset>

      <div className="flex gap-4">
        <fieldset className="fieldset flex-1">
          <label
            htmlFor="product-price"
            className="label"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="product-price"
            step="0.01"
            className="input w-full"
            placeholder="Price"
            min="1"
            onChange={handleChange}
            value={updatedProduct.price}
            required
          />
        </fieldset>

        <fieldset className="fieldset flex-1">
          <label
            htmlFor="product-isOnSale"
            className="label cursor-pointer"
          >
            Is on sale
          </label>
          <input
            type="checkbox"
            name="isOnSale"
            id="product-isOnSale"
            className="toggle"
            checked={updatedProduct.isOnSale}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <fieldset className="fieldset">
        <label
          htmlFor="product-description"
          className="label"
        >
          Description
        </label>
        <textarea
          className="textarea h-24 w-full"
          placeholder="Description"
          id="product-description"
          name="description"
          required
          onChange={handleChange}
          value={updatedProduct.description}
        />
      </fieldset>

      <fieldset className="fieldset">
        <label
          htmlFor="product-image"
          className="label"
        >
          Image (optional)
        </label>

        <input
          type="text"
          name="image"
          id="product-image"
          placeholder="https://"
          className="input w-full"
          onChange={handleChange}
          value={updatedProduct.image ?? ''}
        />
      </fieldset>

      <fieldset className="fieldset">
        <label className="label">Tags</label>
        <div className="flex flex-wrap gap-1">
          {(['sport', 'home', 'tech'] as const).map((tag) => (
            <input
              key={tag}
              className="btn"
              type="checkbox"
              aria-label={tag}
              checked={updatedProduct.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
          ))}
          <input
            className="btn btn-square"
            type="button"
            value="×"
            onClick={() => setUpdatedProduct((prev) => ({ ...prev, tags: [] }))}
          />
        </div>
      </fieldset>

      <div className="mt-4 space-x-4">
        <button
          type="submit"
          className="btn btn-info"
          disabled={isMutating}
        >
          {isMutating ? 'Updating...' : 'Update'}
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
