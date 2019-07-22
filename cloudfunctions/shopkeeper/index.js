const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const openid = event.openid
  const formid = event.formid
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: openid,
      //page: 'index',
      data: {
        keyword1: {
          value: event.name
        },
        keyword2: {
          value: event.number
        },
        keyword3: {
          value: event.num
        },
        keyword4: {
          value: event.tips
        }
      },
      templateId: 'tx6Q91J2cL53M6Mna02HecoCRdPrmKIei9soYKPvVO8',
      formId: formid,
      // emphasisKeyword: 'keyword1.DATA'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}