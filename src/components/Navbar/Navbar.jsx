import { Link, NavLink } from "react-router-dom"
import SpanifiedTitle from "../SpanifiedTitle/SpanifiedTitle"
import Avatar from "../Avatar/Avatar"
import "./Navbar.css"
import { useAuth } from "./../../context/AuthContext"

function Navbar() {
	const { isLoggedIn, authenticateUser, user } = useAuth()

	const handleLogout = () => {
		localStorage.removeItem("authToken")
		authenticateUser()
	}

	const title = user ? `Hello ${user.username}` : "conversationalist"
	console.log(user)
	return (
		<div className="Navbar">
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					{isLoggedIn && user && (
						<>
							<Avatar size="m" url={user.picture} />
						</>
					)}
					<li>
						<NavLink to="/about">About</NavLink>
					</li>
				</ul>
			</nav>
			<Link to="/">
				<SpanifiedTitle title={title} />
			</Link>
			<nav>
				<ul>
					{isLoggedIn ? (
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<>
							<li>
								<NavLink to="/login">Login</NavLink>
							</li>
							<li>
								<NavLink to="/signup">Signup</NavLink>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
