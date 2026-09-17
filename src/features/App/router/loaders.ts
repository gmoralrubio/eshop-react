import { productRepository } from '@features/Products/services/productRepository'
import { buildFilterQuery } from '@features/Products/utils/product.utils'
import type { LoaderFunctionArgs } from 'react-router'

export const loadProducts = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const query = buildFilterQuery(url.searchParams)
	const products = await productRepository.getAllProducts(query)
	return { products }
}

export const loadProductDetail = async ({ params }: LoaderFunctionArgs) => {
	const productId = params.productId
	if (!productId) {
		return { product: null, error: 'Product ID is required' }
	}

	try {
		const product = await productRepository.getProductById(productId)
		return { product, error: null }
	} catch (e: unknown) {
		const message =
			e instanceof Error ? e.message : 'Failed to load product'
		return { product: null, error: message }
	}
}
