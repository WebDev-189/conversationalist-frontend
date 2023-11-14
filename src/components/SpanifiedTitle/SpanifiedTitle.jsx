import SpanLetter from "./SpanLetter"
import "./Spanified.css"

function SpanifiedTitle({ title }) {
	const titleAsArray = title.split("")
	return (
		<h1 className="SpanifiedTitle">
			{titleAsArray.map((letter, i) => (
				<SpanLetter
					key={i}
					delay={(i + 1) * 125}
					interval={50}
					letter={letter}
				/>
			))}
		</h1>
	)
}

export default SpanifiedTitle
