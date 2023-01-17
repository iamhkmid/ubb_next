import crypto from "crypto"

const PUBLIC_KEY = process.env.PUBLIC_KEY as string
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

export const encryptRSA = (text: string) => {
  const encrypted = crypto.publicEncrypt(
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(text, "utf8")
  );
  return encrypted.toString("base64");
}

export const decryptRSA = (encryptedText: string) => {
  const decrypted = crypto.privateDecrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(encryptedText, "base64")
  );
  return decrypted.toString("utf-8");
}

// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   // The standard secure default length for RSA keys is 2048 bits
//   modulusLength: 2048,
// });

// console.log(
// 	publicKey.export({
// 		type: "pkcs1",
// 		format: "pem",
// 	}),

// 	privateKey.export({
// 		type: "pkcs1",
// 		format: "pem",
// 	})
// )
