import { useState, useEffect, useRef } from "react"
import myApi from "./../../service/service.js"
function UserDisplayer() {
	const [allUsers, setAllUsers] = useState(null)
	const [selectedUser, setSelectedUser] = useState("")
	const [error, setError] = useState("")

	const fetchAllUsers = async () => {
		try {
			const response = await myApi.get("/users")
			setAllUsers(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchAllUsers()
	}, [])

	async function handleClick() {
		console.log(selectedUser)
		const user = allUsers.find((user) => user.username === selectedUser)
		try {
			const response = await myApi.post("/conversation", { id: user._id })
			console.log("success", response)
			setError("Conversation created")
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	if (!allUsers) {
		return <p>Loading...</p>
	}
	return (
		<div>
			{/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
			<p>{error}</p>
			<input
				type="text"
				list="all-users"
				value={selectedUser.username}
				onChange={(e) => {
					console.log(e.target.dataset)
					setSelectedUser(e.target.value)
				}}
			/>
			<datalist id="all-users">
				{allUsers.map((user) => (
					<option key={user._id} value={user.username}>
						{user.username}
					</option>
				))}
			</datalist>

			<button onClick={handleClick}>Create conversation</button>
		</div>
	)
}

export default UserDisplayer
