"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const cognitoIssuer = 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_j5mhGUJ3s';
const client = (0, jwks_rsa_1.default)({
    jwksUri: `${cognitoIssuer}/.well-known/jwks.json`
});
const authHandler = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access token is missing');
    }
    req.userId = token;
    return jsonwebtoken_1.default.verify(token, (header, callback) => {
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
        console.log(token); // Extracting the Cognito User ID from the decoded token
        const { "cognito:username": userId } = decoded;
        // You can attach the user ID to the request, so you can access it in the next middleware or route handler
        req.userId = userId;
        // Proceed to next middleware
        return next();
    });
};
exports.authHandler = authHandler;
