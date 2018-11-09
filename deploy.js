const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'witness cricket reform stereo horse budget border upgrade purity puppy flight shield',
  'https://rinkeby.infura.io/v3/f5c1ecd8143e43ed9951c2aa9e9ad9a4'  
);

const web3 = new Web3(provider); 

// just to be able to use async await
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('deploying with account :' , accounts[0]);

const res = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data : bytecode , arguments : ['Hi There !']})
            .send({gas : 1000000 , from: accounts[0]});

    console.log('contract deployed to :',res.options.address);
};
deploy();