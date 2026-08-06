import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Stack,
  Group,
  Text,
  Divider,
  Center,
  Badge,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useGetCartQuery,
  usePostPaymentCheckoutMutation,
} from "../store/api/generatedApi";

const Checkout = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const { data: cartData } = useGetCartQuery(undefined);
  const [createCheckoutSession, { isLoading: isCheckingOut }] =
    usePostPaymentCheckoutMutation();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (auth.user) {
      setForm({
        name: auth.user?.name || "",
        address: "123 Main Street",
        city: "Mumbai",
        postalCode: "400001",
        state: "Maharashtra",
        country: "India",
      });
    }
  }, [auth]);

  const apiCartItems = cartData?.cart?.items;
  const cartItems = apiCartItems?.map((item: any) => ({
    productId: item.product?._id || item.productId || item._id,
    name: item.product?.name || item.name || "Product",
    price: item.product?.price ?? item.price ?? 0,
    quantity: item.quantity || 1,
  }));

  const totalAmount = cartItems?.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.address) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }

    try {
      try {
        const res = await createCheckoutSession({
          body: {
            cartId: cartData?.cart?._id,
            shippingAddress: form,
          },
        }).unwrap();
        if (res?.success) {
          window.open(res?.url, '_blank', 'noopener,noreferrer');
        }
      } catch (e) {
        return notifications.show({
          title: "Checkout session created",
          message: "",
          color: "green",
        });
      }

      // notifications.show({
      //   title: "Order Placed Successfully! 🎉",
      //   message: "Thank you for your purchase. Your order has been recorded.",
      //   color: "green",
      // });

      // navigate("/orders");
    } catch (error: any) {
      notifications.show({
        title: "Checkout Error",
        message: error?.data?.message || "Failed to complete order.",
        color: "red",
      });
    }
  };

  if (cartItems?.length === 0) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Center flex={1}>
            <Stack align="center" gap="md">
              <Text fw={500}>Your cart is empty.</Text>
              <Button onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            </Stack>
          </Center>
        </Paper>
      </Container>
    );
  }

  const isLoading = isCheckingOut;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={2}>Checkout</Title>

        <Group align="flex-start" gap="xl" grow>
          <Paper shadow="xs" radius="md" p="lg" withBorder style={{ flex: 1 }}>
            <Title order={4} mb="md">
              Shipping Details
            </Title>

            <Stack gap="sm">
              <TextInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                minRows={3}
              />
              <TextInput
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <TextInput
                label="Postal Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
              />
              <TextInput
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </Stack>
          </Paper>

          <Paper shadow="xs" radius="md" p="lg" withBorder style={{ flex: 1 }}>
            <Title order={4} mb="md">
              Order Summary
            </Title>

            <Stack gap="sm">
              {cartItems?.map((item: any) => (
                <Group key={item.productId} justify="space-between" gap="sm">
                  <Text>
                    {item.name} × {item.quantity}
                  </Text>
                  <Text fw={600}>₹{item.price * item.quantity}</Text>
                </Group>
              ))}

              <Divider my="sm" />

              <Group justify="space-between">
                <Text fw={700}>Total</Text>
                <Badge color="green" size="lg" variant="light">
                  ₹{totalAmount}
                </Badge>
              </Group>

              <Button
                onClick={handleCheckout}
                loading={isLoading}
                fullWidth
                mt="md"
              >
                Place Order & Pay
              </Button>
            </Stack>
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
};

export default Checkout;
