import { ApiLogin, loginReq } from '@/api/user.api'
import { saveUser } from '@/store/user'
import { emailRule } from '@/utils'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const onFinish = async (values: loginReq) => {
    setLoading(true)
    const res = await ApiLogin(values)
    saveUser(res.data)
    navigate('/chat')
    setLoading(false)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <img className="h-10 w-auto" src="/public/tauri.svg" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录您的帐户</h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="账号" name="email" rules={[{ required: true, message: '请输入邮箱账号!' }, emailRule]}>
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="primary"
                loading={loading}
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            没有账号？
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              前去注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
