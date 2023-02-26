import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Auth, regUser } from '../../store/slice/userSlice';
import { IUser } from '../../types/types';

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginCheck = useAppSelector((state) => state.userSlice.user);
  const [user, setUser] = useState<IUser>({
    login: '',
    email: '',
    pw: '',
    pwRepeat: '',
    token: 0,
  });
  const check = loginCheck.find((obj) => obj.login === user.login);
  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, login: e.target.value });
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, pw: e.target.value });
  };
  const onChangePwRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, pwRepeat: e.target.value });
  };
  const onClickReg = () => {
    dispatch(Auth(true));
    dispatch(regUser({ ...user, token: Date.now() }));
    navigate('/profile');
  };

  const mailValid: RegExpMatchArray | null = user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const regValid: boolean | null =
    user.login.length >= 3 && mailValid && user.pw.length >= 4 && user.pw === user.pwRepeat;
  return (
    <div className="max-w-screen-xl bg-pink-100 mx-auto py-5">
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <div className="mb-9 relative">
          {!check && user.login.length >= 3 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-0 stroke-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}

          <label className="inline-block w-20" htmlFor="login">
            login:
          </label>
          <input
            className="p-1"
            onChange={onChangeLogin}
            type="text"
            id="login"
            value={user.login}
          />
          {user.login.length <= 3 ? (
            <div className="mt-1 text-red-500 absolute">Короткий логин</div>
          ) : (
            check && <div className="mt-1 text-red-500 absolute">Логин занят</div>
          )}
        </div>
        <div className="mb-9 relative">
          {mailValid && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-0 stroke-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <label className="inline-block w-20" htmlFor="email">
            Email:
          </label>
          <input
            className="p-1"
            onChange={onChangeEmail}
            type="email"
            id="email"
            value={user.email}
          />
          {!mailValid && <div className="mt-1 text-red-500 absolute">Неверный email</div>}
        </div>
        <div className="mb-9 relative">
          {user.pw.length >= 4 && user.pw === user.pwRepeat && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-0 stroke-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <label className="inline-block w-20" htmlFor="pw">
            pw:
          </label>
          <input className="p-1" onChange={onChangePw} id="pw" type="text" value={user.pw}></input>
          {user.pw.length < 4 ? (
            <div className="mt-1 text-red-500 absolute">Короткий пароль</div>
          ) : user.pw === user.pwRepeat ? null : (
            <div className="mt-1 text-red-500 absolute">Пароли не совпадают</div>
          )}
        </div>
        <div className="mb-5 relative">
          {user.pw.length >= 4 && user.pw === user.pwRepeat && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-0 stroke-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <label className="inline-block w-20" htmlFor="pwrepeat">
            repeat pw:
          </label>
          <input
            className="p-1"
            onChange={onChangePwRepeat}
            type="text"
            id="pwrepeat"
            value={user.pwRepeat}
          />
        </div>
        <div>
          <button
            disabled={regValid ? false : true}
            onClick={onClickReg}
            className={`w-38 p-5 border border-black bg-green-200 ${
              regValid ? 'bg-green-200' : 'bg-gray-200'
            }`}>
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
