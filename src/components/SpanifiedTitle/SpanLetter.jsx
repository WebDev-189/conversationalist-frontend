import { useState, useEffect } from "react"
import { getRandomNumber } from "../../utils/utils.js"

function SpanLetter({ letter, delay, interval }) {
	const [hue, setHue] = useState(getRandomNumber)
	useEffect(() => {
		setTimeout(() => {
			setHue((curr) => (curr + 1) % 360)
			setInterval(() => {
				setHue((curr) => (curr + 1) % 360)
			}, interval)
		}, delay)
	}, [])
	return <span style={{ color: `hsl(${hue}, 60%, 50%)` }}>{letter}</span>
}

export default SpanLetter
