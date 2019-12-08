/* eslint-disable indent */
const reconcileOrder = (existingBook, incomingOrder) => {

    if (existingBook.length === 0) {
        existingBook.push(incomingOrder)

    } else {

        const matchingOrders = existingBook.find(order => order.type !== incomingOrder.type && order.price === incomingOrder.price)
        const matchingOrdersIndex = existingBook.findIndex(order => order.type !== incomingOrder.type && order.price === incomingOrder.price)
        const partialMatching = existingBook.find(order => order.type !== incomingOrder.type && order.price > incomingOrder.price && order.quantity === incomingOrder.quantity)
        const partialMatchingIndex = existingBook.findIndex(order => order.type !== incomingOrder.type && order.price > incomingOrder.price && order.quantity === incomingOrder.quantity)

        if (matchingOrders) {

            if (matchingOrders.quantity === incomingOrder.quantity) {

                existingBook.splice(matchingOrdersIndex, 1)

            } else if (matchingOrders.quantity > incomingOrder.quantity) {

                existingBook[matchingOrdersIndex].quantity -= incomingOrder.quantity

            } else if (matchingOrders.quantity < incomingOrder.quantity) {

                incomingOrder.quantity -= matchingOrders.quantity
                existingBook.splice(matchingOrdersIndex, 1)
                existingBook.push(incomingOrder)
            }

        } else if (partialMatching) {

            if (partialMatching.type === 'buy' && incomingOrder.type === 'sell' && partialMatching.price > incomingOrder.price && partialMatching.quantity === incomingOrder.quantity) {
                existingBook.splice(partialMatchingIndex, 1)
            }

        } else {

            existingBook.push(incomingOrder)
        }
    }
    return existingBook
}

module.exports = reconcileOrder