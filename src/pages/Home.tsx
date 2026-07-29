import { useState } from "react";
import {
  Container,
  Title,
  Text,
  TextInput,
  Grid,
  Loader,
  Center,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import ProductCard from "../components/ProductCard";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../features/cart/cartSlice";
import {
  useGetProductsQuery,
  usePostCartItemMutation,
} from "../store/api/generatedApi";

const Home = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 400);

  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 8,
    search: debouncedSearch,
  });

  const [postCart] = usePostCartItemMutation();

  const handleAddToCart = async (product: any) => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );

    try {
      await postCart({
        body: {
          productId: product._id,
          quantity: 1,
        },
      }).unwrap();

      notifications.show({
        title: "Added to Cart 🛒",
        message: `${product.name} has been added to your cart.`,
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

  const products = data?.data || data || [];

  return (
    <Container size="lg" py="md">
      <Title mt="md">Welcome to MyShop 🛍️</Title>
      <Text c="dimmed" mb="md">
        Discover amazing products at the best prices
      </Text>

      <TextInput
        placeholder="Search products..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="lg"
      />

      {isLoading && (
        <Center mt="xl">
          <Loader />
        </Center>
      )}

      {!isLoading && Array.isArray(products) && products.length > 0 && (
        <Grid>
          {products.map((product: any) => (
            <Grid.Col
              key={product._id}
              span={{ base: 12, sm: 6, md: 3, xs: 3 }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      {!isLoading && (!Array.isArray(products) || products.length === 0) && (
        <Center mt="xl">
          <Text>No products found</Text>
        </Center>
      )}
    </Container>
  );
};

export default Home;
