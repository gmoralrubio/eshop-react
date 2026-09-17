import { createBrowserRouter } from 'react-router'
import AppLayout from '@features/App/AppLayout'
import { ProductListLoadingPage } from '@features/Products/views/ProductListPage/ProductListLoadingPage'
import { loadProductDetail, loadProducts } from '@features/App/router/loaders'
import ProductDetailPage from '@features/Products/views/ProductDetailPage/ProductDetailPage'
import ProductListPage from '@features/Products/views/ProductListPage/ProductListPage'
import { ProductDetailLoadingPage } from '@features/Products/views/ProductDetailPage/ProductDetailLoadingPage'
import { LoginPage } from '@features/Auth/views/LoginPage'
import { RegisterPage } from '@features/Auth/views/RegisterPage'
import { ProtectedRoute } from '@features/App/router/components/ProtectedRoute'
import App from '@features/App/views/App'
import { AppLoadingPage } from '@features/App/views/AppLoadingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        loader: loadProducts,
        HydrateFallback: AppLoadingPage,
        errorElement: <p>Error al cargar los productos</p>,
        element: <App />,
      },
      {
        path: '/:productId',
        loader: loadProductDetail,
        HydrateFallback: ProductDetailLoadingPage,
        element: <ProductDetailPage />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            loader: loadProducts,
            HydrateFallback: ProductListLoadingPage,
            errorElement: <p>Error al cargar los productos</p>,
            element: (
              <ProtectedRoute>
                <ProductListPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'auth',
        children: [
          { path: 'login', Component: LoginPage },
          { path: 'register', Component: RegisterPage },
        ],
      },
    ],
  },
])
