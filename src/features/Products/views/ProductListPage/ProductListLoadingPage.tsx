const SkeletonRow: React.FC<{ index: number }> = ({ index }) => (
  <tr key={index}>
    <td>
      <div className="skeleton h-5 w-32"></div>
    </td>
    <td>
      <div className="skeleton h-5 w-16"></div>
    </td>
    <td>
      <div className="flex gap-1">
        <div className="skeleton h-5 w-14"></div>
        <div className="skeleton h-5 w-14"></div>
      </div>
    </td>
    <td>
      <div className="skeleton h-5 w-24"></div>
    </td>
    <td>
      <div className="flex gap-2">
        <div className="skeleton h-8 w-16"></div>
        <div className="skeleton h-8 w-20"></div>
      </div>
    </td>
  </tr>
)

export const ProductListLoadingPage: React.FC = () => {
  const loadingElements = Array.from({ length: 20 }, (_, i) => (
    <SkeletonRow
      key={i}
      index={i}
    />
  ))
  return (
    <main className="overflow-x-auto p-4">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Tags</th>
            <th>Actualizado</th>
            <th className="w-0"></th>
          </tr>
        </thead>
        <tbody>{loadingElements}</tbody>
      </table>
    </main>
  )
}
