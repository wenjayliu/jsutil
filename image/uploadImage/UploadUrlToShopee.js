import UrlUpload from './UrlUpload'
import shopeeIndex from '@/api/shopeeIndex'

export default class extends UrlUpload {
  constructor(mallId) {
    super()
    this.mallId = mallId
    this.postURL = '/v1/uploadImg'
  }

  /** 上传文件对象
   *
   * @param {*} file
   * @returns
   */
  async uploadImageFile(file) {
    const mallId = this.mallId
    // const mallId = 218
    const isImage = file.type.indexOf('image') !== -1
    const isLt4M = file.size / 1024 / 1024 < 4
    // 这里常规检验，看项目需求而定
    if (!isImage) {
      this.$message.error('')
      return { err: file.type, msg: '只能上传图片格式png、jpg、gif!' }
    }
    if (!isLt4M) {
      return { err: file.size, msg: '只能上传图片大小小于4M!' }
    }

    const form = new FormData() // 根据后台需求数据格式
    form.append('file', file) // 文件对象

    try {
      const res = await shopeeIndex({
        method: 'post',
        url: `${this.postURL}?sys_mall_id=${mallId}`,
        data: form,
        header: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress(a) {
          console.log('onUploadProgress', a)
        }
      })
      console.log(res)
      if (res && res.errorCode === 0 && res.data.response) {
        const { url } = res.data.response
        return {
          code: 200,
          data: url
        }
      } else {
        throw res
      }
    } catch (err) {
      console.error(err)
      return { err, msg: '上传图片失败!' }
    }
  }

  async uploadImageUrl(imgurl) {
    const FileRes = await this.getUrlFile(imgurl)
    if (FileRes.code !== 200) {
      return FileRes
    }

    const uploadRes = this.uploadImageFile(FileRes.data)

    return uploadRes
  }
}
