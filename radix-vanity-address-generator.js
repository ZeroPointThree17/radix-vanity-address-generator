// INSTALL THE BELOW PACKAGES USING NPM. THIS SCRIPT ASSUMES YOU HAVE NODE.JS AND NPM INSTALLED.
// npm install inquirer@8.2.2
// npm install bip39@3.0.4
// npm install hdkey@2.0.1
// npm install bech32@2.0.0
// npm install buffer@5.7.1
//
// THEN RUN WITH BELOW COMMAND:
// node ./radix-vanity-address-generator.js

var inquirer = require('inquirer');
const bip39 = require('bip39');
var HDKey = require('hdkey');
let { bech32 } = require('bech32');
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer


var questions = [
  {
    type: 'input',
    name: 'suffix',
    message: '\n\nWhich letters do you want your Radix address to end with?\n(PLEASE NOTE: The more letters you enter, the longer this process will take. If too many letters, it may not finish within a reasonable amount of time.)\n\n'
  }
]


inquirer.prompt(questions).then(answers => {

		console.log('\n\nGenerating. Please wait... (may take from seconds up to many hours\ndepending on suffix length and CPU speed)\n\n');
		
		var found = false;

		while(found == false){

			var mnemonic = bip39.generateMnemonic();
			var seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
			var hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
			              
			var childkey = hdkey.derive("m/44'/1022'/0'/0/0'")
			var privatekey = childkey.privateKey.toString('hex')
			var publicKey = childkey.publicKey.toString('hex');
			var readdr_bytes = Buffer.concat([Buffer.from([0x04]), childkey.publicKey]);
			var readdr_bytes5 = convertbits(Uint8Array.from(readdr_bytes), 8, 5, true);
			var rdx_addr = bech32.encode("rdx", readdr_bytes5);

			if(rdx_addr.endsWith(answers['suffix'].toLowerCase())){
				console.log('Radix Address: ' + rdx_addr);
				console.log('Public Key: ' + publicKey);
				console.log('Private Key: ' + privatekey);
				console.log('Mnemonic: ' + mnemonic);
				console.log('\n');
				found = true;
			}
		}
	}
);



function convertbits (data, frombits, tobits, pad) {
	var acc = 0;
	var bits = 0;
	var ret = [];
	var maxv = (1 << tobits) - 1;

	for (var p = 0; p < data.length; ++p) {
	var value = data[p];
		if (value < 0 || (value >> frombits) !== 0) {
			return null;
		}
		acc = (acc << frombits) | value;
		bits += frombits;
		while (bits >= tobits) {
			bits -= tobits;
			ret.push((acc >> bits) & maxv);
		}
	}

	if (pad) {
		if (bits > 0) {
			ret.push((acc << (tobits - bits)) & maxv);
		}
	} else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
		return null;
	}

	return ret;
}
