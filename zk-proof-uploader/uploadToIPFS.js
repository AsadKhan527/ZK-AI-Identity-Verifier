const axios = require('axios');
require('dotenv').config();

const proof = {
  proof: {
    a: [
      "0x1b70f012838719a03933ef3df655a5068c0a1f9660ea658cd59b0718e82c7923",
      "0x045235ffb7c618352b1b7ab62744539182354105b3be4d5b12540911313677f6"
    ],
    b: [
      [
        "0x199c10890c34722d6b7997944e2dfe427cabe2decf6dd3b6069b22648a99613a",
        "0x1243e046337bdfbdd9cd7477d73b4e1125f7778401e0c2e908c89cdab7c39bfe"
      ],
      [
        "0x0d5d461ffad7274db6f4720e2756512e07d501e89d29c418ada6fdccaeb5a7c5",
        "0x17228ca0bb36c107533e42b806fcf51c57b119087206e15e33c6d04257d9b44c"
      ]
    ],
    c: [
      "0x14b8548c5ee7b25baa4d2f3052087a0d4278ad41a5413a7d38e1a8977b5526fd",
      "0x1a54afcadf3bc39bd5d16b33571ca6f847b67b3ea626de6180af04aaa9d391ed"
    ]
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ]
};

async function uploadToIPFS() {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const res = await axios.post(url, proof, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
      }
    });

    console.log("✅ Proof uploaded to IPFS!");
    console.log("🔗 CID:", res.data.IpfsHash);
    console.log("🌍 Gateway URL: https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash);
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
  }
}

uploadToIPFS();
