// src/controllers/matricula.controller.ts

/**
 * Controller que implementa o fluxo de matrícula conforme diagrama:
 * 
 * # MatriculaController
 * + solicita:DisciplinasDisponíveis()
 *   + seleciona:Disciplinas()
 *   + confirma:Matricula()
 */
export class MatriculaController {
  private matriculaService = new MatriculaService();

  // Corresponde a solicita:DisciplinasDisponíveis() no diagrama
  async solicitarDisciplinasDisponiveis(req: Request, res: Response) {
    try {
      const disciplinas = await this.matriculaService.getDisciplinasDisponiveis(req.user.id);
      res.json(disciplinas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Corresponde a seleciona:Disciplinas() no diagrama
  async selecionarDisciplinas(req: Request, res: Response) {
    try {
      const { disciplinas } = req.body;
      const result = await this.matriculaService.verificarDisciplinas(req.user.id, disciplinas);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Corresponde a confirma:Matricula() no diagrama
  async confirmarMatricula(req: Request, res: Response) {
    try {
      const { disciplinas } = req.body;
      const matriculas = await this.matriculaService.registrarMatriculas(req.user.id, disciplinas);
      res.json({ success: true, matriculas });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}