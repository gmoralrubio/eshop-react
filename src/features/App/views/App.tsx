import '@fontsource-variable/geist/wght.css'
import { ProductCard } from '@features/Products/components/ProductCard'
import { ProductFiltersForm } from '@features/Products/components/ProductFiltersForm'
import type { Product } from '@features/Products/types/product.types'
import { useLoaderData } from 'react-router'

interface LoaderProducts {
  products: Product[]
}

const ProductListPage: React.FC = () => {
  const { products } = useLoaderData<LoaderProducts>()

  return (
    <>
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full">
          <ProductFiltersForm />
        </div>
        {products.length === 0 ? (
          <p className="col-span-full text-center text-base-content/60 py-8">
            No products match your filters
          </p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </main>
    </>
  )
}
export default ProductListPage
