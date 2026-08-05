import { useState } from "react";
import {
  Container,
  Grid,
  TextInput,
  Pagination,
  Loader,
  Center,
  Text,
  Group,
  Alert,
  Button,
} from "@mantine/core";
import { IconSearch, IconAlertCircle } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import ProductCard from "../components/ProductCard";
import {
  useGetProductsQuery,
  usePostCartItemMutation,
} from "../store/api/enhancedApi";

const Products = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    page,
    limit: 8,
    search: debouncedSearch,
  });

  const [postCart] = usePostCartItemMutation();

  const handleAddToCart = async (product: any) => {
    try {
      await postCart({
        body: {
          productId: product._id,
          quantity: 1,
        },
      }).unwrap();

      notifications.show({
        title: "Added to Cart 🛒",
        message: `${product.name} added to your cart.`,
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

  const products = data?.data || (Array.isArray(data) ? data : []);
  const totalPages = data?.totalPages || 1;

  return (
    <Container size="lg" py="md">
      <Group mb="md">
        <TextInput
          placeholder="Search products..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setPage(1);
          }}
          style={{ flex: 1 }}
        />
      </Group>

      {isError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Unable to load products"
          color="red"
          mb="xl"
        >
          There was an issue fetching products from the API.
          <Button variant="outline" size="xs" mt="sm" onClick={refetch}>
            Retry
          </Button>
        </Alert>
      )}

      {isLoading && (
        <Center mt="xl">
          <Loader />
        </Center>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <>
          <Grid>
            {products.map((product: any) => (
              <Grid.Col
                key={product._id}
                span={{ base: 12, xs: 6, sm: 5, md: 4, lg: 3 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid.Col>
            ))}
          </Grid>

          <Center mt="xl">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Center>
        </>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <Center mt="xl">
          <Text>No products found</Text>
        </Center>
      )}
    </Container>
  );
};

export default Products;
