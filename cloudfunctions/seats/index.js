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
          value: 'D餐厅'
        },
        keyword2: {
          value: event.people
        },
        keyword3: {
          value: event.date
        },
        keyword4: {
          value: event.seatnum
        },
        keyword5: {
          value: event.window
        },
        keyword6: {
          value: event.sex
        },
        keyword7: {
          value: event.num
        },
        keyword8: {
          value: '200'
        },
        keyword9: {
          value: event.text
        }
      },
      templateId: 'Xw2e_O9SIo918Wqxhu8YTaZX2U6KvvBKjN4te4qHxpY',
      formId: formid,
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}