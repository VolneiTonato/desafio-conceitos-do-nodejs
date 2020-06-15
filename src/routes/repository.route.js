const { RepositoryController } = require('../controllers/repository')
const { Router } = require('express')
const {ExceptionErrorResponse, EnumErrorStatus } = require('../midlewares/exception-response')
const {isUuid} = require('uuidv4')


const validateRequest = (request, response, next) => {
    try{

        const {id} = request.params

        if(!isUuid(id))
            throw ExceptionErrorResponse({status: EnumErrorStatus.BAD_REQUEST, message: `Invalid ID`})

        next()

    }catch(err){
        next(err)
    }
}

const router = Router()


router.route('/')
    .post(RepositoryController.create)
    .get(RepositoryController.index)

router.route('/:id')
    .all(validateRequest)
    .put(RepositoryController.update)
    .delete(RepositoryController.destroy)


router.route('/:id/like').post(validateRequest, RepositoryController.like)



module.exports = {
    RouterRepository: {
        route: '/repositories',
        router
    }
}  