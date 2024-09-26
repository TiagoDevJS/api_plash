import http from 'http';
import express,{NextFunction, Request, Response} from 'express';
import {Server} from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './Frameworks/routes'
import dotenv from 'dotenv';
import 'reflect-metadata';
import './adapters/container'
import { errorHandler } from './handleError/index';
import path from 'path';
import upload  from './utils/upload'


dotenv.config();

const app = express();
const server = http.createServer(app);
export const io =  new Server(server,{
  cors:{
   origin:["http://localhost:3000","http://localhost:3001","http://77.37.69.19:3000"],
   methods:["GET","POST"]
  }
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Adicionando as rotas definidas em routes/index.js

app.use('/tmp', express.static(upload.tmpFolder));
app.use(routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error caught in test middleware:', err);
  next(err); // Passe o erro para o middleware de tratamento de erros
});


// Middleware para servir arquivos estáticos

// Adicione o middleware de erro após todos os outros middlewares
app.use(errorHandler)

// Configurando o servidor para escutar na porta 443
const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`Servidor HTTP está rodando na porta ${PORT}`);
});
