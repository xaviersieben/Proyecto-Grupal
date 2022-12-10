import { useLogin } from "./useLogin";
import Login from "./Login";

const LoginModal = () => {
  const [modalOpen,openLogin,closeLogin] = useLogin(false)
  return (
    <div>
      
      <button onclick={openLogin}>Login</button>
      <Login modalOpen={modalOpen} closeLogin={closeLogin}>
        <h3>LogIn</h3>
        
        
      </Login>
    </div>
  )
}

export default LoginModal