const fs = require('fs');
const folderPath = '../Inputs/Day5.txt';
const splitInfo = fs.readFileSync(folderPath).toString().split('\n\n')

const stacksInfo = splitInfo[0].split('\n').map(row => row.split('')).slice(0, -1)
const movesInfo = splitInfo[1].split('\n')
console.log('stacksInfo: ', stacksInfo)

function stackMaker(inputArray) {
    const array = JSON.parse(JSON.stringify(inputArray)); // Deep copy so I can splice off values
    const columns = Math.ceil(array[0].length / 4)
    // const stacks = Array(columns).fill([]) // weird this doesn't work, have to look into that

    const stacks = []
    for (let i = 0; i < columns; i++) stacks.push([])// [[column 1],[column 2],[column 3],[etc],[]]

    for (let i = 0; i < stacks.length; i++) {
        for (let j = 0; j < array.length; j++) {
            const snippet = array[j].splice(0, 4).join('').trim()
            if (snippet) stacks[i].push(snippet)
        }
    }
    return stacks.map(stack => stack.map(item => item[1]).reverse())
}
//0 [ 'L', 'N', 'W', 'T', 'D' ]
//1 [ 'C', 'P', 'H' ]
//2 [ 'W', 'P', 'H', 'N', 'D', 'G', 'M', 'J' ]
//3 [ 'C', 'W', 'S', 'N', 'T', 'Q','L' ]
//4 [ 'P', 'H', 'C', 'N' ]
//5 [ 'T', 'H', 'N', 'D', 'M', 'W', 'Q', 'B' ]
//6 [ 'M', 'B', 'R', 'J', 'G', 'S', 'L' ]
//7 [ 'Z', 'N', 'W', 'G', 'V', 'B', 'R', 'T' ]
//8 [ 'W', 'G', 'D', 'N', 'P', 'L' ]

//[ 'move', '6', 'from', '6', 'to', '5' ]
function doMoves(craneModel) {
    const stacks = stackMaker(stacksInfo)

    movesInfo.forEach((move) => {
        move = move.split(' ')

        let numberToMove = move[1]
        const moveFrom = move[3] - 1 //index of actual stack are minus1 though so fix that
        const moveTo = move[5] - 1
        // console.log(numberToMove, moveFrom, moveTo)
        if (craneModel === 'CrateMover 9000') {
            while (numberToMove > 0) {
                stacks[moveTo].push(stacks[moveFrom].pop())
                numberToMove--
            }
        }
        if (craneModel === 'CrateMover 9001') {
            //[ 'move', '6', 'from', '6', 'to', '5' ]
            // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            // console.log(arr.splice(-6, 6))
            // console.log(arr)
            stacks[moveTo].push(...stacks[moveFrom].splice(-numberToMove, numberToMove))
        }

    })
    return stacks
}
console.log('Part One Solution: ', doMoves('CrateMover 9000'))
//0 [ 'T' ],
//1 [ 'W' ],
//2 [ 'W', 'J', 'N', 'S' ],
//3 [ 'N', 'M', 'V', 'R','D', 'N', 'H', 'Z','T', 'P', 'J', 'G' ],
//4 [ 'L', 'C', 'Q' ],
//5 [ 'M', 'W', 'B','W', 'D', 'P','H'],
//6 [ 'S', 'P', 'G', 'N', 'C','G', 'M', 'H', 'N', 'L','W', 'T', 'N', 'D', 'T','W', 'G', 'R', 'N'],
//7 [ 'Q', 'D', 'H' ],
//8 [ 'P', 'B', 'B', 'L', 'C', 'L' ]
console.log('Part Two Solution: ', doMoves('CrateMover 9001'))

//[ 'move', '6', 'from', '6', 'to', '5' ]
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(arr.splice(-6, 6))
// console.log(arr)