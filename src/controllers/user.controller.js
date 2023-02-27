const { signToken } = require("../middlewares/auth.middleware");
const { findById } = require("../models/user.model");
const Users = require("../models/user.model");
const { hash} = require("bcryptjs");

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = new Users(data);
    const savedData = await user.save();
    res.status(201);
    res.send({ savedData });
  } catch (error) {
    next(error);
  }
};

const validateAccount = async (req, res, next) => {
  try {
    const email = req.body.email;
    const data = await Users.findOneAndUpdate(
      { email: email },
      { $set: { confirmation: true } },
      { new: true }
    );
    res.status(200);
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    const data = await Users.findOne({ userId: userId });
    if (data === null) {
      next({ message: "Usuario o contraseña incorrecto", statusCode: 401 });
    } else {
      const verify = await data.verifyPassword(password);
      if (verify) {
        if (data.confirmation === false) {
          next({ message: "Usuario no confirmado", statusCode: 401 });
          return;
        }
        const payload = {
          _id: data._id,
          userId: data.userId,
          email: data.email,
        };
        const token = signToken(payload);
        res.status(200);
        res.send({ token: token });
      } else {
        next({ message: "Contraseña incorrecta", statusCode: 401 });
      }
    }
  } catch (error) {
    next(error);
  }
};

const userInfo = async (req, res, next) => {
    console.log(req.params);
  try {
    const info = req.doc;
    const decoded = req.decoded;
    if (info._id.toString() === decoded._id) {
         if (info.userType === "PATIENT") {
            const data = await Users.findOneAndUpdate(
                { userId: decoded.userId },
                { $set: { name:req.body.name,
                          adress:req.body.adress,
                          birthDate:req.body.birthDate    } },
                { new: true }
              );
              res.status(200);
              res.send({ data });
        } else {
                const data = await Users.findOneAndUpdate(
                    { userId: decoded.userId },
                    { $set: { name:req.body.name,
                              adress:req.body.adress,
                              services:req.body.services    } },
                    { new: true }
                  );
                  res.status(200);
                  res.send({ data });
        } 
    } else {
        next({
            statusCode: 403,
            message: 'Forbidden1',
          });
    }
  } catch (error) {
    next(error);
  }
};

const id = async (req,res,next) => {
    try {
        const id = req.params.id || "";
        const data = await Users.findById(id).exec();
        if (data === null) {
            next({message:"Not found",statusCode:404})
        } else {
            req.doc = data;
            next();
        }
    } catch (error) {
        next(error);
    }
}

const changePass = async (req, res, next) => {
    
    try {
      const newPass = req.body.password;
      
      const decoded = req.decoded;
      const info = req.doc;
      if (decoded.userId === info.userId) {
        const data = await Users.findOneAndUpdate(
            { userId: decoded.userId },
            { $set: { password:await hash(newPass,10) } },
            { new: true }
          );
          res.status(200);
          res.send({ data });
      } else {
        next({message:"Not found",statusCode:404})
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = { createUser, validateAccount, signIn, userInfo, id, changePass };
