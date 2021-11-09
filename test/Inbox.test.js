import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import contract from '../compile.js'

const web3 = new Web3(ganache.provider())

let accounts
let inbox
let txOptions
beforeEach('Deploy a new contract', async () => {
  accounts = await web3.eth.getAccounts();

  txOptions = {
    from: accounts[0],
    gas: '1000000',
  };

  inbox = await new web3.eth.Contract(contract.abi)
    .deploy({
      data: contract.evm.bytecode.object,
      arguments: ['Hello world!'],
    })
    .send(txOptions)
})

describe('Inbox contract', () => {
  it('contract deployed', () => {
    assert.ok(inbox.options.address)
  })

  it('has default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hello world!')
  })

  it('replace default message', async () => {
    await inbox.methods.setMessage('Hi').send(txOptions)
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi')
  })
})
