const { uuid } = require("uuidv4");
const { EnumErrorStatus, ExceptionErrorResponse } = require("../midlewares/exception-response")

const repositories = []


const index = (request, response, next) => {
    try {

        response.send(repositories)

    } catch (err) {
        next(err)
    }
}

const create = (request, response, next) => {
    try {
        const { title, url, techs } = request.body

        const repository = {
            id: uuid(),
            title,
            url,
            techs,
            likes: 0,
        }

        repositories.push(repository)

        response.send(repository)
    } catch (err) {
        next(err)
    }
}


const destroy = (request, response, next) => {
    try {

        const { id } = request.params

        const repositoryIndex = repositories.findIndex(repository => repository.id === String(id))

        if (repositoryIndex < 0)
            throw ExceptionErrorResponse({ status: EnumErrorStatus.BAD_REQUEST, message: `Repository not found.` })


        repositories.splice(repositoryIndex, 1)

        response.status(204).send()


    } catch (err) {
        next(err)
    }
}

const update = (request, response, next) => {
    try {
        const { id } = request.params

        const { title, url, techs } = request.body

        const repositoryIndex = repositories.findIndex(repository => repository.id === String(id))

        if (repositoryIndex < 0)
            throw ExceptionErrorResponse({ status: EnumErrorStatus.BAD_REQUEST, message: `Repository not found.` })

        repositories[repositoryIndex] = { ...repositories[repositoryIndex], title, url, techs }

        response.send(repositories[repositoryIndex])
    } catch (err) {
        next(err)
    }
}

const like = (request, response, next) => {
    try {
        const { id } = request.params

        const repositoryIndex = repositories.findIndex(repository => repository.id === String(id))

        if (repositoryIndex < 0)
            throw ExceptionErrorResponse({ status: EnumErrorStatus.BAD_REQUEST, message: `Repository not found.` })

        const repository = repositories[repositoryIndex]

        repository.likes++

        repositories[repositoryIndex] = repository

        response.send(repository)
        
    } catch (err) {
        next(err)
    }
}


const RepositoryController = {
    index, destroy, update, create, like
}

module.exports = { RepositoryController }