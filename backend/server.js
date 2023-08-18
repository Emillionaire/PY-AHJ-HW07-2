const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const { TicketsStorage } = require('./models')

const ticketStorage = new TicketsStorage()

const app = new Koa()

app.use(cors())

app.use(koaBody({
    urlencoded: true,
    multipart: true
}))

app.use(async (ctx) => {
    const requestQuery = ctx.request.query
    const requestBody = ctx.request.body
    let method, id, name, description
    if (requestQuery) {
        method = requestQuery.method
        id = requestQuery.id
    }
    if (requestBody) {
        name = requestBody.name
        description = requestBody.description
    }

    let ticket

    switch (method) {
    case 'allTickets':
        ctx.response.body = ticketStorage.allTickets()
        ctx.response.status = 200
        return
    case 'ticketById':
        ticket = ticketStorage.ticketById(Number(id))
        if (ticket) {
            ctx.response.body = ticket
            ctx.response.status = 200
        } else {
            ctx.response.body = 'Not found'
            ctx.response.status = 404
        }
        return
    case 'createTicket':
        ctx.response.body = ticketStorage.createTicket(name, description)
        ctx.response.status = 201
        return
    case 'changeStatus':
        ticket = ticketStorage.ticketById(Number(id))
        if (ticket) {
            ticket.toggleStatus()
            ctx.response.body = ticket
            ctx.response.status = 200
        } else {
            ctx.response.body = 'Not found'
            ctx.response.status = 404
        }
        return
    case 'editTicket':
        ticket = ticketStorage.editTicket(Number(id), name, description)
        if (ticket) {
            ctx.response.body = ticket
            ctx.response.status = 204
        } else {
            ctx.response.body = 'Not found'
            ctx.response.status = 404
        }
        return
    case 'deleteTicket':
        if (ticketStorage.deleteTicket(Number(id))) {
            ctx.response.body = 'OK'
            ctx.response.status = 204
        } else {
            ctx.response.body = 'Not found'
            ctx.response.status = 404
        }
        return
    default:
        ctx.response.status = 404
    }
})

const server = http.createServer(app.callback())

const port = 7070

server.listen(port, (err) => {
    if (err) {
        console.log(err)

        return
    }

    console.log('Server is listening to ' + port)
})
