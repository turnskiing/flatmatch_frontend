export const getAge = (dob: Date): number => {
	if (dob) {
		const msDifference = Date.now() - dob.getTime()
		const ageDate = new Date(msDifference) // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970)
	}
	return 18
}