'use strict'

const Env = use('Env')

const stripe = require('stripe')(Env.get('STRIPE_SECRET_KEY'))

class StripeService {
  /* OBTER DADOS DO CLIENTE */
  static async getCustomerData(customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId)
      if (Env.get('NODE_ENV') === 'development') {
        console.log('Dados do cliente:', customer)
      }
      return customer
    } catch (error) {
      console.error('Erro ao buscar dados do cliente:', error)
      throw error
    }
  }
  /* OBTER DADOS DA ASSINATURA DO CLIENTE PELO ID DO CLIENTE */
  static async getSubscriptionByCustomerId(customerId) {
    try {
      // Buscar todas as assinaturas associadas ao cliente
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
      })

      // Se o cliente tiver várias assinaturas, você pode escolher a que deseja
      const subscription = subscriptions.data[0] // Por exemplo, pegamos a primeira assinatura aqui
      if (Env.get('NODE_ENV') === 'development') {
        console.log('Dados da assinatura do cliente:', subscription)
      }
      return subscription
    } catch (error) {
      console.error('Erro ao buscar dados da assinatura do cliente:', error)
      throw error
    }
  }
  /* ATUALIZAR O PLANO DA CONTA */
  static async upgradeSubscription(subscription_id, plan_id) {
    try {
      const response = await stripe.subscriptions.update(subscription_id, {
        items: [
          {
            price: plan_id,
          },
        ],
      })
      if (Env.get('NODE_ENV') === 'development') {
        console.log(response)
      }
      return response
    } catch (error) {
      console.error('Erro ao atualizar assinatura do cliente:', error)
      throw error
    }
  }
  /* CANCELAR ASSINATURA DA CONTA */
  static async cancelSubscription(subscriptionId) {
    try {
      const currentTimeInGMT = new Date().toISOString()
      const canceledSubscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: false,
        }
      )
      if (Env.get('NODE_ENV') === 'development') {
        console.log('Assinatura cancelada com sucesso:', canceledSubscription)
      }
      return canceledSubscription
    } catch (error) {
      console.error('Erro ao cancelar a assinatura:', error)
      throw error
    }
  }
  /* CRIAR NOVA ASSINATURA PARA O CLIENTE */
  static async createNewSubscription(customerId, newPriceId) {
    try {
      const newSubscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: newPriceId,
          },
        ],
      })

      console.log('Nova assinatura criada com sucesso:', newSubscription)
      return newSubscription
    } catch (error) {
      console.error('Erro ao criar a nova assinatura:', error)
      throw error
    }
  }
  /* REMOVER ITENS DA ASSINATURA */
  static async removeItensSubscription(subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      // Verificar se a assinatura possui itens
      if (subscription.items.total_count > 0) {
        // Obter o ID do primeiro item de assinatura
        const firstItem = subscription.items.data[0].id

        // Remover o primeiro item da assinatura
        await stripe.subscriptionItems.del(firstItem)

        console.log(
          'Primeiro item da assinatura removido com sucesso:',
          firstItem
        )
      } else {
        console.log('A assinatura não possui itens para remover.')
      }
      return true
    } catch (error) {
      console.error('Erro ao deletar item da assinatura', error)
      throw error
    }
  }
  /* OBTER PRÓXIMA FATURA */
  static async getNextInvoice(subscriptionId) {
    try {
      // Obter os detalhes da próxima fatura da assinatura
      const invoice = await stripe.invoices.retrieveUpcoming({
        subscription: subscriptionId,
      })
      if (Env.get('NODE_ENV') === 'development') {
        console.log('Detalhes da próxima fatura:', invoice)
      }
      return invoice
    } catch (error) {
      console.error('Erro ao obter a próxima fatura:', error)
      throw error
    }
  }
  /* OBTER DATA E VALOR DA PRÓXIMA FATURA */
  static async getNextInvoiceDateAndAmount(subscriptionId) {
    try {
      // Obter os detalhes da próxima fatura da assinatura
      const invoice = await stripe.invoices.retrieveUpcoming({
        subscription: subscriptionId,
      })

      // Extrair a data de vencimento e o valor total da próxima fatura
      const nextInvoiceDate = new Date(invoice.period_end * 1000) // Converter o timestamp UNIX para data
      const nextInvoiceAmount = (invoice.total / 100).toFixed(2) // Converter centavos para reais

      if (Env.get('NODE_ENV') === 'development') {
        console.log('Data da próxima fatura:', nextInvoiceDate.toISOString())
        console.log('Valor da próxima fatura:', nextInvoiceAmount)
      }

      return {
        nextInvoiceDate: nextInvoiceDate.toISOString(),
        nextInvoiceAmount: nextInvoiceAmount,
      }
    } catch (error) {
      console.error('Erro ao obter a próxima fatura:', error)
      throw error
    }
  }
}

module.exports = StripeService
