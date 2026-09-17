import type { Product } from '@features/Products/types/product.types'
import { toEuro } from '@features/Products/utils/product.utils'
import { Badge } from '@shared/components/Badge'
import { Link } from 'react-router'

interface Props {
  product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="relative">
        <span>
          {product.isOnSale && (
            <Badge
              color="secondary"
              className="absolute top-4 right-4 font-bold"
            >
              Oferta
            </Badge>
          )}
        </span>
        <img
          className="aspect-square object-cover"
          src={
            product.image ||
            'https://placehold.co/600x600?text=Image+not+provided'
          }
          alt={product.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-2xl">{toEuro(product.price)}</p>
        <p>{product.description}</p>
        <div className="card-actions items-center justify-between">
          <Link to={`${product.id}`}>
            <button
              type="button"
              className="btn btn-primary"
            >
              Ver producto
            </button>
          </Link>
          <div className="space-x-2">
            {product.tags?.map((tag) => (
              <Badge
                key={tag}
                style="soft"
                color="accent"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
