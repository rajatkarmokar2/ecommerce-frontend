import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/store";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { usePostAuthRegisterMutation } from "../store/api/generatedApi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = usePostAuthRegisterMutation();

  const [form, setForm] = useState({
    name: "",
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
      const res: any = await register({ body: form }).unwrap();
      const userData = res.data || res.user || res;
      const token = res.token || res.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      dispatch(setUser(userData));

      notifications.show({
        title: "Account Created!",
        message: "Welcome to MyShop! Your account has been created.",
        color: "green",
      });

      navigate("/");
    } catch (err: any) {
      const msg = err?.data?.message || "Registration failed. Please try again.";
      setErrorMsg(msg);
      notifications.show({
        title: "Registration Failed",
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
            Register
          </Title>

          {errorMsg && (
            <Text c="red" size="sm" style={{ textAlign: "center" }}>
              {errorMsg}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
              <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <Button type="submit" fullWidth loading={isLoading}>
                Register
              </Button>
            </Stack>
          </form>

          <Center>
            <Text size="sm">
              Already have an account?{" "}
              <Text
                component="span"
                variant="link"
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Text>
            </Text>
          </Center>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Register;
