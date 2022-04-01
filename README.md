# Radix Vanity Address Generator

NOTE: This script can run from seconds to many hours depending how long your suffix is!  If the suffix is too long, it may never finish in a reasonable amount of time!

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

Finally, run the script (replace "arg" with your suffix):
```
node ./radix-vanity-address-generator.js arg
```

IF, you want it to run in the background and save the results into a file (replace "arg" with your suffix):
```
nohup node ./radix-vanity-address-generator.js arg > ./generator_output.txt &
```