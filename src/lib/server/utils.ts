import forge from 'node-forge';

const tokenFromUI = 'UjA%C*F-JaN7x!A%D*G-KamQeThWmZq4';

// Encrypt JSON
export function getEncrypt(Z: object) {
	// Generate random IV from strings
	const R = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz,./;'[]=-)(*&^%$#@!~`";
	const V = 'D/V/r2IlW2' || makeRandom(10, R);
	const tokenFromIV = makeRandom(16, R);

	const G = ']`n.b`P' || makeRandom(7, R);
	const key = tokenFromUI;
	const iv = "u'!`'C*RWW=YsoAe" || tokenFromIV;

	console.log(key);
	console.log(iv);

	const data = forge.util.createBuffer(JSON.stringify(Z));

	// Encrypt
	const cipher = forge.cipher.createCipher('AES-CBC', key);
	cipher.start({ iv: iv });
	cipher.update(data);
	cipher.finish();
	const encryptedStr = forge.util.encode64(cipher.output.getBytes());
	console.log(encryptedStr);

	const z = btoa(V + iv + G + encryptedStr);
	return z;
}

function makeRandom(Z, R) {
	let V = '';
	for (let G = 0; G < Z; G++) V += R.charAt(Math.floor(Math.random() * R.length));
	return V;
}

// function decryptResponse(Z) {
// 	const R = atob(Z);
// 	G = R.substring(0, 10);
// 	R.substring(10, 26);
// 	B = R.substring(26, 33);
// 	R.substring(33);
// 	let j = i.enc.Utf8.parse(this.tokenFromUI);
// 	z = i.enc.Utf8.parse(G);

// 	return i.AES.decrypt(B, j, {
// 		keySize: 32,
// 		iv: z,
// 		mode: i.mode.CBC,
// 		padding: i.pad.Pkcs7
// 	}).toString(i.enc.Utf8);
// }
