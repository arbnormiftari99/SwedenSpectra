import jwt from 'jsonwebtoken';


const auth = async(req,res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1]
    console.log("Received token:", token);

    const isCustomAuth = token.length < 500;
    let decodedData;
    if(token && isCustomAuth){
        decodedData = jwt.verify(token, process.env.Secret);
        req.userId = decodedData ? decodedData.id : undefined;
    }else{
        decodedData = jwt.decode(token);
        req.userId = decodedData ? decodedData.sub : undefined;
    }
    next();
} catch (error) {
    console.log(error);
}
}

export default auth;