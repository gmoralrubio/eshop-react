import { mapProduct } from '@features/Products/services/productMapper'
import type {
	Product,
	ProductCreateDTO,
	ProductResponseDTO,
	ProductUpdateDTO,
} from '@features/Products/types/product.types'
import { parseErrorResponse } from '@shared/utils/error.utils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_BASE_URL}/products`

export const productRepository = {
	getAllProducts: async (query?: string): Promise<Product[]> => {
		const response = await fetch(
			query ? `${API_URL}?${query}` : `${API_URL}?_expand=user`
		)
		if (!response.ok) {
			await parseErrorResponse(response, `HTTP ${response.status}`)
		}

		const data = await response.json()
		return data.map(mapProduct)
	},

	getProductById: async (id: string): Promise<Product> => {
		const response = await fetch(`${API_URL}/${id}?_expand=user`)
		if (!response.ok) {
			await parseErrorResponse(response, `HTTP ${response.status}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	addProduct: async (
		product: ProductCreateDTO,
		token: string
	): Promise<Product> => {
		const response = await fetch(`${API_URL}?_expand=user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(product),
		})
		if (!response.ok) {
			await parseErrorResponse(response, `HTTP ${response.status}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	updateProduct: async (
		id: string,
		product: ProductUpdateDTO,
		token: string
	): Promise<Product> => {
		const response = await fetch(`${API_URL}/${id}?_expand=user`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(product),
		})
		if (!response.ok) {
			await parseErrorResponse(response, `HTTP ${response.status}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	deleteProduct: async (id: string, token: string): Promise<void> => {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		if (!response.ok) {
			await parseErrorResponse(response, `HTTP ${response.status}`)
		}
	},
}
