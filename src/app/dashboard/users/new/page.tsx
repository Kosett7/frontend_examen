'use client';
import { useRouter } from 'next/navigation';
import { UserForm } from '@/components/forms/UserForm';
import { userApi } from '@/lib/api';
import type { User } from '@/types';

export default function NewUserPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<User>) => {
    try {
      await userApi.create(data);
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Crear Nuevo Usuario
      </h1>
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-purple-50 p-6">
        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}