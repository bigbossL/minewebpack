export function timechange(date: Date) {
  let year = date.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):''+(date.getMonth() + 1)//获取当前月份(0-11,0代表1月)
  let day = date.getDate()<10?'0'+date.getDate():''+date.getDate(); //获取当前日(1-31)
  return year + "-" + month + "-" + day;
}

export function getParam(param: string):string {
  let query = window.location.search;
  console.log(window.location)
  let iLen = param.length;
  let iStart = query.indexOf(param);
  if (iStart == -1) return "";
  iStart += iLen + 1;
  let iEnd = query.indexOf("&", iStart);
  if (iEnd == -1) {
    return query.substring(iStart);
  }
  return query.substring(iStart, iEnd);
}
// 获取当前格式化时间
export function getNowFormatDate() {
  let date = new Date();
  let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):''+(date.getMonth() + 1)//获取当前月份(0-11,0代表1月)
  let day = date.getDate()<10?'0'+date.getDate():''+date.getDate(); //获取当前日(1-31)
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export function getHashUrl(){
  let query = window.location;
  console.log(query)
}

export function getStayDays(startTime:Date,endTime:Date){
        let sDate1 = startTime.getTime()
        let sDate2 = endTime.getTime()
        let dateSpan = sDate2 - sDate1
        dateSpan = Math.abs(dateSpan)
        return Math.floor(dateSpan / (24 * 3600 * 1000))

}