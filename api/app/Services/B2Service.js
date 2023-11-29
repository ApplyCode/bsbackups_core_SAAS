const B2 = require('backblaze-b2')

class B2Service {
  static async listFilesInFolder({
    key_id,
    application_key,
    backup_id,
    bucket,
  }) {
    const b2 = new B2({
      applicationKeyId: key_id,
      applicationKey: application_key,
    })
    try {
      await b2.authorize()
      let res = await b2.getBucket({ bucketName: bucket })
      let bucket_id = res.data.buckets[0].bucketId
      const response = await b2.listFileNames({
        bucketId: bucket_id,
        maxFileCount: 1000,
        delimiter: '',
        prefix: `bsbackups/${backup_id}`,
      })
      console.log(response.data)
      return response.data
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async downloadFileById({ key_id, application_key, file_id }) {
    const b2 = new B2({
      applicationKeyId: key_id,
      applicationKey: application_key,
    })
    try {
      await b2.authorize()
      const response = await b2.downloadFileById({
        fileId: file_id,
        responseType: 'arraybuffer',
      })
      return response.data
    } catch (e) {
      console.log(e)
      return null
    }
  }
  /* OBTER TAMANHO DE ARQUIVOS POR BACKUP */
  static async getFilesSizeInGB({
    key_id,
    application_key,
    bucketName,
    folderName = '',
  }) {
    const b2 = new B2({
      applicationKeyId: key_id,
      applicationKey: application_key,
    })

    try {
      await b2.authorize() // Autentica o cliente

      let res = await b2.getBucket({ bucketName: bucketName })
      let bucket_id = res.data.buckets[0].bucketId

      const response = await b2.listFileNames({
        bucketId: bucket_id,
        prefix: `bsbackups/` + folderName,
      })

      // Calcula o tamanho total dos arquivos em GB
      let totalSizeGB = 0
      response.data.files.forEach((file) => {
        totalSizeGB += file.contentLength
      })

      // Convertendo de bytes para GB
      totalSizeGB = totalSizeGB / (1024 * 1024 * 1024)

      return totalSizeGB
    } catch (error) {
      console.error('Erro ao obter os arquivos:', error)
      throw error
    }
  }

  static async getTotalSizeForFolders({
    key_id,
    application_key,
    bucketName,
    folderNames,
  }) {
    let totalSizeGB = 0

    try {
      for (const folderName of folderNames) {
        const sizeInGB = await this.getFilesSizeInGB({
          key_id,
          application_key,
          bucketName,
          folderName,
        })
        totalSizeGB += sizeInGB
        console.log(
          `Tamanho da pasta "${folderName}" em GB: ${sizeInGB.toFixed(2)} GB`
        )
      }

      console.log(
        `Tamanho total de todas as pastas em GB: ${totalSizeGB.toFixed(2)} GB`
      )
      return totalSizeGB
    } catch (error) {
      console.error('Erro:', error)
      throw error
    }
  }

  /* OBTER ID DO ARQUIVO PELO NOME */
  static async getFileIdByName({
    key_id,
    application_key,
    bucket,
    backup_id,
    fileName,
  }) {
    const b2 = new B2({
      applicationKeyId: key_id,
      applicationKey: application_key,
    })

    try {
      await b2.authorize()
      let res = await b2.getBucket({ bucketName: bucket })
      let bucket_id = res.data.buckets[0].bucketId

      const response = await b2.listFileNames({
        bucketId: bucket_id,
        maxFileCount: 1000,
        delimiter: '',
        prefix: 'bsbackups/' + backup_id + '/' + fileName,
      })

      if (response.data.files.length === 0) {
        throw new Error('Arquivo não encontrado')
      }

      const fileId = response.data.files[0].fileId
      return fileId
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = B2Service
