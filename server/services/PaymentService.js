const axios = require('axios');

class PaymentService {
  static createTransaction(order) {
    return axios.post('http://server:3000/transactions', {
      ...order
    });
  }
}

module.exports = PaymentService;
