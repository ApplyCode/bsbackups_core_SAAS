'use strict'

const Env = use('Env')

//MODELS
const User = use('App/Models/User')

//LIBS
const moment = require('moment')

//HELPERS
const { generateRandomPassword } = use('App/Helpers/Utils')

//SERVICES
const MailService = use('App/Services/MailService')

class UserService {
  static async createAccount({ customer_id, name, email, phone, metadata }) {
    try {
      const password = generateRandomPassword(8)
      if (Env.get('NODE_ENV') === 'development') {
        console.log('SENHA GERADA: ' + password)
      }
      const user = await User.create({
        name,
        email,
        password,
        description: '',
        plan_id: metadata.plan_id ? metadata.plan_id : 1,
        expires_in: moment().add(31, 'days').format('YYYY-MM-DD'),
        photo: '1.jpg',
        customer_stripe_id: customer_id,
        phone,
        first_access: true,
      })

      if (user)
        //ENVIAR E-MAIL
        await MailService.sendCredentials({ email, password, name })
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = UserService
