const   assert    = require('assert');
const   ganache   = require('ganache-cli');
const   Web3      = require('web3');

const   interface = require('../compile'),
        bytecode  = require('../compile');

const provider    = ganache.provider();
const web3        = new Web3(provider);

let accounts,inbox ;
beforeEach(async () => {
    //Get list of all accounts 
    accounts = await web3.eth.getAccounts()
    
    //use one of the accounts to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({ data : bytecode , arguments :[ 'Hi there !']})
                    .send({from : accounts[0], gas : '1000000' });
    inbox.setProvider(provider);
}); 

describe('Inbox' , () => {
    it('deploy', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message' ,  async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message , 'Hi there !');
    });

    it('can change message' , async () => {
        await inbox.methods.setMessage('Move on').send({from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message , 'Move on');
    });
});