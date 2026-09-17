import { Footer } from '@shared/components/Footer'
import { Header } from '@shared/components/Header'
import { Toast } from '@shared/components/Toast'
import { Outlet } from 'react-router'

const AppLayout: React.FC = () => {
  return (
    <div className="font-primary container mx-auto flex min-h-screen max-w-7xl flex-col">
      <Header />
      <div className="flex-1">
        <Toast />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
