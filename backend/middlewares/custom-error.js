class customApiError extends Error{
    constructor(message,statusCode){
        super(message);
    //    this.msg=msg
       this.statuscode = statusCode;
       
    }
}
const createCustomError=(message,statusCode)=>{
    return new customApiError(message,statusCode)

}
module.exports={customApiError,createCustomError}