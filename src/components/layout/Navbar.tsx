'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md border-b border-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Panel de Control
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-rose-200 to-pink-200 text-gray-700 px-4 py-2 rounded-lg hover:from-rose-300 hover:to-pink-300 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}