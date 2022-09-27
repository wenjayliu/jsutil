import i18n from '@/assets/lang'
/** NORMAL, DELETED, BANNED ，UNLIST */
export const SHOPEE_MALL_SATUS_EM = {
  NORMAL: i18n.t('NORMAL'),
  DELETED: i18n.t('DELETED'),
  BANNED: i18n.t('BANNED'),
  UNLIST: i18n.t('UNLIST')
}

export function emToOptions(emu) {
  const options = []
  Object.keys(emu).forEach(item => {
    options.push({
      label: emu[item],
      value: ~~item
    })
  })
  console.log(options)
  // debugger
  return options
}

/**
 * 获取数组的某个name
 * @param {*} options
 * @returns
 */
export function findOptionsName(options, id, key = 'value', name = 'label') {
  if (!options && options.length === 0) {
    return ''
  }
  const activeItem = options.find(item => item[key] === id)

  if (activeItem) {
    return activeItem[name]
  }
  // console.log(options)
  // debugger
  return ''
}

/** 获取下拉菜单的某个元素
 * @param {*} options  下拉菜单
 * @returns
 */
export function findOptionsItem(options, id, key = 'value') {
  if (!options && options.length === 0) {
    return null
  }
  const activeItem = options.find(item => item[key] === id)

  if (activeItem) {
    return activeItem
  }
  // console.log(options)
  // debugger
  return null
}

/** 获取下拉菜单的多个选中元素
 * @param {*} options  下拉菜单
 * @returns
 */
export function findOptionsValues(options, ids, key = 'value') {
  if (!options && options.length === 0) {
    return null
  }
  console.log('ids', ids, options)
  const activeOptions = []
  for (let index = 0; index < options.length; index++) {
    const element = options[index]
    if (ids.includes(element[key])) {
      activeOptions.push(element)
    }
  }
  console.log('activeOptions', activeOptions)
  return activeOptions
}
