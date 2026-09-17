import { ALL_TAGS, type Tag } from '@features/Products/types/product.types'
import { useSearchParams } from 'react-router'

export const ProductFiltersForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name') ?? ''
  const priceMin = searchParams.get('priceMin') ?? ''
  const priceMax = searchParams.get('priceMax') ?? ''
  const tagsParam = searchParams.get('tags') ?? ''
  const selectedTags: Tag[] = tagsParam
    ? tagsParam
        .split(',')
        .filter((tag): tag is Tag =>
          (ALL_TAGS as readonly string[]).includes(tag)
        )
    : []

  const setParam = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set(key, value)
        } else {
          prev.delete(key)
        }
        return prev
      },
      { replace: true }
    )
  }

  const handleTagToggle = (tag: Tag) => {
    setSearchParams(
      (prev) => {
        const updated = selectedTags.includes(tag)
          ? selectedTags.filter((t) => t !== tag)
          : [...selectedTags, tag]
        if (updated.length > 0) {
          prev.set('tags', updated.join(','))
        } else {
          prev.delete('tags')
        }
        return prev
      },
      { replace: true }
    )
  }

  const handleClear = () => {
    setSearchParams({}, { replace: true })
  }

  const hasFilters = [...searchParams].length > 0

  return (
    <form
      className="rounded-box bg-base-200 mb-6 p-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-wrap items-end gap-4">
        <fieldset className="fieldset">
          <label
            htmlFor="filter-name"
            className="label"
          >
            Name
          </label>
          <input
            type="text"
            id="filter-name"
            className="input input-bordered w-full"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setParam('name', e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="filter-priceMin"
            className="label"
          >
            Min price
          </label>
          <input
            type="number"
            id="filter-priceMin"
            className="input input-bordered w-full"
            placeholder="0"
            min="0"
            value={priceMin}
            onChange={(e) => setParam('priceMin', e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="filter-priceMax"
            className="label"
          >
            Max price
          </label>
          <input
            type="number"
            id="filter-priceMax"
            className="input input-bordered w-full"
            placeholder="9999"
            min="0"
            value={priceMax}
            onChange={(e) => setParam('priceMax', e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Tags</label>
          <div className="flex gap-1">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`btn ${selectedTags.includes(tag) ? 'btn-accent' : 'btn-outline'}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>

        {hasFilters && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleClear}
          >
            Clear filters
          </button>
        )}
      </div>
    </form>
  )
}
