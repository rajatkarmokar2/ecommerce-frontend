import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/store";
import { Container, Paper, Title, TextInput, PasswordInput, Button, Stack, Text, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { usePostAuthLoginMutation } from "../store/api/generatedApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = usePostAuthLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res: any = await login({ body: form }).unwrap();
      const userData = res.data || res.user || res;
      const token = res.token || res.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      dispatch(setUser(userData));

      notifications.show({
        title: "Welcome Back!",
        message: "Logged in successfully.",
        color: "green",
      });

      navigate("/");
    } catch (err: any) {
      const msg = err?.data?.message || "Login failed. Please check your credentials.";
      setErrorMsg(msg);
      notifications.show({
        title: "Login Failed",
        message: msg,
        color: "red",
      });
    }
  };

  return (
    <Container size="xs" py="xl">
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Stack gap="md">
          <Title order={2} style={{ textAlign: "center" }}>
            Login
          </Title>

          {errorMsg && (
            <Text color="red" size="sm" style={{ textAlign: "center" }}>
              {errorMsg}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" fullWidth loading={isLoading}>
                Login
              </Button>
            </Stack>
          </form>

          <Center>
            <Text size="sm">
              Don’t have an account?{' '}
              <Text component="span" variant="link" c="blue" style={{ cursor: 'pointer' }} onClick={() => navigate("/register")}>Register</Text>
            </Text>
          </Center>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
