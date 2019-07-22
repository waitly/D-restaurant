const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const formid=event.formId
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: event.openid,
      //page: 'index',
      data: {
        keyword1: {
          value: event.openid
        },
        keyword2: {
          value: '尽快送达'
        },
        keyword3: {
          value: event.formidname
        },
        keyword4: {
          value: 'D餐厅'
        },
        keyword5: {
          value: event.oddnumber
        },
        keyword6: {
          value: event.payment
        },
        keyword7: {
          value: '1999-3-12'
        },
        keyword8: {
          value: '微信支付'
        },
        keyword9: {
          value: '广州市海珠区新港中路397号'
        }
      },
      templateId: '2ghZGXreVoEJFlvkwHzxgTOwQs43hkEtRIuJB_aF0Ms',
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