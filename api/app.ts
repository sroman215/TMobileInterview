
import * as express from "express";
import path = require("path")
import { Response, Request } from "express";
import { TicTacToeRouter } from "./Routes/tictactoeRoute";
import { TicTacToeService } from "./Services/tictactoeService";

const app = express()
const port = 3000

const ticTacToeService = new TicTacToeService()
const ticTacToeRouter = new TicTacToeRouter(ticTacToeService);

// APIs for tick tack toe game 
app.get('/api', (req: Request, res: Response) => res.status(200).json({message: 'HELLO WORLD'}))
app.get('/api/ttt/game', (req: Request, res: Response) => ticTacToeRouter.getGame(req, res) )
app.post('/api/ttt/makemove', (req: Request, res: Response) => ticTacToeRouter.makeMove(req, res))

// APIs for interview

// Default route used to serve the frontend
app.use('/', express.static(path.join(__dirname, '../client')));

// Start listening on the port
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
