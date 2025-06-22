// src/types/index.ts

/**
 * Representa o DTO de Disciplina conforme diagrama:
 * 
 * # DisciplinaDTO
 * - codigo: String (corresponde a 'multicula' no diagrama original)
 * - nome: String
 * - curso: String
 */
export interface DisciplinaDTO {
  codigo: string;  // multicula no diagrama original
  nome: string;
  curso: string;
  vagas: number;
  periodoRecomendado: number;
}

// Mapeamento de Entidade para DTO no serviço
private toDisciplinaDTO(disciplina: Disciplina): DisciplinaDTO {
  return {
    codigo: disciplina.codigo,
    nome: disciplina.nome,
    curso: disciplina.curso,
    vagas: disciplina.vagas,
    periodoRecomendado: disciplina.periodo_recomendado
  };
}