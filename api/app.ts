
import * as express from "express";
import path = require("path")
import { Response, Request } from "express";

const app = express()
const port = 3000

// API layer to hit via the frontend or via brower
app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({message: 'HELLO WORLD'});
})

// Default route used to serve the frontend
app.use('/', express.static(path.join(__dirname, '../client')));


// Start listening on the port
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
