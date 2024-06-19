import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export interface RequestWithUser extends Request {
    userId?: string;
  }

  const cognitoIssuer = 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_j5mhGUJ3s';

  const client = jwksClient({
    jwksUri: `${cognitoIssuer}/.well-known/jwks.json`
  });
  

export const authHandler = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).send('Access token is missing');
    }
  
    req.userId = token;
  
    return jwt.verify(token, (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          var signingKey = key?.getPublicKey() || "";
          callback(null, signingKey);
        });
      }, {
      issuer: cognitoIssuer,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        return res.status(401).send('Access token is invalid');
      }
  

      console.log(token)      // Extracting the Cognito User ID from the decoded token
      const { "cognito:username" : userId } = decoded as jwt.JwtPayload;
  
      // You can attach the user ID to the request, so you can access it in the next middleware or route handler
      req.userId = userId;
  
      // Proceed to next middleware
      return next();
    });
  };