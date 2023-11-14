import { useState, useEffect } from "react"
import myApi from "./../service/service.js"
import { Outlet, Link } from "react-router-dom"
import { useAuth } from "./../context/AuthContext"
function ConversationLayout() {
	const [allConvos, setAllConvos] = useState(null)
	const { user } = useAuth()

	const fetchAllConvos = async () => {
		try {
			const res = await myApi.get("/conversation")
			setAllConvos(res.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchAllConvos()
	}, [])
	if (!allConvos) {
		return <p>Loading...</p>
	}

	console.log(allConvos)
	return (
		<div>
			<div
				style={{
					width: "10rem",
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
					position: "absolute",
					left: "2rem",
				}}>
				{allConvos.map((conv) => {
					const participant = conv.participants.find(
						(userEl) => userEl.username !== user.username
					)
					return (
						<Link key={conv._id} to={`/conversations/${conv._id}`}>
							Conversation between you and {participant.username}
						</Link>
					)
				})}
			</div>
			<Outlet />
		</div>
	)
}

export default ConversationLayout
