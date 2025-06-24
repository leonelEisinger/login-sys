import { createContext, useContext, useState } from 'react';

type Modo = 'aluno' | 'professor';

interface ModoContextType {
  modo: Modo;
  trocarModo: (novo: Modo) => void;
}

const ModoContext = createContext<ModoContextType | undefined>(undefined);

export const ModoProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado que armazena o modo atual (inicia como 'aluno')
  const [modo, setModo] = useState<Modo>('aluno');
  
  // Função para atualizar o modo
  const trocarModo = (novo: Modo) => setModo(novo);

  return (
    // Provedor do contexto que disponibiliza o valor para os componentes filhos
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