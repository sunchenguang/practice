function trim(str) {
    let charArr = str.split('');
    let firstValidCharIndex = charArr.findIndex((item) => {
        return item !== ' '
    });
    let lastValidCharIndex = charArr.findLastIndex((item) => {
        return item !== ' '
    });


    return charArr.slice(firstValidCharIndex, lastValidCharIndex + 1).join('')
}

const str = "   Hello, World!   ";
const trimStr = trim(str)
console.log(trimStr)
console.log(trimStr.length)
