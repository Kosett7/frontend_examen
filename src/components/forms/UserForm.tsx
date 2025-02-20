'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Partial<User>) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: initialData?.username || '',
      email: initialData?.email || '',
      password: '',
      isActive: initialData?.isActive ?? true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            {...register('username', { 
              required: 'El usuario es requerido',
              minLength: {
                value: 3,
                message: 'El usuario debe tener al menos 3 caracteres'
              }
            })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:border-purple-200 focus:ring-2 focus:ring-purple-100 outline-none transition-colors"
            disabled={isLoading}
            placeholder="Ingrese el nombre de usuario"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-rose-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register('email', { 
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:border-purple-200 focus:ring-2 focus:ring-purple-100 outline-none transition-colors"
            disabled={isLoading}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
            {initialData && <span className="text-gray-500 text-xs ml-2">(Dejar en blanco para mantener la actual)</span>}
          </label>
          <input
            {...register('password', {
              ...(initialData ? {} : { required: 'La contraseña es requerida' }),
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:border-purple-200 focus:ring-2 focus:ring-purple-100 outline-none transition-colors"
            disabled={isLoading}
            placeholder="Ingrese la contraseña"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-rose-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            {...register('isActive')}
            type="checkbox"
            className="h-4 w-4 text-purple-300 focus:ring-purple-200 border-purple-100 rounded transition-colors"
            disabled={isLoading}
          />
          <label className="text-sm text-gray-700">
            Usuario activo
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-purple-50">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar Usuario'}
        </Button>
      </div>
    </form>
  );
}