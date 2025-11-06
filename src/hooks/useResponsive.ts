import { useMediaQuery } from '@mui/material';

/**
 * Hook refinado para detectar el tamaño de pantalla.
 */
const useResponsive = () => {

  const isMobile = useMediaQuery('(max-width:599px)');        // Teléfonos
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:1023px)'); // Tablets pequeñas a medianas
  const isDesktop = useMediaQuery('(min-width:1024px)');      // Desktop y laptops

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResponsive;
