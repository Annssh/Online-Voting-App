// const asyncHandler = (requestHandler) => {
//     return async (req, res, next) => {
//         try {
//             await requestHandler(req, res, next);
//         } catch (error) {
//             console.log("ERror code::", error.code);
//             const statusCode = 500;
//             res.status(statusCode || 500).json({
//                 success: false,
//                 message: error.message
//             })
//         }

//     }
// }


// THe above can also be handled using promise
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch((err) => next(err))
    }
}

export { asyncHandler }