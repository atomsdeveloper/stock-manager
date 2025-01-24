import { useState, useEffect } from 'react';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Adiciona o event listener
    window.addEventListener('resize', handleResize);

    // Chama a função uma vez para definir o estado inicial
    handleResize();

    // Remove o event listener na desmontagem do componente
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
