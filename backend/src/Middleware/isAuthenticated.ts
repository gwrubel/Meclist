import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //recebe o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    //validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    
    //recuperar o id do token e colocar dentro de uma variavel 
    req.user_id = sub;

    return next();
  }
  catch (error) {
    
    return res.status(401).end();
  }
}
