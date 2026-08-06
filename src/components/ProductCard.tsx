import { Card, Text, Button, Group, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AppImage from "./AppImage";
import { useAppSelector } from "../store/store";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;
};

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const navigate = useNavigate();
  const config = useAppSelector((s) => s.config);

  const productImage = product?.image?.startsWith("/")
    ? new URL(config?.api).origin + product?.image
    : product?.image;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <AppImage className="object-cover h-60" src={productImage} />
      </Card.Section>

      <Group justify="space-between" wrap="nowrap" mt="md" mb="xs">
        <Text fw={500} truncate="end" textWrap="nowrap">
          {product.name}
        </Text>

        {product.stock !== undefined && (
          <Badge color={product.stock > 0 ? "green" : "red"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        )}
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2}>
        {product.description}
      </Text>

      <Text fw={700} mt="sm">
        ₹ {product.price}
      </Text>

      <Group mt="md">
        <Button
          fullWidth
          variant="light"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          View Details
        </Button>

        <Button
          fullWidth
          disabled={product.stock === 0}
          onClick={() => onAddToCart?.(product)}
        >
          Add to Cart
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;
