  export const getStatusDescription = (status?: string) => {
    const descriptions: Record<string, string> = {
       pending: 'Pendiente',
       expired: 'Expirado',
       paid: 'Pagado',
       cancelled: 'Cancelado',
       review_pending: 'Revisión pendiente' // Nuevo estado
      }
    return descriptions[ status ?? 'pending'] || 'Estado desconocido';
  }