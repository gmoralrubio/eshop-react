import { useAuth } from '@features/Auth/hooks/useAuth'
import { Link, NavLink, useNavigate } from 'react-router'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-neutral w-full shadow-sm max-lg:collapse">
      <div className="navbar justify-between px-4">
        <h2 className="text-xl font-extrabold text-white">
          <NavLink to={'/'}>Another eShop Project</NavLink>
        </h2>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to={'auth/login'}
              className="btn btn-secondary"
            >
              Login
            </Link>
            <Link
              to={'auth/register'}
              className="btn btn-primary"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-white">
              Welcome {user?.username}
            </span>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
              <NavLink
                to="/products"
                className="btn btn-primary"
              >
                My products
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
