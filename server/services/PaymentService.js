const axios = require('axios');
const { Credential } = require('../models/sequelize');

class PaymentService {
  static async _getAuthToken() {
    const token = await Credential.findOne({where: {key: 'token'}});
    const secret = await Credential.findOne({where: {key: 'secret'}});
    const encodedToken = Buffer.from(`${token.value}:${secret.value}`).toString('base64');
    return `Basic ${encodedToken}`;
  }

  static async _getOptions() {
    return {
      headers: {
        Authorization: await this._getAuthToken()
      }
    };
  }

  static async createTransaction(order) {
    const options = await this._getOptions()
    return axios.post('http://server:3000/transactions', {
      ...order
    }, options);
  }

  static async refund(order, amount) {
    const options = await this._getOptions();
    return axios.post(`http://server:3000/transactions/${order.transactionId}/refund`, {
      amount
    }, options);
  }
}

module.exports = PaymentService;
