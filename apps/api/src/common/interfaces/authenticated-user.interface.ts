export interface AuthenticatedUser {
  id: string;
  cui: string;
  nombres: string;
  email: string;
  rol: {
    id: string;
    nombre: string;
    descripcion: string | null;
  };
}