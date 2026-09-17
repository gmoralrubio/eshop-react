//Normaliza cualquier valor de error en un AppError estructurado.
export function parseError(
	error: unknown,
	fallback?: string
): { message: string } {
	if (error instanceof Error) {
		return { message: error.message }
	}
	if (typeof error === 'string') {
		return { message: error }
	}
	if (fallback !== undefined) {
		return { message: fallback }
	}
	return { message: 'Unknown error' }
}

// Parsea una response fallida para extraer el mensaje de error del servidor.
// Si el body no se puede parsear o no hay mensaje usa el fallback
export async function parseErrorResponse(
	response: Response,
	fallback: string
): Promise<never> {
	let serverMessage: string | null = null
	try {
		const body = await response.json()
		serverMessage = body.message || null
	} catch {}
	throw new Error(serverMessage || fallback)
}
