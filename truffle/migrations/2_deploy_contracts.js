const ENS = artifacts.require('@ensdomains/ens/ENSRegistry.sol');
const PublicResolver = artifacts.require('@ensdomains/ens/PublicResolver.sol');
const ReverseRegistrar = artifacts.require('@ensdomains/ens/ReverseRegistrar.sol'); 
const namehash = require('eth-ens-namehash');