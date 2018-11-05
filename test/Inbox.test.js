const   assert    = require('assert');
const   ganache   = require('ganache-cli');
const   Web3      = require('web3');

const   interface = require('./compile'),
        bytecode  = require('./compile');

const web3 = new Web3(ganache.provider());

let accounts,inbox ;
beforeEach(async () => {
    //Get list of all accounts 
    accounts = await web3.eth.getAccounts()
    
    //use one of the accounts to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({ data : bytecode , arguments :[ 'HI there !']})
                    .send({from : accounts[0], gas : '1000000' });
}); 

describe('Inbox' , () => {
    it('deploy', () => {
        console.log(inbox);
    });
});