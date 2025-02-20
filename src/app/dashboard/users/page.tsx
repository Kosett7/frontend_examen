'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { userApi } from '@/lib/api';
import type { User } from '@/types';
import { Column, Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getAll();
      setUsers(data);
    } catch (error) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userApi.delete(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        setError('Error al eliminar usuario');
      }
    }
  };

  const columns: Column<User>[] = [
    { header: 'Usuario', accessor: 'username' as keyof User },
    { header: 'Email', accessor: 'email' as keyof User },
    {
      header: 'Estado',
      accessor: (user: User) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
          ${user.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'}`}
        >
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      header: 'Acciones',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <Button variant="secondary" className="flex items-center space-x-1">
              <PencilIcon className="h-4 w-4" />
              <span>Editar</span>
            </Button>
          </Link>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(user.id)}
            className="flex items-center space-x-1"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Eliminar</span>
          </Button>
        </div>
      )
    }
  ];

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Gestión de Usuarios
        </h1>
        <Link href="/dashboard/users/new">
          <Button variant="primary">Nuevo Usuario</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-purple-50 overflow-hidden">
        <Table columns={columns} data={users} />
      </div>
    </div>
  );
}
