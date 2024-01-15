const { customApiError } = require("./custom-error")

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof customApiError) {
        return res.status(err.statuscode).json({msg:err.message})
    }
    return res.status(500).json({ msg:"something went wrong "});

}
module.exports=ErrorHandler