'use client';
import { useState, useEffect } from 'react';
import { userApi } from '@/lib/api';
import { UsersIcon, UserGroupIcon, UserMinusIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const users = await userApi.getAll();
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          inactiveUsers: users.filter(u => !u.isActive).length
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-50">
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Usuarios"
          value={stats.totalUsers}
          icon={UsersIcon}
          color="bg-gradient-to-r from-purple-400 to-pink-400"
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.activeUsers}
          icon={UserGroupIcon}
          color="bg-gradient-to-r from-green-400 to-emerald-400"
        />
        <StatCard
          title="Usuarios Inactivos"
          value={stats.inactiveUsers}
          icon={UserMinusIcon}
          color="bg-gradient-to-r from-rose-400 to-red-400"
        />
      </div>

      <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-50">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Información General
        </h2>
        <p className="text-gray-600">
          Bienvenido al panel de control. Aquí podrás gestionar todos los usuarios del sistema.
          Utiliza el menú lateral para navegar entre las diferentes secciones.
        </p>
      </div>
    </div>
  );
}