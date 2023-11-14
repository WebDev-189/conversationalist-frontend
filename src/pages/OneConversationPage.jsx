import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useParams } from "react-router-dom"
import myApi from "./../service/service.js"
import Avatar from "../components/Avatar/Avatar.jsx"

function OneConversationPage() {
	const [messages, setMessages] = useState(null)
	const [message, setMessage] = useState("")
	const { id } = useParams()
	const { user } = useAuth()

	async function fetchOneConversation() {
		try {
			const response = await myApi.get(`/messages/${id}`)
			setMessages(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchOneConversation()
	}, [id])

	const handleSendMessage = async () => {
		try {
			const res = await myApi.post("/messages/" + id, { message })
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}
	const handleDelete = async (id) => {
		try {
			const res = await myApi.delete("/messages/" + id)
			await fetchOneConversation()
		} catch (error) {
			console.log(error)
		}
	}

	if (!messages) {
		return <p>Loading...</p>
	}
	return (
		<>
			{messages.map((message) => {
				const isMe = message.creator._id === user._id
				const side = isMe ? "marginLeft" : "marginRight"
				console.log(message.creator)
				return (
					<React.Fragment key={message._id}>
						<div>
							<Avatar size="s" url={message.creator.picture} />
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}>
							<p>{message.content} </p>
							{isMe && <div onClick={() => handleDelete(message._id)}>🗑️</div>}
						</div>
					</React.Fragment>
				)
			})}

			<textarea
				name=""
				id=""
				cols="30"
				rows="10"
				value={message}
				onChange={(e) => setMessage(e.target.value)}></textarea>
			<button onClick={handleSendMessage}>Send message</button>
		</>
	)
}

export default OneConversationPage
