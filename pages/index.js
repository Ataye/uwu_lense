import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Web3 from "web3";
import Web3Modal from "web3modal";
import axios from 'axios';


import { Container, Row, Col, Button, Card, Stack, Table } from 'react-bootstrap'

const stake_abi = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_rewardTokenVault","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penaltyAmount","type":"uint256"}],"name":"ExitedEarly","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawnExpiredLocks","type":"event"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"addReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableRewards","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct MultiFeeDistribution.RewardData[]","name":"rewards","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegateExit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earnedBalances","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTime","type":"uint256"}],"internalType":"struct MultiFeeDistribution.LockedBalance[]","name":"earningsData","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"exitDelegatee","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"onBehalfOf","type":"address"}],"name":"exitEarly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_rewardTokens","type":"address[]"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"incentivesController","outputs":[{"internalType":"contract IChefIncentivesController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"onBehalfOf","type":"address"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lockDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"lockedBalances","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unlockable","type":"uint256"},{"internalType":"uint256","name":"locked","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTime","type":"uint256"}],"internalType":"struct MultiFeeDistribution.LockedBalance[]","name":"lockData","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintersAreSet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardLookback","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardTokenVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IChefIncentivesController","name":"_controller","type":"address"}],"name":"setIncentivesController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_minters","type":"address[]"}],"name":"setMinters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingRewards","type":"address"}],"name":"setStakingRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setTeamRewardFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"setTeamRewardVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingRewards","outputs":[{"internalType":"contract IStakingRewards","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingRewardsAreSet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamRewardFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamRewardVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawExpiredLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"withdrawableBalance","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"penaltyAmount","type":"uint256"},{"internalType":"uint256","name":"amountWithoutPenalty","type":"uint256"}],"stateMutability":"view","type":"function"}];
const stake_addr = "0x7c0bF1108935e7105E218BBB4f670E5942c5e237";

// const erc20_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
const erc20_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];


const contracts = {
  chain_oracle: {
    adr: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    abi: [{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"address","name":"_accessController","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int256","name":"current","type":"int256"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"}],"name":"AnswerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"startedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"NewRound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accessController","outputs":[{"internalType":"contract AccessControllerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"confirmAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"phaseAggregators","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"proposeAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposedAggregator","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"proposedGetRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposedLatestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_accessController","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  },

  sushi_pool: {
    adr: "0x3E04863DBa602713Bb5d0edbf7DB7C3A9A2B6027",
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
  },

  uwu_token: {
    adr: "0x55C08ca52497e2f1534B59E2917BF524D4765257",
    abi: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"addBurner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"addMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinters","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"removeBurner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"removeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  }

}

const tokens = {
  uwu: "0x55C08ca52497e2f1534B59E2917BF524D4765257",
  eth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
}

const uwu_supported_tokens = {
  "0x55C08ca52497e2f1534B59E2917BF524D4765257": {
    name: "UwU Lend",
    cgapi_id: "uwu-lend"
  },
  "0xb95BD0793bCC5524AF358ffaae3e38c3903C7626": {
    name: "DAI",
    cgapi_id: "dai"
  },
  "0x8C240C385305aeb2d5CeB60425AABcb3488fa93d": {
    name: "FRAX",
    cgapi_id: "frax"
  },
  "0x6Ace5c946a3Abd8241f31f182c479e67A4d8Fc8d": {
    name: "WBTC",
    cgapi_id: "wrapped-bitcoin"
  },
  "0x67fadbD9Bf8899d7C578db22D7af5e2E500E13e5": {
    name: "WETH",
    cgapi_id: "weth"
  },
  "0xC480a11A524E4DB27c6d4E814b4D9B3646bC12Fc": {
    name: "MIM",
    cgapi_id: "magic-internet-money"
  },
  "0x243387a7036bfcB09f9bF4EcEd1E60765D31aA70": {
    name: "SSPELL",
    cbapi_id: "spell",
    cbname: "SPELL"
  },
  "0xC4BF704f51aa4ce1AA946FfE15646f9B271ba0fa": {
    name: "WMEMO",
    cgapi_id: "wrapped-memory"
  },
  "0xdb1A8f07f6964EFcFfF1Aa8025b8ce192Ba59Eba": {
    name: "CRV",
    cgapi_id: "curve-dao-token"
  },
  "0xaDFa5Fa0c51d11B54C8a0B6a15F47987BD500086": {
    name: "LUSD",
    cgapi_id: "liquity-usd"
  },
  "0x02738ef3f8d8D3161DBBEDbda25574154c560dAe": {
    name: "SIFU",
    cgapi_id: "sifu-vision"
  },
  // "0xaac1d67f1C17EC01593D76E831C51a4F458Dc160": {
  //   name: "USDT",
  //   cgapi_id: "tether"
  // },
  "0x24959F75d7BDA1884f1Ec9861f644821Ce233c7D": {
    name: "USDT",
    cgapi_id: "tether"
  }

}


const stake_initval = {
  bal: 0,
  eth_price: 0,
  uwu_price: 0,
  rev: 0,
  price_updated: null,
  bal_uwu: 0,
  bal_eth: 0,
  pool_pc: 0,
  apr:      0
}

const pool_initval = {
  total_slp: 0,
  value: 0,
  qty_eth: 0,
  qty_uwu: 0
}


export default function Home() {
  const [ web3, setWeb3 ] = React.useState(null)
  const [ address, setAddress ] = React.useState(null)
  const [ staked, setStaked ] = React.useState(stake_initval);
  const [ pool, setPool ] = React.useState(pool_initval);


  
  const connectSimple = async () => {

    // Connect using web3 and default browser wallet:
    if (window.ethereum) {
      console.log('loading web3 from browser wallet')
   
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const oWeb3 = new Web3(window.ethereum);
      setWeb3(oWeb3)

      // get acc info:
      const account = oWeb3.eth.accounts;

      //Get the current MetaMask selected/active wallet
      const walletAddress = account.givenProvider.selectedAddress;
      console.log(walletAddress)
      setAddress(walletAddress)


      /// Subscribe to block events:
      // var subscription = oWeb3.eth.subscribe('pendingTransactions', function(error, result){
      //     if (!error)
      //         console.log(result);
      // })
      // .on("data", function(transaction){
      //     console.log(transaction);
      // });

      // unsubscribes the subscription
      // subscription.unsubscribe(function(error, success){
      //     if(success)
      //         console.log('Successfully unsubscribed!');
      // });




      // var subscription = oWeb3.eth.subscribe('newBlockHeaders', function(error, result){
      //   if (!error) {
      //       console.log(result);

      //       return;
      //   }

      //   console.error(error);
      // })
      // .on("connected", function(subscriptionId){
      //     console.log(subscriptionId);
      // })
      // .on("data", function(blockHeader){
      //     console.log(blockHeader);
      // })
      // .on("error", console.error);

      // const blockEventUbSubscribe = () => {
      //   // unsubscribes the subscription
      //   subscription.unsubscribe(function(error, success){
      //       if (success) {
      //           console.log('Successfully unsubscribed!');
      //       }
      //   });
      // }
      
    } else {
      console.log("No wallet");
    }
  }

  React.useEffect(() => {
    // set up easel:



    if (window.ethereum && !web3)
      connectSimple()

    // subscribve to new blocks:

  }, [])

  React.useEffect(() => {
    if (!address)
      return;

    // on time:

    //setTimeout(() => {
      getStakeDetails();
    //})
    

  }, [address])


  const getStakeDetails = async () => {
    var BN = web3.utils.BN;

    // load details:
    const stk_cnt = new web3.eth.Contract(stake_abi, stake_addr);
    const bals = await stk_cnt.methods.lockedBalances(address).call();

    // console.log(bals)
    const bal = web3.utils.fromWei(bals[0]);



    // get eth price from Chainlink Oracle:
    const tkn_eth = new web3.eth.Contract(contracts.chain_oracle.abi, contracts.chain_oracle.adr);
    let eth_price = await tkn_eth.methods.latestAnswer().call();
    eth_price = eth_price / 100000000;

    let last_update = await tkn_eth.methods.latestTimestamp().call();
    console.log(last_update)

    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(last_update);

    console.log(d)

    // console.log(eth_price)
    // console.log(eth_price / 100000000)





    // load uwu token contract:
    const tkn_uwu = new web3.eth.Contract(contracts.uwu_token.abi, contracts.uwu_token.adr);
    const uwu_bal = await tkn_uwu.methods.balanceOf(address).call();
    const uwu_bal_disp = web3.utils.fromWei(uwu_bal);
    // console.log(uwu_bal_disp)


    const earned = await stk_cnt.methods.earnedBalances(address).call();
    console.log('earned', earned)


    // load claimable rewards:
    const rewards = await stk_cnt.methods.claimableRewards(address).call();
    //const val = rewards.reduce(async (p, reward) => {
// console.log(rewards)
    /// COINGECKO LOOKUPS
    let lookups = rewards.reduce((prv, reward) => {
      const u = uwu_supported_tokens[reward.token];

      if (u && u.cgapi_id){
        prv = `${prv},${u.cgapi_id}`;
      }

      return prv;
    }, '')
    lookups = lookups.substring(1);

    // get prices from cg:
    const price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${lookups}&vs_currencies=usd`)
// console.log('cg', price)
    const revenue = rewards.reduce((prv, reward) => {
      const u = uwu_supported_tokens[reward.token];
      // if (!u || !u.cgapi_id)
      //   console.log('not found', reward.token)
      if (!u || !price.data[u.cgapi_id])
        return prv;

      const usd = price.data[u.cgapi_id].usd,
            usd_in_wei = web3.utils.toWei(usd.toString())
            // usd_in_wei = web3.utils.toWei((usd * 10 ** 18).toString())

      // console.log(usd, usd_in_wei, reward.amount)

      // var BN = web3.utils.BN;

      // const usd_bn = new BN(usd_in_wei),
      //       amt_bn = new BN(reward.amount),
      //       val_bn = usd_bn.mul(amt_bn);

      // console.log(u.name, usd, usd_bn.toString(), web3.utils.fromWei(usd_bn), 
      //   reward.amount, amt_bn.toString(), web3.utils.fromWei(amt_bn),
      //   web3.utils.fromWei(val_bn))

      const calc = usd * web3.utils.fromWei(reward.amount.toString())
      // console.log(parseFloat(calc).toLocaleString())


      uwu_supported_tokens[reward.token].price = usd;
      // uwu_supported_tokens[reward.token].rev = (usd * parseFloat(web3.utils.fromWei((reward.amount.toString())))).toLocaleString()
      uwu_supported_tokens[reward.token].rev = parseFloat(calc).toLocaleString()
      uwu_supported_tokens[reward.token].qty = parseFloat(web3.utils.fromWei((reward.amount.toString()))).toFixed(3).toLocaleString()


      return prv + (usd * reward.amount)
    }, 0)



    // COINBASE LOOKUPS:
    const val = await rewards.reduce(async (previousPromise, reward) => {
      let prv = await previousPromise;

      // get data:
      const u = uwu_supported_tokens[reward.token];
      if (u && u.cbapi_id){
        // get the price:
        const resp = await axios.get(`https://api.coinbase.com/v2/prices/${u.cbname}-USD/spot`, { 
          headers: {
          Authorization: 'Bearer abd90df5f27a7b170cd775abf89d632b350b7c1c9d53e08b340cd9832ce52c2c' //the token is a variable which holds the token
        }})

        console.log(u.cbname, resp.data.data.amount)

        const price = resp.data.data.amount;

        uwu_supported_tokens[reward.token].price = price;
        uwu_supported_tokens[reward.token].rev = (price * parseFloat(web3.utils.fromWei((reward.amount.toString())))).toLocaleString()
        uwu_supported_tokens[reward.token].qty = parseFloat(web3.utils.fromWei((reward.amount.toString()))).toFixed(3).toLocaleString()

        return prv + (price * reward.amount * 1.3661);
      }

      return prv + 0;
    }, Promise.resolve(0));

    console.log(val)
    revenue += val;




    // Load the sushi pool:
    const sushi_cnt = new web3.eth.Contract(contracts.sushi_pool.abi, contracts.sushi_pool.adr)
    const sushi_reserves = await sushi_cnt.methods.getReserves().call();

    const pool_eth_qty = sushi_reserves._reserve1;
    const pool_uwu_qty = sushi_reserves._reserve0;



    const pool_eth_val = web3.utils.fromWei(sushi_reserves._reserve1) * eth_price;
    // const pool_uwu_val = web3.utils.fromWei(pool_eth_val / sushi_reserves._reserve0);

    const uwu_price = pool_eth_val/web3.utils.fromWei(pool_uwu_qty);
    const pool_uwu_val = web3.utils.fromWei(sushi_reserves._reserve0) * uwu_price;

    // console.log(sushi_reserves)

    const pool_value = pool_eth_val + pool_uwu_val;


    let supply = await sushi_cnt.methods.totalSupply().call()
    supply = web3.utils.fromWei(supply);
    // console.log(supply)


    // console.log(pool_eth_val / supply)
    const slp_val = pool_eth_val / supply;


// console.log(pool_eth_val, pool_uwu_qty)
    
    const bal_pc = bal / supply;

    const my_pool_value = 
      (bal_pc * pool_uwu_qty * (pool_eth_val/pool_uwu_qty)) // uwu
      + web3.utils.fromWei((bal_pc * pool_eth_qty).toString()) * eth_price // eth

    // console.log(bals)
    setStaked(Object.assign({}, staked, {
      bal:        bal,
      eth_price:  parseFloat(eth_price).toLocaleString(),
      uwu_price:  parseFloat(pool_eth_val/web3.utils.fromWei(pool_uwu_qty)).toLocaleString(),
      //value:      parseFloat(slp_val * bal * 2).toLocaleString(),
      value:      parseFloat(my_pool_value).toLocaleString(),
      price_updated: d.toString(),
      rev:        parseFloat(web3.utils.fromWei(revenue.toString())).toLocaleString(),
      pool_pc:    bal_pc,
      bal_uwu:    parseFloat(web3.utils.fromWei((bal_pc * pool_uwu_qty).toString())).toLocaleString(),
      bal_eth:    parseFloat(web3.utils.fromWei((bal_pc * pool_eth_qty).toString())).toLocaleString(),
      //total:      parseFloat(web3.utils.fromWei(revenue.toString()) + my_pool_value).toLocaleString()
      total:      (parseFloat(web3.utils.fromWei(revenue.toString())) + parseFloat(my_pool_value)).toLocaleString()
      //,apr:        (new BN(53516693286 * 10**18)).toString()
    }))

    setPool(Object.assign({}, pool, {
      total_slp:    supply,
      total_slp_d:  parseFloat(supply).toLocaleString(),
      value:        pool_value,//pool_eth_val,
      value_d:      parseFloat(pool_value).toLocaleString(),//parseFloat(pool_eth_val).toLocaleString(),
      qty_eth:      parseFloat(web3.utils.fromWei(pool_eth_qty)).toLocaleString(),
      qty_uwu:      parseFloat(web3.utils.fromWei(pool_uwu_qty)).toLocaleString(),
    }))

  }

  React.useEffect(() => {
    console.log(staked)
  }, [staked])

  React.useEffect(() => {
    console.log(pool)
  }, [pool])


  const bgAnimate = () => {

  }

  return (
    <Container className="text-light">
      <Row className="mt-4">
        <Col xs={6}>
    
          {!web3 && (
          <Button variant="contained" onClick={connectSimple}>Connect Wallet</Button>
          )}

          {web3 && (
            <Button onClick={getStakeDetails}>
              <small>ETH:</small> <em>${staked.eth_price}</em>
              ,{' '} <small>UwU:</small> <em>${staked.uwu_price}</em>
            </Button>
          )}

        </Col>
        <Col xs={6} className="d-md-flex justify-content-md-end">
          <Button>{address}</Button>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col>
          <div className="display-3">UwU Lense</div>
        </Col>
      </Row>

      {web3 && (

        <>
          <Row className="mt-4">

            <Col md={5}>
              <Row>
                <Col>
                  <Card className={styles.panel}>
                    <Card.Body className="text-light">
                      <Card.Title className="text-center">Sushi Pool</Card.Title>
                      <Card.Text className="text-center">
                        <Row>
                          <Col>
                            <Stack>
                              <div className="text-muted">SLP Total</div>
                              <h4>{pool.total_slp_d}</h4>
                            </Stack>
                          </Col>
                          <Col>
                            <Stack>
                              <div className="text-muted">Pool Value</div>
                              <h4>$ {pool.value_d}</h4>
                            </Stack>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <Stack>
                              <div className="text-muted">UwU Qty</div>
                              <h4>{pool.qty_uwu}</h4>
                            </Stack>
                          </Col>
                          <Col>
                            <Stack>
                              <div className="text-muted">ETH Qty</div>
                              <h4>{pool.qty_eth}</h4>
                            </Stack>
                          </Col>
                        </Row>
                        

                        <Row className="mt-4 text-center">
                          <Col>
                            <h4><small className="text-muted">LP Token Price:</small> $ {((pool.value/pool.total_slp) || 0).toLocaleString()}</h4>
                          </Col>
                        </Row>


                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <Card className={styles.panel}>
                    <Card.Body className="text-light">
                      <Card.Title className="text-center">
                        <Stack>
                          <div className="text-muted">UwU-ETH LP Rewards APR</div>
                          <h4>{((930 / (pool.value/pool.total_slp)) || 0).toLocaleString()}%</h4>
                        </Stack>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col md={7}>
              <Card className={styles.panel}>
                <Card.Body className="text-light">
                  <Card.Title className="text-center">LP Stake</Card.Title>
                  <Card.Text>
                    <Row className="text-center">
                      <Col>
                        <Stack>
                          <div className="text-muted">UwU-ETH SLP</div>
                          <div><span className="h4">{staked.bal}</span> <small className="text-muted">({((staked.bal/pool.total_slp)*100).toLocaleString()}%)</small></div>
                          <small>{staked.bal_uwu}uwu + {staked.bal_eth}eth</small>
                        </Stack>
                      </Col>
                      <Col>
                        <Stack>
                          <div className="text-muted">LP Value</div>
                          <h4>$ {staked.value}</h4>
                        </Stack>
                      </Col>
                      <Col>
                        <Stack>
                          <div className="text-muted">Rewards</div>
                          <h4>$ {staked.rev}</h4>
                        </Stack>
                      </Col>
                    </Row>

                    <Row className="mt-4 text-center">
                      <Col>
                        <h4><small className="text-muted">Total:</small> $ {staked.total}</h4>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={{span:10, offset:1}}>
                        <hr />
                        <Card.Title className="text-center">Pending Rewards</Card.Title>
                        <Table className="text-light" borderless>
                          <thead>
                            <tr>
                              <th className="text-muted"></th>
                              <th className="text-muted">Price</th>
                              <th className="text-muted">Qty</th>
                              <th className="text-muted">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(uwu_supported_tokens).map(token => {
                              token = token[1]
                              return (
                                <tr>
                                  <td>{token.name}</td>
                                  <td>$ {token.price}</td>
                                  <td>{token.qty}</td>
                                  <td>$ {token.rev}</td>
                                </tr>
                                )
                            })}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>

          <Row className="my-4 text-muted">
            <Col>
              Last updated: {staked.price_updated}
            </Col>
          </Row>

        </>

      )}



    </Container>

  )
}
