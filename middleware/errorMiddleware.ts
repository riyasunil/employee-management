import {Request, Response, NextFunction} from 'express'
import HttpException from '../exceptions/httpException'

export const errorMiddleware = (error : Error, 
    req : Request, resp : Response, 
    next : NextFunction) => {
        try{
            if (error instanceof HttpException){
                const status: number = error.status || 500
                const message: string = error.message || "Something went wrong"
                let respBody = {message : message}
                resp.status(status).json(respBody)
            }else{
                console.error(error.stack)
                resp.status(500).send({error:error.message})
            }
        }catch(error){
            next(error)
        }
    }
