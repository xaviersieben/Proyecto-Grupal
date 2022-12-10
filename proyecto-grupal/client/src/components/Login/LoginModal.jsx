import { useLogin } from "./useLogin";
import Login from "./Login";

const LoginModal = () => {
  const [modalOpen,openLogin,closeLogin] = useLogin(false)
  return (
    <div>
      
      <button onclick={modalOpen}>Login</button>
      <Login modalOpen={openLogin} closeLogin={closeLogin}>
        <h3>LogIn</h3>
        
        <img src="https://placeimg.com/400/400/animals" alt="Heros" />
      </Login>
    </div>
  )
}

export default LoginModal