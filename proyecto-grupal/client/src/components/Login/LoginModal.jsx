import { useLogin } from "./useLogin";
import Login from "./Login";
import "./LoginModal.css"

const LoginModal = () => {
  const [modalOpen, openLogin, closeLogin] = useLogin(false);
  return (
    <div>
      <button onClick={openLogin} className="btns">Login</button>
      <Login modalOpen={modalOpen} closeLogin={closeLogin}/>
        
    </div>
  );
};

export default LoginModal;
