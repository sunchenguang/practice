/**
 * 找出唯一出现一次的数字
 * 基本思想：使用Map存储每个数字出现的次数，最后返回出现次数为1的数字
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} cards - 数字数组   
 */
function solution(cards) {
    // Edit your code here
    let obj = new Map();

    for (let item of cards) {
        if (obj.has(item)) {
            obj.delete(item)
        } else {
            obj.set(item, 1)
        }
    }
    return obj.keys().next().value;
}

function main() {
    // Add your test cases here
    console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
    console.log(solution([0, 1, 0, 1, 2]) === 2);
}

main();


