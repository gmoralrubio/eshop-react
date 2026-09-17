import { ProductCardSkeleton } from '@features/Products/components/ProductCardSkeleton'

export const AppLoadingPage: React.FC = () => {
  const loadingElements = Array.from({ length: 20 }, (_, i) => (
    <ProductCardSkeleton key={i} />
  ))
  return (
    <main className="grid grid-cols-1 gap-12 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {loadingElements.map((el) => el)}
    </main>
  )
}
