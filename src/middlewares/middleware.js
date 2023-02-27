const notFoundMIDWR = (req, res, next) => {
  next({ message: "Route Not found", statusCode: 404 });
};

const errMIDWR = (err,req,res,next) => {
    const { message = "", statusCode = 500 } = err;
    res.status(statusCode);
    res.json({message,statusCode});
}

module.exports = { notFoundMIDWR, errMIDWR };
