import { MessageBox, Message } from 'element-ui'
import { valuetype } from './type/index'

// 操作确认提示
export function confirmTips(name) {
  const tips = name || '是否确认删除?'
  return new Promise((resolve, reject) => {
    MessageBox.confirm(tips, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        resolve(name)
      })
      .catch(() => {
        reject()
      })
  })
}

// 判断一个字符串是否是json格式
export const isJson = str => {
  try {
    const jsonObj = JSON.parse(str)
    if (typeof str === 'string' && typeof jsonObj === 'object') return true
  } catch (error) {
    return false
  }
  return false
}

/**
 * 接口请求后的拦截
 * 多用于catch内的错误提示
 * @param {*} err 错误数据
 * @param {*} showMessageBox 是否需要弹框
 *
 * eg.
 * import { catchErr } from '@/util/tips'
 */
export function catchErr(err, showMessageBox = true) {
  console.error(err)
  // console.error(Object.prototype.toString.call(err))
  let msgStr = ''
  if (valuetype(err, 'string')) {
    msgStr = err
  }
  // 接口异常报错，通常已经被拦截，无需弹框
  if (valuetype(err, 'Object')) {
    if (err.msg || err.message) {
      msgStr = err.msg || err.message
    }
    if (err.data && err.data.message) {
      msgStr = err.data.message
    }
    if (err.data && err.data.msg) {
      msgStr = err.data.msg
    }
  }
  if (valuetype(err, 'Error')) {
    msgStr = err
  }

  // todo 已经弹框了不需要再次弹框
  if (msgStr && showMessageBox) {
    Message.error(msgStr)
  }
  return msgStr || '数据异常'
}
