import { Router } from "express";
import { CreateAdmController } from "./Controllers/adm/CreateAdmController";
import { AuthAdmController } from "./Controllers/adm/AuthAdmController";
import { CreateMecanicoController } from "./Controllers/mecanico/CreateMecanicoController";
import { ListMecanicoController } from "./Controllers/mecanico/ListMecanicoController";
import { CreateClienteController } from "./Controllers/cliente/CreateClienteController";
import { ListClientController } from "./Controllers/cliente/ListClienteController";
import { CreateVeiculoController } from "./Controllers/veiculo/CreateVeiculoController";
import { ListVeiculosClienteController } from "./Controllers/veiculo/ListVeiculosClienteController";


const router = Router();

// Administração (adm)
router.post('/adm', new CreateAdmController().handle); // Criação de um administrador
router.post('/adm/login', new AuthAdmController().handle); // Login de administrador

// Mecânico
router.post('/mecanicos', new CreateMecanicoController().handle); // Criação de um mecânico
router.get('/mecanicos', new ListMecanicoController().handle); // Listar mecânicos

// Cliente
router.post('/clientes', new CreateClienteController().handle); // Criação de cliente
router.get('/clientes', new ListClientController().handle); // Listar clientes

// Veículo
router.post('/clientes/:id/veiculos', new CreateVeiculoController().handle); // Criação de veículo para um cliente específico
router.get('/clientes/:id/veiculos', new ListVeiculosClienteController().handle); // Listar veículos para um cliente específico
export { router };
