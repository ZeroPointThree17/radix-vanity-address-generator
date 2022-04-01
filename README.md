# radix-vanity-address-generator

First, install nodejs and npm:

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install git-all
sudo apt install gitsome
```

Then, create a working directory (this can be anywhere you want):
```
mkdir generator_working_dir
cd generator_working_dir
```

Clone this repository from GitHub:
```
git clone https://github.com/ZeroPointThree17/radix-vanity-address-generator.git
cd radix-vanity-address-generator
```

Then, install pre-requisite packages:
```
npm install inquirer@8.2.2
npm install bip39@3.0.4
npm install hdkey@2.0.1
npm install bech32@2.0.0
npm install buffer@5.7.1
```

Finally, run the script:
```
node ./radix-vanity-address-generator.js
```

IF you want to run the script without a prompt, and with an argument instead, run this (replacing "arg" with your suffix):
```
node ./radix-vanity-address-generator-no-prompt.js arg
```
