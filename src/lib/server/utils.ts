import forge from 'node-forge';

const tokenFromUI = 'UjA%C*F-JaN7x!A%D*G-KamQeThWmZq4';

// Encrypt JSON
export function getEncrypt(Z: object) {
	// Generate random IV from strings
	const R = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz,./;'[]=-)(*&^%$#@!~`";
	const V = makeRandom(10, R);
	const tokenFromIV = makeRandom(16, R);

	const G = makeRandom(7, R);
	const key = tokenFromUI;
	const iv = tokenFromIV;

	console.log(key);
	console.log(iv);

	const data = forge.util.createBuffer(JSON.stringify(Z));

	// Encrypt
	const cipher = forge.cipher.createCipher('AES-CBC', key);
	cipher.start({ iv: iv });
	cipher.update(data);
	cipher.finish();
	const encryptedStr = forge.util.encode64(cipher.output.getBytes());

	const z = btoa(V + iv + G + encryptedStr);
	return z;
}

function makeRandom(Z, R) {
	let V = '';
	for (let G = 0; G < Z; G++) V += R.charAt(Math.floor(Math.random() * R.length));
	return V;
}

export function decryptResponse(Z: string) {
	// Decode base64 str
	const R = atob(Z);

	const iv = R.substring(10, 26);
	const encryptedB64Str = R.substring(33);
	const encryptedAes = forge.util.createBuffer(forge.util.decode64(encryptedB64Str));
	console.log(encryptedAes);

	// return i.AES.decrypt(B, j, {
	// 	keySize: 32,
	// 	iv: z,
	// 	mode: i.mode.CBC,
	// 	padding: i.pad.Pkcs7
	// }).toString(i.enc.Utf8);

	const decipher = forge.cipher.createDecipher('AES-CBC', tokenFromUI);
	decipher.start({ iv });
	decipher.update(encryptedAes);

	const success = decipher.finish(); // check 'result' for true/false
	if (!success) return { success, message: 'Error' };

	const message = forge.util.encodeUtf8(decipher.output.getBytes());
	return { success, message };
}
