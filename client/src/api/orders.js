export const getOrders = (user, setOrders) => {
    fetch('http://localhost:3004/orders', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        },
    }).then(response => response.json())
    .then(response => setOrders(response));
}

export const refundOrder = (user, order) => {
    return fetch(`http://localhost:3004/orders/${order.id}/refund`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
            amount: order.amount
        })
    }).then(response => response.json())
    .then(response => response)
}

export const partialRefundOrder = (user, order, amount) => {
    return fetch(`http://localhost:3004/orders/${order.id}/refund`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
            amount: amount * 100
        })
    }).then(response => response.json())
    .then(response => response)
}

export const addOrder = (user, cart) => {
    const products = cart.products.map(product => {
        return {...product, price: product.price * 100}
    });
    const total = cart.total * 100;

    return fetch('http://localhost:3004/orders', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: total,
            currency: "EUR",
            cart: products,
            billing: {
                fullName: "Marcel Patoulachi",
                address: "place de la tour Eiffel",
                town: "Paris",
                zip: "75001",
                country: "France"
            },
            shipping: {
                fullName: "Marcel Patoulachi",
                address: "place de la tour Eiffel",
                town: "Paris",
                zip: "75001",
                country: "France"
            }
        })
    }).then(response => response.json())
    .then(response => response)
}