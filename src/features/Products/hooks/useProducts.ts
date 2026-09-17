import { productRepository } from '@features/Products/services/productRepository'
import type {
	Product,
	ProductCreateDTO,
} from '@features/Products/types/product.types'
import { useState } from 'react'
import { useRevalidator } from 'react-router'

export interface UseProducts {
	isMutating: boolean
	error: string | null
	addProduct: (product: ProductCreateDTO) => Promise<void>
	updateProduct: (product: Product) => Promise<void>
	deleteProduct: (id: string) => Promise<void>
}

export const useProducts = (): UseProducts => {
	const [isMutating, setIsMutating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const revalidator = useRevalidator()

	const token = localStorage.getItem('accessToken')
	if (!token) {
		return {
			isMutating: false,
			error: null,
			addProduct: async () => {},
			updateProduct: async () => {},
			deleteProduct: async () => {},
		}
	}

	const addProduct = async (product: ProductCreateDTO): Promise<void> => {
		try {
			setError(null)
			setIsMutating(true)
			await productRepository.addProduct(product, token)
			revalidator.revalidate()
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : String(e))
		}
		setIsMutating(false)
	}

	const updateProduct = async (product: Product): Promise<void> => {
		try {
			setError(null)
			setIsMutating(true)
			await productRepository.updateProduct(product.id, product, token)
			revalidator.revalidate()
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : String(e))
		}
		setIsMutating(false)
	}

	const deleteProduct = async (id: string) => {
		try {
			setError(null)
			setIsMutating(true)
			await productRepository.deleteProduct(id, token)
			revalidator.revalidate()
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : String(e))
		}
		setIsMutating(false)
	}

	return {
		isMutating,
		error,
		addProduct,
		updateProduct,
		deleteProduct,
	}
}
