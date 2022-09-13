import { Request, Response, NextFunction } from 'express';

interface error {
  code?: string
  type: string
  message: string
}

const ERRORS: any = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
};


export async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
  let statusCode: number = ERRORS[error.type];

  if(error.code === 'P2002'){
    return res.status(409).send('Title conflict try another one!');
  }

  if(!statusCode){
    console.log(error);
    statusCode = 500;
    return res.sendStatus(statusCode); // internal server error
  }
  
  return res.status(statusCode).send(error.message);
}
