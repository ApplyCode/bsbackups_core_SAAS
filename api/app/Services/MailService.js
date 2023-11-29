'use strict'

const Mail = use('Mail')

class MailService {
  /* TEST EMAIL */
  static async test() {
    try {
      await Mail.send('emails.test', { hello: 'oi' }, (message) => {
        message
          .from('suporte@blueskysoftwares.com.br')
          .to('rviana.developer@gmail.com')
          .subject('test')
      })

      return 'Teste concluído com sucesso'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  /** Email de acesso */
  static async sendCredentials({ email, password, name }) {
    try {
      await Mail.send(
        'emails.welcome',
        { email, password, name },
        (message) => {
          message
            .from('suporte@blueskysoftwares.com.br')
            .to(email)
            .subject('Seu acesso chegou!')
        }
      )

      return 'Teste concluído com sucesso'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  /* E-MAIL DE FALHA AO EXECUTAR O BACKUP */
  static async sendFailBackup({ name, email }) {
    try {
      await Mail.send('emails.backups.fail', { name }, (message) => {
        message
          .from('suporte@blueskysoftwares.com.br')
          .to(email)
          .subject('Falha ao tentar rodar o backup!')
      })

      return 'E-mail enviado com sucesso!'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  /*E-MAIL DE BACKUP REALIZADO COM SUCESSO */
  static async sendSuccessBackup({ name, email }) {
    try {
      await Mail.send('emails.backups.success', { name }, (message) => {
        message
          .from('suporte@blueskysoftwares.com.br')
          .to(email)
          .subject('Seu backup foi executado com sucesso!')
      })

      return 'E-mail enviado com sucesso!'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  /*  EMAIL DE CANCELAMENTO DE CONTA */
  static async sendCancelAccount({ name, email }) {
    try {
      await Mail.send('emails.cancel', { name }, (message) => {
        message
          .from('suporte@blueskysoftwares.com.br')
          .to('contato@blueskysoftwares.com.br')
          .subject(`CANCELAMENTO DE CONTA [${email}]!`)
      })

      return 'E-mail enviado com sucesso!'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  /* EMAIL DE RECUPERAR CONTA */
  static async sendEmailRecover({ email, token }) {
    try {
      await Mail.send('emails.recover', { email, token }, (message) => {
        message
          .from('suporte@blueskysoftwares.com.br')
          .to(email)
          .subject(`[BS BACKUPS] Recuperar Conta!`)
      })

      return 'E-mail enviado com sucesso!'
    } catch (e) {
      console.error(e)
      return 0
    }
  }
}

module.exports = MailService
