/*
 *Created Based of of https://github.com/SavjeeTutorials/SavjeeCoin tutorial. 
*/
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index,timestamp,data,previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }
    calcHash(){return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();}
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calcHash();
        }
    
        console.log("BLOCK MINED: " + this.hash);
      }
}
class Blockchain {
    constructor(){
        this.chain = [this.genisisBlock()];
        this.difficulty = 5;
    }
    genisisBlock(){
        return new Block(0,"01/01/1970","Root Block","0");
    }
    addBlock(block) {
        block.previousHash = this.getLastBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }
    getLastBlock(){
        return this.chain[this.chain.length-1];
    }
    isChainValid() {
        for (i in this.chain){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
class CurrentDate extends Date {
    constructor(){
        super();
        this.day = super.getDate();
        this.month = (super.getMonth()+1);
        this.year = super.getFullYear();
    }
    toString(){return (this.month + "/" + this.day + "/" + this.year);}
}

var myBlockChain = new Blockchain();
const time = new CurrentDate().toString();
console.log('Mining block 1...');
myBlockChain.addBlock(new Block(2, time, { amount: 8 }));
console.log('Mining block 2...');
myBlockChain.addBlock(new Block(2, time, { amount: 8 }));
console.log("Block Chain" + JSON.stringify(myBlockChain));