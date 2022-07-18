// USDC whale tracker 
const { ethers, Contract } = require('ethers');
const player = require('play-sound')(opts = {})
const rpcURL = 'https://cloudflare-eth.com/'
const provider = new ethers.providers.JsonRpcProvider(rpcURL)

const contractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; //USDC 
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
const contract = new Contract(contractAddress, contractABI, provider)

const transferThreshold = 100000000000 //100,000 USDC
 
const playSound = () => {
    player.play('rickroll.mp3', function(err){
      if (err) throw err 
    })
  
  }

const main = async () => {
    const name = await new contract.name 
    console.log(`The whale tracker has started, we are listening for large transfers of ${name}`)

    contract.on('Transfer', (from, to, amount, data) => {
        if (amount.toNumber() >= transferThreshold){
            // console.log(from, to, amount, data)
            playSound()
            console.log(`New whale transfer: https://etherscan.io/tx/${data.transactionHash}\n${amount} of USDC transfered`)
        }
        
    })

    

}

main()