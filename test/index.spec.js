const { assert } = require ('chai')
const unifyUrl = require('../src/unifyUrl')
const unifyUrlFromIndex = require('../index.js')

describe('index.js', () => {
  it('Should export the same value as the src/unifyUrl module', () => {
    assert.strictEqual(unifyUrlFromIndex, unifyUrl)
  })
})
