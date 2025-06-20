import { Router } from 'express';
import { cadastroController, perfilController } from '../controllers/UsuarioController';
import { validarCadastro } from '../middlewares/ValidaCadastro';
import { validarLogin } from '../middlewares/ValidaLogin';
import { loginController } from '../controllers/LoginController';
import { buscarLimitePorMesController, limiteController } from '../controllers/LimiteController';
import { authenticateToken } from '../middlewares/AuthenticateToken';
import { validarLimite } from '../middlewares/ValidaLimite';
import { validarDespesa } from '../middlewares/ValidarDespesa';
import { buscarDespesasPorMesController, despesaController } from '../controllers/DespesaController';

const router: Router = Router(); 

router.post('/cadastro', validarCadastro, cadastroController);

router.post('/login', validarLogin, loginController);

router.get('/perfil', authenticateToken, perfilController);

router.post('/criar-limite', authenticateToken, validarLimite, limiteController);

router.get('/buscar-limite', authenticateToken, buscarLimitePorMesController);

router.post('/criar-despesa', authenticateToken, validarDespesa, despesaController)

router.get('/buscar-despesas', authenticateToken, buscarDespesasPorMesController)


export default router;