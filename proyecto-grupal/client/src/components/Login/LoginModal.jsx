import { useLogin } from "./useLogin";
import Login from "./Login";

const LoginModal = () => {
  const [modalOpen,openLogin, closeLogin] = useLogin(false)
  return (
    <div>
      <h2>Modales</h2>
      <button>Login</button>
      <Login>
        <h3>LogIn</h3>
        <p>Ingrese datos de ingreso</p>
        <img src="https://placeimg.com/200/200/heros" alt="Heros" />
      </Login>
    </div>
  )
}

export default LoginModal