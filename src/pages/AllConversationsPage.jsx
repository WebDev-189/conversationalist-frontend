import { useState, useEffect } from "react"
// import axios from "axios"
import myApi from "./../service/service.js"
import { Link } from "react-router-dom"
function AllConversationsPage() {
	const [conversations, setConversations] = useState(null)

	async function fetchConversations() {
		try {
			const response = await myApi.get("/conversation")
			setConversations(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchConversations()
	}, [])

	if (!conversations) {
		return <p>Loading...</p>
	}
	if (conversations.length === 0) {
		return <p>Let's communicate</p>
	}
	return (
		<>
			{conversations.map((conversation) => {
				return (
					<Link
						to={`/conversations/${conversation._id}`}
						key={conversation._id}>
						{" "}
						Conversation between{" "}
						{conversation.participants
							.map((participant) => participant.username)
							.join(", ")}
					</Link>
				)
			})}
		</>
	)
}

export default AllConversationsPage
