const formatCurrency = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
})

export const toEuro = (num: number): string => {
	return formatCurrency.format(num)
}
export const formatDate = (date: Date) => {
	return date.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
}

export function buildFilterQuery(params: URLSearchParams): string {
	const query = new URLSearchParams()

	const name = params.get('name')
	if (name) query.set('name_like', name)

	const priceMin = params.get('priceMin')
	if (priceMin) query.set('price_gte', priceMin)

	const priceMax = params.get('priceMax')
	if (priceMax) query.set('price_lte', priceMax)

	const tags = params.get('tags')
	tags?.split(',').forEach((tag) => query.append('tags_like', tag))

	query.set('_expand', 'user')
	return query.toString()
}
