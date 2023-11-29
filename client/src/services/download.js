import { saveAs } from "file-saver"

const serviceDownloadBackup = (base64Data, fileName) => {
  try {
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: "application/octet-stream" })

    // Salvar o arquivo utilizando o file-saver
    saveAs(blob, fileName)
  } catch (error) {
    console.error("Erro ao fazer o download do arquivo:", error)
  }
}

export { serviceDownloadBackup }
