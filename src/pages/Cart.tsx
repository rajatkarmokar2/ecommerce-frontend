import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Paper,
  Group,
  Text,
  Button,
  Image,
  Stack,
  Divider,
  Center,
  Badge,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAppDispatch } from "../store/store";
import {
  clearCart as clearReduxCart,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import {
  useDeleteCartClearMutation,
  useGetCartQuery,
  usePatchCartItemMutation,
} from "../store/api/generatedApi";

const PLACEHOLDER = "https://placehold.co/100x100?text=No+Image";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, refetch } = useGetCartQuery();
  const [updateCart] = usePatchCartItemMutation();
  const [clearCart] = useDeleteCartClearMutation();

  const apiCartItems = data?.cart?.items;

  // Normalize cart items format
  const cartItems = apiCartItems?.map((item: any) => ({
    id: item._id || item.id,
    productId: item.product?._id || item.productId || item.product,
    name: item.product?.name || item.name || "Product",
    price: item.product?.price ?? item.price ?? 0,
    image: item.product?.image || item.image || PLACEHOLDER,
    quantity: item.quantity || 1,
  }));

  const totalAmount = cartItems?.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    dispatch(updateQuantity({ productId, quantity: newQuantity }));

    try {
      await updateCart({
        body: { productId: productId, quantity: newQuantity },
      }).unwrap();
      refetch();
    } catch (err) {
      console.log("Updated locally");
    }
  };

  const handleRemove = async (id: string, productId: string) => {
    dispatch(removeFromCart(productId));

    try {
      await updateCart({ body: { productId: id, quantity: 0 } }).unwrap();
      refetch();
      notifications.show({
        title: "Item Removed",
        message: "Item removed from cart.",
        color: "blue",
      });
    } catch (err) {
      notifications.show({
        title: "Item Removed",
        message: "Item removed from cart.",
        color: "blue",
      });
    }
  };

  const handleClear = async () => {
    dispatch(clearReduxCart());

    try {
      await clearCart().unwrap();
      refetch();
    } catch (err) {
      // Ignored if local
    }

    notifications.show({
      title: "Cart Cleared",
      message: "Your cart has been emptied.",
      color: "blue",
    });
  };

  if (isLoading && !apiCartItems?.length) {
    return (
      <Center style={{ minHeight: 320 }}>
        <Loader />
      </Center>
    );
  }

  if (isError && !cartItems?.length) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Text c="red" mb="md">
            Failed to load cart from server.
          </Text>
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Title order={3}>Your cart is empty 🛒</Title>
            <Text c="dimmed">Add products to continue shopping.</Text>
            <Button onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2}>Your Cart</Title>
            <Text c="dimmed">{cartItems.length} item(s) in your cart</Text>
          </div>
          <Button color="red" variant="outline" onClick={handleClear}>
            Clear Cart
          </Button>
        </Group>

        <Stack gap="md">
          {cartItems.map((item: any) => (
            <Paper
              key={item.id || item.productId}
              shadow="xs"
              radius="md"
              p="md"
              withBorder
            >
              <Group align="center" gap="md" wrap="nowrap">
                <Image
                  src={item.image}
                  alt={item.name}
                  radius="md"
                  w={96}
                  h={96}
                  fit="cover"
                  onError={(event) => {
                    event.currentTarget.src = PLACEHOLDER;
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={600} truncate="end">
                    {item.name}
                  </Text>
                  <Text c="dimmed">₹{item.price} each</Text>
                </div>

                <Group gap="xs">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Text fw={500} px="xs">
                    {item.quantity}
                  </Text>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </Group>

                <div style={{ textAlign: "right" }}>
                  <Text fw={700}>₹{item.price * item.quantity}</Text>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={() => handleRemove(item.id, item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>

        <Paper shadow="xs" radius="md" p="lg" withBorder>
          <Group justify="space-between" align="center">
            <Text fw={700} size="lg">
              Total
            </Text>
            <Badge size="lg" color="green" variant="light">
              ₹{totalAmount}
            </Badge>
          </Group>

          <Divider my="md" />

          <Group gap="md" grow>
            <Button variant="outline" onClick={handleClear}>
              Clear Cart
            </Button>
            <Button onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Cart;
