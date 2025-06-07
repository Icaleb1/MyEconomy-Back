import { Router } from 'express';
import { cadastroController, perfilController } from '../controllers/UsuarioController';
import { validarCadastro } from '../middlewares/ValidaCadastro';
import { validarLogin } from '../middlewares/ValidaLogin';
import { loginController } from '../controllers/LoginController';
import { limiteController } from '../controllers/LimiteController';
import { authenticateToken } from '../middlewares/AuthenticateToken';
import { validarLimite } from '../middlewares/ValidaLimite';

const router: Router = Router(); 

router.post('/cadastro', validarCadastro, cadastroController);

router.post('/login', validarLogin, loginController);

router.get('/perfil/:id', authenticateToken, perfilController)

router.post('/criar-limite', authenticateToken, validarLimite, limiteController);

export default router;