import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Image,
  Text,
  Title,
  Button,
  Loader,
  Center,
  NumberInput,
  Group,
  Badge,
} from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  useGetProductsByIdQuery,
  usePostCartItemMutation,
} from "../store/api/generatedApi";

const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState<number | string>(1);
  const config = useAppSelector((s) => s.config);

  const { data, isLoading, isError } = useGetProductsByIdQuery({
    id: id as string,
  });
  const [postCart, { isLoading: isAdding }] = usePostCartItemMutation();

  if (isLoading) {
    return (
      <Center mt="xl" style={{ minHeight: 300 }}>
        <Loader />
      </Center>
    );
  }

  const product = data?.data || (data && !data.data ? data : null);

  const productImage = product?.image?.startsWith("/")
    ? new URL(config?.api).origin + product?.image
    : product?.image;

  if (isError || !product) {
    return (
      <Center mt="xl" style={{ minHeight: 300 }}>
        <Text c="red">Product not found</Text>
      </Center>
    );
  }

  const quantityNum = typeof qty === "number" ? qty : parseInt(qty, 10) || 1;

  const handleAddToCart = async () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantityNum,
      }),
    );

    try {
      await postCart({
        body: {
          productId: product._id,
          quantity: quantityNum,
        },
      }).unwrap();

      notifications.show({
        title: "Added to Cart 🛒",
        message: `${quantityNum} × ${product.name} added to your cart.`,
        color: "green",
      });
    } catch (err: any) {
      notifications.show({
        title: "Cart Synchronized",
        message: `${product.name} saved to local cart.`,
        color: "blue",
      });
    }
  };

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src={productImage || PLACEHOLDER}
            onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
            height={400}
            fit="contain"
            radius="md"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group justify="space-between" mb="xs">
            <Title order={2}>{product.name}</Title>
            {product.stock !== undefined && (
              <Badge color={product.stock > 0 ? "green" : "red"}>
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </Badge>
            )}
          </Group>

          <Text mt="sm" c="dimmed">
            {product.description}
          </Text>

          <Text mt="md" fw={700} size="xl">
            ₹ {product.price}
          </Text>

          <Group mt="lg">
            <NumberInput
              value={qty}
              onChange={(val) => setQty(val)}
              min={1}
              max={product.stock || 99}
              style={{ width: 110 }}
            />
            <Button
              onClick={handleAddToCart}
              loading={isAdding}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
