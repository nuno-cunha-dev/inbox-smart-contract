import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'
import contract from './compile.js'
import config from './config.js'

const provider = new HDWalletProvider(config.mnemonic, config.providerApi)
const web3 = new Web3(provider)

let deploy = async () => {
  const account = (await web3.eth.getAccounts())[0]

  console.log('Deploy from account: ', account)
  const result = await new web3.eth.Contract(contract.abi)
    .deploy({
      data: contract.evm.bytecode.object,
      arguments: ['Hello World!'],
    })
    .send({
      gas: 1000000,
      from: account,
    })

  console.log('Contract address: ', result.options.address)

  provider.engine.stop()
}

deploy()
