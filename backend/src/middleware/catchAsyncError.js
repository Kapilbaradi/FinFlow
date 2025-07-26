//This methodd is written so that there will be no need to write try catch for each contoller.
//Instead of writting try and catch each time, the contoller function is passed as a parameter to catchAsyncError method.

const catchAsyncError = (fun) => (req, res, next) => {
  //Here Promise.resolve is equilavent to try block where it try's to resolve the code and catch is catch block.
  Promise.resolve(fun(req, res, next)).catch(next);
};

export default catchAsyncError;
