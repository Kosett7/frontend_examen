'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Usuarios', href: '/dashboard/users', icon: UsersIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm shadow-lg border-r border-purple-50 fixed left-0 top-16">
      <div className="h-full px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 text-base font-medium rounded-xl transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}