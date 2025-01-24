const { afterEach } = require('node:test')
const { MOVES, computerPlayer } = require('./index')

const [ROCK, PAPER, SCISSORS] = MOVES

describe('MOVES', () => {

    for (const move of MOVES) {
        describe(move.toString(), () => {
            test(`${move} should not beat itself`, () => {
                expect(move.beats(move)).toBeFalsy()
            })
            test(`${move} should beat one other move`, () => {
                let victories = 0
                for (const defender of MOVES) {
                    victories += move.beats(defender)
                }
                expect(victories).toBe(1)
            })
            test(`${move} should lose to one other move`, () => {
                let defeats = 0
                for (const aggressor of MOVES) {
                    defeats += aggressor.beats(move)
                }
                expect(defeats).toBe(1)
            })
        }
        )
    }
})
// const testCase = [
//     { randomValue: 0.1, expectedMove: ROCK },
//     { randomValue: 0.5, expectedMove: PAPER },
//     { randomValue: 0.8, expectedMove: SCISSORS }
// ]
describe('computerPlayer', () => {
    const realRandom = Math.random

    afterEach(() => {
        Math.random = realRandom
    })

    const testCase = [
        [ROCK, 0.1],
        [PAPER, 0.5],
        [SCISSORS, 0.8]
    ]
    for (const [expectedMove, randomValue] of testCase) {
        test(`chooseMove() should return ${expectedMove} when Math.random() returns ${randomValue}`, () => {
            //Arrange
            Math.random = () => randomValue
            //Act
            const move = computerPlayer.chooseMove()
            //Assert
            expect(move).toBe(expectedMove)

        })
    }
})
