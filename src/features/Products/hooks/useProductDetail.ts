import type { Product } from '@features/Products/types/product.types'
import { useLoaderData } from 'react-router'

export interface ProductDetailData {
	product: Product | null
	error: string | null
}

// Envuelve useLoaderData con acceso tipado a { product, error }.
export function useProductDetail(): ProductDetailData {
	return useLoaderData<ProductDetailData>()
}
