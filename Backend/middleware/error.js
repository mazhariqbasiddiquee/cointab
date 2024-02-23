const error = (err, req, res, next) => {
    if (err) {
      
        res.status(500).json({ error: err.message }); 
    } else {
        next();
    }
}

module.exports=error