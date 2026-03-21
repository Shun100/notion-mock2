import { useState } from 'react';
import '../styles/pages/auth.css';
import { authRepository } from '../moudules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const signin = async () => {
    // ログイン処理
    const result = await authRepository.signin(email, password);

    if (!result) {
      console.error('ログインに失敗しました');
      return;
    }

    // ユーザ情報を保存 (Global State (Context))
    console.log(result);
    setUser(result.user);
    
    // トークンを保存 (Local Storage)
    localStorage.setItem('token', result.token);

    // Home画面に遷移
    navigate('/');
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <h2 className='auth-title'>Notionクローン</h2>
        <div className='auth-form-container'>
          <div className='auth-card'>
            <div className='auth-form'>
              <div>
                <label className='auth-label' htmlFor='email'>
                  メールアドレス
                </label>
                <div className='auth-input-container'>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    id='email'
                    name='email'
                    placeholder='メールアドレス'
                    required
                    type='email'
                    className='input-auth'
                  />
                </div>
              </div>
              <div>
                <label className='auth-label' htmlFor='password'>
                  パスワード
                </label>
                <div className='auth-input-container'>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    id='password'
                    name='password'
                    placeholder='パスワード'
                    required
                    type='password'
                    className='input-auth'
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={signin}
                  className='home-button'
                  style={{ width: '100%' }}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
