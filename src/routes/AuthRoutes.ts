import { Router } from 'express';
import { cadastroController } from '../controllers/CadastroController';
import { validarCadastro } from '../middlewares/ValidaCadastro';
import { validarLogin } from '../middlewares/ValidaLogin';
import { loginController } from '../controllers/LoginController';

const router: Router = Router(); 

router.post('/cadastro', validarCadastro, cadastroController);

router.post('/login', validarLogin, loginController);

export default router;