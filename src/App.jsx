import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import AllConversationsPage from "./pages/AllConversationsPage"
import OneConversationPage from "./pages/OneConversationPage"
import HomePage from "./pages/HomePage"
// Navigation
import LoggedOutUser from "./navigation/LoggedOutUser"
import LoggedInUser from "./navigation/LoggedInUser"
import AdminRoute from "./navigation/AdminRoute"

import Layout from "./layouts/Layout"
import ConversationLayout from "./layouts/ConversationLayout"
import AboutPage from "./pages/AboutPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"

function App() {
	// const [user, setUser] = useState(null)

	// useEffect(() => {
	// 	axios
	// 		.get("http://localhost:5005/api/auth/verify", {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			console.log("success")
	// 			console.log(res)
	// 		})
	// 		.catch((error) => console.log(error))
	// }, [])

	return (
		<>
			<div className="App">
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						{/* The conversations routes should be accessible only if a user */}
						{/* is Logged in */}
						<Route element={<LoggedInUser />}>
							<Route path="/conversations" element={<ConversationLayout />}>
								<Route path=":id" element={<OneConversationPage />} />
							</Route>
						</Route>
						{/* Login / Signup routes should be accessible to Logged out users */}

						<Route element={<LoggedOutUser />}>
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/login" element={<LoginPage />} />
						</Route>
						<Route element={<AdminRoute />}>
							<Route path="/secret" element={<h1>Shhhhhh.....</h1>} />
						</Route>
						<Route path="*" element={<h2>Error page</h2>} />
					</Route>
				</Routes>
			</div>
		</>
	)
}

export default App
