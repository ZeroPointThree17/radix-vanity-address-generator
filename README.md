# Radix Vanity Address Generator

First, install nodejs, npm, and git tools:

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
npm install bip39@3.0.4
npm install hdkey@2.0.1
npm install bech32@2.0.0
npm install buffer@5.7.1
```

Finally, run the script (replacing "arg" with your suffix):
```
node ./radix-vanity-address-generator.js arg
```
