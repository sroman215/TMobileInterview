import { Response, Request } from "express";
import { Move } from "../Models/Move";
import { CheckWriterService } from "../Services/checkWriterService";

export class CheckWriterRouter {
    
    constructor(private writerService: CheckWriterService) { }

    public getValue(req: Request, res: Response) {
        const val: any = <any> req.body;
        res.status(200).json(this.writerService.wholeNumberRound(val.val))
    }
}