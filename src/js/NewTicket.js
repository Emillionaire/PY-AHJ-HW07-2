export default class NewTicket {
    static newCard (id, name, description, status, created) {
        const ticket = document.createElement('div')
        ticket.classList.add('ticket')
        ticket.dataset.id = id

        const ticketMain = document.createElement('div')
        ticketMain.classList.add('ticket__main')

        const ticketLeftPart = document.createElement('div')
        ticketLeftPart.classList.add('left-part')

        const ticketCheckBox = document.createElement('input')
        ticketCheckBox.classList.add('ticket-checkbox')
        ticketCheckBox.type = 'checkbox'
        ticketCheckBox.checked = status
        ticketLeftPart.appendChild(ticketCheckBox)

        const ticketName = document.createElement('span')
        ticketName.classList.add('ticket-name')
        ticketName.textContent = name
        ticketLeftPart.appendChild(ticketName)

        ticketMain.appendChild(ticketLeftPart)

        const ticketRightPart = document.createElement('div')
        ticketRightPart.classList.add('right-part')

        const ticketTime = document.createElement('span')
        ticketTime.classList.add('ticket-time')
        ticketTime.textContent = created
        ticketRightPart.appendChild(ticketTime)

        const ticketEdit = document.createElement('button')
        ticketEdit.classList.add('ticket-edit')
        ticketRightPart.appendChild(ticketEdit)

        const ticketDelete = document.createElement('button')
        ticketDelete.classList.add('ticket-delete')
        ticketRightPart.appendChild(ticketDelete)

        ticketMain.appendChild(ticketRightPart)

        ticket.appendChild(ticketMain)

        const ticketSub = document.createElement('div')
        ticketSub.classList.add('ticket__sub')

        const ticketDescription = document.createElement('pre')
        ticketDescription.classList.add('ticket-description')
        ticketDescription.textContent = description
        ticketSub.appendChild(ticketDescription)

        ticket.appendChild(ticketSub)

        return ticket
    }
}
