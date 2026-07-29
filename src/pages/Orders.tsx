import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Paper,
  Group,
  Text,
  Badge,
  Button,
  Image,
  Stack,
  Divider,
  Center,
  Loader,
  Modal,
} from "@mantine/core";
import {
  useGetOrdersQuery,
  usePostPaymentCheckoutMutation,
} from "../store/api/generatedApi";
import { notifications } from "@mantine/notifications";

const PLACEHOLDER = "https://placehold.co/80x80?text=No+Image";

const Orders = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [createCheckoutSession] = usePostPaymentCheckoutMutation();

  const orders = data?.data || [];

  const getBaseApiUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    return envUrl.endsWith("/api") || envUrl.includes("/api/")
      ? envUrl
      : `${envUrl}/api`;
  };

  const handleInvoiceDownload = (orderId: string) => {
    const invoiceUrl = `${getBaseApiUrl()}/invoice/${orderId}`;
    window.open(invoiceUrl, "_blank");
  };

  const onRepay = async (orderId: string) => {
    // 2. Initiate payment session
    try {
      const res = await createCheckoutSession({
        body: {
          orderId,
        },
      }).unwrap();
      if (res?.success) {
        window.location.href = res?.url;
      }
    } catch (e) {
      return notifications.show({
        title: "Checkout session created",
        message: "",
        color: "green",
      });
    }
  };

  if (isLoading) {
    return (
      <Center style={{ minHeight: 350 }}>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text c="red" mb="md">
            Failed to load orders.
          </Text>
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Title order={3}>No Orders Found 📦</Title>
            <Text c="dimmed">You haven't placed any orders yet.</Text>
            <Button onClick={() => navigate("/products")}>Shop Now</Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={2}>My Orders</Title>

        <Stack gap="lg">
          {orders.map((order: any) => {
            const items = order.items || [];
            const total = order.totalAmount ?? order.total ?? 0;
            const status = order.status || "pending";
            const dateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Recent";

            return (
              <Paper
                key={order._id || order.id}
                shadow="sm"
                radius="md"
                p="lg"
                withBorder
              >
                {/* Header */}
                <Group justify="space-between" align="center" mb="md">
                  <div>
                    <Text size="sm" c="dimmed">
                      Order ID: {order._id || order.id}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Placed on: {dateStr}
                    </Text>
                  </div>

                  <Badge
                    color={
                      status === "delivered"
                        ? "green"
                        : status === "pending"
                          ? "yellow"
                          : status === "processing"
                            ? "blue"
                            : "gray"
                    }
                    variant="light"
                  >
                    {status.toUpperCase()}
                  </Badge>
                </Group>

                <Divider mb="md" />

                {/* Items */}
                <Stack gap="sm">
                  {items.map((item: any, idx: number) => {
                    const product = item.product || {};
                    const name = product.name || item.name || "Product";
                    const image = product.image || item.image || PLACEHOLDER;
                    const price = item.price ?? product.price ?? 0;
                    const quantity = item.quantity || 1;

                    return (
                      <Group
                        key={product._id || idx}
                        justify="space-between"
                        align="center"
                        wrap="nowrap"
                      >
                        <Group gap="sm" wrap="nowrap">
                          <Image
                            src={image}
                            alt={name}
                            w={50}
                            h={50}
                            radius="xs"
                            fit="cover"
                            onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                          />
                          <div>
                            <Text size="sm" fw={500}>
                              {name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              Qty: {quantity}
                            </Text>
                          </div>
                        </Group>
                        <Text size="sm" fw={600}>
                          ₹{price * quantity}
                        </Text>
                      </Group>
                    );
                  })}
                </Stack>

                <Divider my="md" />

                {/* Footer */}
                <Group justify="space-between" align="center">
                  <Text fw={700} size="md">
                    Total: ₹{total}
                  </Text>

                  <Group gap="xs">
                    <Button
                      variant="light"
                      size="xs"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      color="green"
                      size="xs"
                      onClick={() =>
                        handleInvoiceDownload(order._id || order.id)
                      }
                    >
                      Invoice 📄
                    </Button>
                    <Button
                      variant="outline"
                      color="blue"
                      size="xs"
                      onClick={() => onRepay(order._id || order.id)}
                    >
                      Re-Pay
                    </Button>
                  </Group>
                </Group>
              </Paper>
            );
          })}
        </Stack>
      </Stack>

      {/* Order Details Modal */}
      <Modal
        opened={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={
          <Text fw={700}>
            Order Details ({selectedOrder?._id || selectedOrder?.id})
          </Text>
        }
        size="lg"
      >
        {selectedOrder && (
          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm">
                Status: <Badge color="blue">{selectedOrder.status}</Badge>
              </Text>
              <Text size="sm">
                Date:{" "}
                {selectedOrder.createdAt
                  ? new Date(selectedOrder.createdAt).toLocaleString()
                  : "N/A"}
              </Text>
            </Group>

            {selectedOrder.shippingAddress && (
              <Paper p="xs" withBorder radius="xs">
                <Text size="xs" fw={700} mb={4}>
                  Shipping Address
                </Text>
                <Text size="xs">{selectedOrder.shippingAddress.address}</Text>
                <Text size="xs">
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.postalCode}
                </Text>
                <Text size="xs">{selectedOrder.shippingAddress.country}</Text>
              </Paper>
            )}

            <Text size="sm" fw={600}>
              Items
            </Text>
            <Stack gap="xs">
              {(selectedOrder.items || []).map((item: any, idx: number) => (
                <Group key={idx} justify="space-between">
                  <Text size="sm">
                    {item.product?.name || item.name || "Product"} ×{" "}
                    {item.quantity}
                  </Text>
                  <Text size="sm" fw={600}>
                    ₹{(item.price || item.product?.price || 0) * item.quantity}
                  </Text>
                </Group>
              ))}
            </Stack>

            <Divider />

            <Group justify="space-between">
              <Text fw={700}>Total Amount</Text>
              <Text fw={700} c="green">
                ₹{selectedOrder.totalAmount || selectedOrder.total}
              </Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default Orders;
