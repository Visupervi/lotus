import { ApiSendEmailCode } from '@/api/base.api'
import { ApiRegister, registerReq } from '@/api/user.api'
import { emailRule } from '@/utils'
import { Button, Form, Input, Space } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [codeLoading, setCodeLoading] = useState<boolean>(false)
  const [codeText, setCodeText] = useState('发送验证码')
  const navigate = useNavigate()
  const onFinish = async (values: registerReq) => {
    setLoading(true)
    try {
      const result = await ApiRegister(values)
      console.log(result)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const formRef = useRef(null)
  const [form] = Form.useForm<registerReq>()

  let setTime: NodeJS.Timer | undefined
  let time = 60

  const onSendCode = async () => {
    try {
      const res = await form.validateFields(['email'])
      console.log(res)
      setCodeLoading(true)
      const result = await ApiSendEmailCode(res)
      console.log(result)
      setTime = setInterval(() => {
        if (time < 1) {
          clearInterval(setTime)
          setTime = undefined
          setCodeText('发送验证码')
          time = 60
          setCodeLoading(false)
          return
        }
        setCodeText(`(${time})验证码已发送`)
        time = time - 1
      }, 1000)
    } catch (error) {
      setCodeLoading(false)
      console.log('error', error)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onBack = () => {
    navigate(-1)
  }

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-9 left-9 text-indigo-600 cursor-pointer" onClick={onBack}>
        <LeftOutlined rev={undefined} />
        去登录
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <img className="h-10 w-auto" src="/public/tauri.svg" alt="Your Company" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录您的帐户</h2>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            name="basic"
            layout="vertical"
            form={form}
            ref={formRef}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="昵称" name="userName" rules={[{ required: true, message: '请输入昵称!' }]}>
              <Input placeholder="昵称" />
            </Form.Item>
            <Form.Item
              label="账号"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱账号!'
                },
                emailRule
              ]}
            >
              <Input placeholder="账号" />
            </Form.Item>
            <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入邮箱验证码!' }]}>
              <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="验证码" />
                <Button onClick={onSendCode} loading={codeLoading}>
                  {codeText}
                </Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item className="pt-4">
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
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
