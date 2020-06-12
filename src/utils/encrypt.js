import CryptoJS from 'crypto-js';

// 加密解密
const key = ' 4BB90812C2B9B0882A6FA7C203E4717F';

export const getKey = key => {
  return CryptoJS.SHA1(CryptoJS.SHA1(key))
    .toString()
    .substring(0, 32);
};

export const encrypt = data => {
  const encrypt = CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Hex.parse(getKey(key)),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return encrypt.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decrypt = (data, key) => {
  const decrypt = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(data)
    },
    CryptoJS.enc.Hex.parse(getKey(key)),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return decrypt.toString(CryptoJS.enc.Utf8);
};
