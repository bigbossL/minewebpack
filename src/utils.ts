export function timechange(date: Date) {
  let year = date.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):''+(date.getMonth() + 1)//获取当前月份(0-11,0代表1月)
  let day = date.getDate()<10?'0'+date.getDate():''+date.getDate(); //获取当前日(1-31)
  return year + "-" + month + "-" + day;
}
