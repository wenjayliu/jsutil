/**
 * 将图片地址上传到服务端
 */
export default class {
  constructor(option = {}) {
    this.type = 0
    this.httpRequest = option.httpRequest
  }

  /** 判断链接是否指向图片且可下载 */
  checkImgExists = imgurl => {
    return new Promise(function(resolve, reject) {
      var ImgObj = new Image()
      ImgObj.src = imgurl
      ImgObj.onload = function(res) {
        resolve({ res, msg: '可以下载的图片' })
      }
      ImgObj.onerror = function(err) {
        reject({ err, msg: '无法下载图片' })
      }
    })
  }

  // 将图片链接中的图片进行 XMLHttpRequest 请求，返回Blob对象
  getImageBlob(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          resolve(this.response)
        }
      }
      xhr.onerror = err => {
        reject({ err, msg: '无法下载图片' })
      }
      xhr.send()
    })
  }

  // 将Blob对象转为File对象
  blobToFile = (blob, fileName) => {
    return new window.File([blob], fileName, { type: blob.type })
  }

  /** 通过地址获取到的文件名
   * @描述  TODO 特殊地址待处理
   * @param {*} imgurl          图片地址  eg. http://cyt-browser.obs.cn-south.icloud.com:80/image/20220927101640-63325d0865d9e.jpg
   * @return   文件名称
   */
  getFileName(imgurl, timeName) {
    let imageName = new Date().valueOf()
    if (!imgurl || timeName) {
      return imageName
    }
    const imageArr1 = imgurl.split('.') // 第一次分割
    let mybeFileName = ''
    if (imageArr1.length >= 1) {
      mybeFileName = imageArr1[imageArr1.length - 2]
    }
    if (imageArr1.length === 1) {
      mybeFileName = imageArr1[0]
    }
    const imageArr2 = mybeFileName.split('/') // 第二次分割
    if (imageArr2.length === 1) {
      imageName = imageArr2[0]
    }
    if (imageArr2.length >= 1) {
      imageName = imageArr2[imageArr2.length - 2]
    }
    return imageName
  }
  /** 获取文件地址的File对象
   * @描述 文件名称通过地址获取
   * @param {*} imgurl          文件地址
   * @returns Promise:{code: 200, data: imageFile, msg: '获取文件对象成功'}
   */
  async getUrlFile(imgurl) {
    try {
      await this.checkImgExists(imgurl)
      const imageBlob = await this.getImageBlob(imgurl)
      const fileName = this.getFileName(imgurl)
      const imageFile = this.blobToFile(imageBlob, fileName)
      return {
        code: 200,
        data: imageFile,
        msg: '获取文件对象成功'
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
