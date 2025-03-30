import { Router } from "express";
import { CreateAdmController } from "./Controllers/adm/CreateAdmController";
import { AuthAdmController } from "./Controllers/adm/AuthAdmController";
import { CreateMecanicoController } from "./Controllers/mecanico/CreateMecanicoController";
import { ListMecanicoController } from "./Controllers/mecanico/ListMecanicoController";
import { CreateClienteController } from "./Controllers/cliente/CreateClienteController";
import { ListClientController } from "./Controllers/cliente/ListClienteController";
import { CreateVeiculoController } from "./Controllers/veiculo/CreateVeiculoController";
import { ListVeiculosClienteController } from "./Controllers/veiculo/ListVeiculosClienteController";
import { DetailAdmController } from "./Controllers/adm/DetailAdmController";
import { EditMecanicoController } from "./Controllers/mecanico/EditMecanicoController";
import { isAuthenticated } from "./Middleware/isAuthenticated";
import { SeeMecanicoController } from "./Controllers/mecanico/SeeMecanicoController";
import { DeleteMecanicoController } from "./Controllers/mecanico/DeleteMecanicoController";
import { EditClienteController } from "./Controllers/cliente/EditClienteController";
import { SeeClienteController } from "./Controllers/cliente/SeeClienteController";
import { DeleteVeiculoController } from "./Controllers/veiculo/DeleteVeiculoController";
import { SeeAllChecklistController } from "./Controllers/Checklist/SeeAllChecklistController";
import { AlterStatusController } from "./Controllers/Checklist/AlterStatusController";


const router = Router();

// Administração (adm)
router.post('/adm', new CreateAdmController().handle); // Criação de um administrador
router.post('/adm/login', new AuthAdmController().handle); // Login de administrador
router.get("/adm/me",isAuthenticated, new DetailAdmController().handle);//detalhes do adm


// Mecânico
router.post('/mecanicos',  new CreateMecanicoController().handle); // Criação de um mecânico
router.get('/mecanicos', new ListMecanicoController().handle); // Listar mecânicos
router.get('/mecanicos/:id', new SeeMecanicoController().handle)
router.put('/mecanicos/:id', isAuthenticated, new EditMecanicoController().handle)
router.delete("/mecanicos/:id", isAuthenticated,new DeleteMecanicoController().handle)

// Cliente
router.post('/clientes', new CreateClienteController().handle); // Criação de cliente
router.get('/clientes',new ListClientController().handle); // Listar clientes
router.get('/clientes/:id',new SeeClienteController().handle)//dados de um cliente especifico
router.put('/clientes/:id', new EditClienteController().handle)//alteração de dados de um cliente

// Veículo
router.post('/clientes/:id/veiculos', new CreateVeiculoController().handle); // Criação de veículo para um cliente específico
router.get('/clientes/:id/veiculos', new ListVeiculosClienteController().handle); // Listar veículos para um cliente específico
router.delete('/clientes/:id_cliente/veiculos/:id_veiculo', new DeleteVeiculoController().handle)// validar se e necessarion a exclusao



//checklist
router.get('/checklist', new SeeAllChecklistController().handle)
router.put('/checklist/status/:id_checklist', new AlterStatusController().handle)//alterar status do checklist



export { router };
