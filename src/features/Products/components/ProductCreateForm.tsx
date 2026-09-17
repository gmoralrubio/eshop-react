import type {
  ProductCreateDTO,
  Tag,
} from '@features/Products/types/product.types'
import { useState } from 'react'

interface Props {
  isMutating: boolean
  onSubmit: (product: ProductCreateDTO) => Promise<void>
  closeDialog: () => void
}

interface CreateFormState {
  name: string
  description: string
  price: number
  image: string
  isOnSale: boolean
  tags: Tag[]
}

const DEFAULT_STATE: CreateFormState = {
  name: '',
  description: '',
  price: 0,
  image: '',
  isOnSale: false,
  tags: [],
}

export const ProductCreateForm: React.FC<Props> = ({
  onSubmit,
  isMutating,
  closeDialog,
}) => {
  const [localState, setLocalState] = useState<CreateFormState>(DEFAULT_STATE)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setLocalState((prev) => {
      if (type === 'checkbox') return { ...prev, [name]: checked }
      if (name === 'price') return { ...prev, price: Number(value) }
      return { ...prev, [name]: value }
    })
  }

  const handleTagToggle = (tag: Tag) => {
    setLocalState((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
      return { ...prev, tags }
    })
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit({
      ...localState,
      image: localState.image || null,
    })
    closeDialog()
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
          value={localState.name}
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
            value={localState.price}
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
            checked={localState.isOnSale}
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
          value={localState.description}
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
          value={localState.image ?? ''}
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
              checked={localState.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
          ))}
          <input
            className="btn btn-square"
            type="button"
            value="×"
            onClick={() => setLocalState((prev) => ({ ...prev, tags: [] }))}
          />
        </div>
      </fieldset>

      <div className="mt-4 space-x-4">
        <button
          type="submit"
          className="btn btn-info"
          disabled={isMutating}
        >
          {isMutating ? 'Creating...' : 'Create'}
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
