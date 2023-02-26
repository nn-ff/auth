import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Auth, FindUser } from '../../store/slice/userSlice';

interface IAuth {
  login: string;
  pass: string;
}

const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const current = useAppSelector((state) => state.userSlice.current);
  const users = useAppSelector((state) => state.userSlice.user);
  const [auth, setAuth] = React.useState<IAuth>({
    login: '',
    pass: '',
  });
  const onChangeLog = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, login: e.target.value });
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, pass: e.target.value });
  };
  const onClickLogin = () => {
    // dispatch(authUser(auth.login));
    dispatch(FindUser({ login: auth.login, pw: auth.pass }));
    if (check) {
      dispatch(Auth(true));
      navigate(location.state?.from?.pathname || '/profile');
    } else {
      alert('Данные не верны!');
    }
  };
  const check = users.find((obj) => obj.login === auth.login && obj.pw === auth.pass);
  const verify = auth.login === 'developer21' && Number(auth.pass) === 123456;
  return (
    <div className="max-w-screen-xl bg-pink-100 mx-auto py-5 flex flex-col items-center">
      <div>
        <label className="inline-block w-20 m-5" htmlFor="login">
          Login:
        </label>
        <input
          onChange={onChangeLog}
          value={auth.login}
          id="login"
          name="login"
          className="p-1 border border-black"
          type="text"
        />
      </div>
      <div>
        <label className="inline-block w-20 m-5" htmlFor="pw">
          PW:
        </label>
        <input
          onChange={onChangePw}
          value={auth.pass}
          id="pw"
          name="pw"
          className="p-1 border border-black"
          type="text"
        />
      </div>
      <div>
        <button onClick={onClickLogin} className={`w-60 p-1 m-5 border border-black bg-green-300`}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default Main;
