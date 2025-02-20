'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserForm } from '@/components/forms/UserForm';
import { userApi } from '@/lib/api';
import type { User } from '@/types';

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await userApi.getOne(parseInt(params.id));
        setUser(data);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        setError('Error al cargar el usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (data: Partial<User>) => {
    try {
      setIsSaving(true);
      setError('');
      // Si la contraseña está vacía, la eliminamos para no actualizarla
      if (!data.password) {
        delete data.password;
      }
      await userApi.update(parseInt(params.id), data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setError('Error al actualizar el usuario');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Editar Usuario
        </h1>
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl">
          <strong className="font-medium">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Editar Usuario
        </h1>
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl">
          <strong className="font-medium">Atención: </strong>
          <span>Usuario no encontrado</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Editar Usuario
      </h1>
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-purple-50 p-6">
        <UserForm 
          initialData={user} 
          onSubmit={handleSubmit} 
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}