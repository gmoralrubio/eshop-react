export const ALL_TAGS = ['sport', 'home', 'tech'] as const
export type Tag = typeof ALL_TAGS[number]

// Dominio
export interface Product {
	id: string
	name: string
	description: string
	price: number
	image?: string | null
	isOnSale: boolean
	userId: number
	username: string
	tags: Tag[]
	updatedAt: Date
}

// Se envía a API en creación producto
export interface ProductCreateDTO {
	name: string
	description: string
	price: number
	image?: string | null
	isOnSale: boolean
	tags: string[]
}

// Respuesta API
export interface ProductResponseDTO {
	id: string
	name: string
	description: string
	price: number
	image?: string | null
	isOnSale: boolean
	userId: number
	user: { id: number; password: string; username: string }
	tags: string[]
	updatedAt: string
}

export type ProductUpdateDTO = Partial<ProductCreateDTO>
