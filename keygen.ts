import { Keypair, Connection, LAMPORTS_PER_SOL} from '@solana/web3.js'
import bs58 from 'bs58'
import * as prompt from 'prompt-sync'
import wallet from "./dev-wallet.json"

let kp = Keypair.generate()

console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)

console.log(`Here's your PK: [${kp.secretKey}]`)

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection('https://api.devnet.solana.com');

(async () => {
  try {
// We're going to claim 2 devnet SOL token
      const txhash = await
connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
      console.log(`Success! Check out your TX here:
      https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch(e) {
      console.error(`Oops, something went wrong: ${e}`)
  }
})()