import { createContext, useContext, useState } from 'react';

type Modo = 'aluno' | 'professor';

interface ModoContextType {
  modo: Modo;
  trocarModo: (novo: Modo) => void;
}

const ModoContext = createContext<ModoContextType | undefined>(undefined);

export const ModoProvider = ({ children }: { children: React.ReactNode }) => {
  const [modo, setModo] = useState<Modo>('aluno');
  const trocarModo = (novo: Modo) => setModo(novo);

  return (
    <ModoContext.Provider value={{ modo, trocarModo }}>
      {children}
    </ModoContext.Provider>
  );
};

export const useModo = () => {
  const context = useContext(ModoContext);
  if (!context) throw new Error('useModo precisa estar dentro de ModoProvider');
  return context;
};
