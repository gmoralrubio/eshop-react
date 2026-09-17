import { ProductCardSkeleton } from '@features/Products/components/ProductCardSkeleton'

export const ProductDetailLoadingPage: React.FC = () => {
  return (
    <main className="py-6">
      <ProductCardSkeleton />
    </main>
  )
}
