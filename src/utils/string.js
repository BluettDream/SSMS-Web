/**
 * 折叠字符串,对于超出最大行数的字符串进行简化
 * @param {String} str 源字符串
 * @param {Number} charsPerLine 每行字数
 * @param {Number} maxLines 最大行数
 * @param {String} ellipsis 最后添加的字符串
 * @param {String} tailChar 每行末尾添加的字符
 * @returns 字符串
 */
export function wrap(str, charsPerLine = 2, maxLines = 2, ellipsis = "...", tailChar = "\n") {
  // 定义一个空字符串，用来存储处理后的结果
  let result = "";
  // 定义一个变量，用来记录换行符的个数
  let newlineCount = 0;
  // 使用 for 循环遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 如果换行符的个数已经达到，就在结果字符串末尾添加"..."，并返回结果
    if (newlineCount === maxLines) {
      result += ellipsis;
      return result;
    }
    // 否则，将当前字符添加到结果字符串中
    result += str.charAt(i);
    // 如果当前字符的索引值是奇数，就在结果字符串末尾添加一个换行符，并增加换行符的个数
    if (i % charsPerLine === 1) {
      result += tailChar;
      newlineCount++;
    }
  }
  // 返回结果字符串
  return result;
}
