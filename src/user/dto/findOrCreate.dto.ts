export class FindOrCreateUserDto {
    email: string;
    name?: string;  // Opcional, ya que puede que no siempre quieras proporcionar un nombre al buscar o crear
    rol?: 'admin' | 'client';  // Opcional, ya que el rol tiene un valor predeterminado
}