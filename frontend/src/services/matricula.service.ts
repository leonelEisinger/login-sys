// src/services/matricula.service.ts

/**
 * Implementa a lógica de negócio conforme diagrama:
 * 
 * # MatriculaService
 * - matriculaRepository: MatriculaRepository
 * + verifica:PeriodoMatricula(): boolean
 * + verifica:PreRequisitos(): boolean
 * + registra:Matricula(): boolean
 */
export class MatriculaService {
  // matriculaRepository: MatriculaRepository (via db.Matricula do Sequelize)
  
  // Implementa verifica:PeriodoMatricula()
  private async verificarPeriodoMatricula(): Promise<boolean> {
    const periodoAtivo = await db.PeriodoMatricula.findOne({ 
      where: { ativo: true } 
    });
    return !!periodoAtivo;
  }

  // Implementa verifica:PreRequisitos()
  private async verificarPreRequisitos(alunoId: number, disciplina: Disciplina) {
    // ... implementação ...
  }

  // Implementa registra:Matricula()
  async registrarMatriculas(alunoId: number, disciplinasCodigos: string[]) {
    // ... implementação ...
  }
}