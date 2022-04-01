// INSTALL THE BELOW PACKAGES USING NPM. THIS SCRIPT ASSUMES YOU HAVE NODE.JS AND NPM INSTALLED.
// npm install bip39@3.0.4
// npm install hdkey@2.0.1
// npm install bech32@2.0.0
// npm install buffer@5.7.1
//
// THEN RUN WITH BELOW COMMAND:
// node ./radix-vanity-address-generator-no-prompt.js <suffix_to_look_for>
//
// TO RUN AND OUTPUT RESULTS TO FILE:
// node ./radix-vanity-address-generator-no-prompt.js <suffix_to_look_for> > ./generator_output.txt


const bip39 = require('bip39');
var HDKey = require('hdkey');
let { bech32 } = require('bech32');
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer


const start = new Date().getTime();
console.log('\n\nGenerating. Please wait... (may take from seconds up to many hours\ndepending on suffix length and CPU speed)\n\n');
const searchString = process.argv.slice(2)[0].toLowerCase();
var found = false;


while(found == false){

	var mnemonic = bip39.generateMnemonic();
	var seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
	var hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
	              
	var childkey = hdkey.derive("m/44'/1022'/0'/0/0'")
	var privatekey = childkey.privateKey.toString('hex')
	var publickey = childkey.publicKey.toString('hex');
	var readdr_bytes = Buffer.concat([Buffer.from([0x04]), childkey.publicKey]);
	var readdr_bytes5 = convertbits(Uint8Array.from(readdr_bytes), 8, 5, true);
	var rdx_addr = bech32.encode("rdx", readdr_bytes5);

	if(rdx_addr.endsWith(searchString)){

		var end = new Date().getTime();
		var time = end - start;

		console.log('Execution Time: ' + msToTime(time));
		console.log('Radix Address: ' + rdx_addr);
		console.log('Public Key: ' + publickey);
		console.log('Private Key: ' + privatekey);
		console.log('Mnemonic: ' + mnemonic);
		console.log('\n');
		found = true;
	}
}



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



function msToTime(duration) {
	var milliseconds = parseInt((duration%1000))
    	, seconds = parseInt((duration/1000)%60)
    	, minutes = parseInt((duration/(1000*60))%60)
    	, hours = parseInt((duration/(1000*60*60))%24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
