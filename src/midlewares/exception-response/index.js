const EnumErrorStatus = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
    INTERNAL_SERVER_ERROR: 500
}

const IParamsError = {
    message: '',
    status: EnumErrorStatus
}

const ExceptionErrorResponse = (args = IParamsError) => {

    return {
        message: args.message,
        status: args.status
    }

}

module.exports = {
    EnumErrorStatus,
    ExceptionErrorResponse
}


