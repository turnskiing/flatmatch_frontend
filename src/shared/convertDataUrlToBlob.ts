export const convertDataUrlToBlob = (dataUrl: string, mime: string): Blob => {
	const bstr = atob(dataUrl)
	let n = bstr.length
	const u8arr = new Uint8Array(n)

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}

	return new Blob([u8arr], { type: mime })
}