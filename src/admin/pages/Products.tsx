import { useState } from "react";
import {
  Container,
  Title,
  Paper,
  Table,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Image,
  Badge,
  ActionIcon,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useDeleteProductsByIdMutation, useGetProductsQuery, usePatchProductsByIdMutation, usePostProductsMutation } from "../../store/api/generatedApi";

const PLACEHOLDER = "https://placehold.co/80x80?text=No+Image";

const Products = () => {
  const { data, isLoading, refetch } = useGetProductsQuery({
    page: 1,
    limit: 50,
  });

  const [createProduct, { isLoading: isCreating }] = usePostProductsMutation();
  const [updateProduct, { isLoading: isUpdating }] = usePatchProductsByIdMutation();
  const [deleteProduct] = useDeleteProductsByIdMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    stock: 0,
  });

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      price: 0,
      image: "",
      stock: 0,
    });
    setModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingId(product._id || product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      image: product.image || "",
      stock: product.stock || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await updateProduct({ body: payload as any, id: editingId }).unwrap();
        notifications.show({
          title: "Product Updated",
          message: `${form.name} updated successfully!`,
          color: "green",
        });
      } else {
        await createProduct({ body: payload }).unwrap();
        notifications.show({
          title: "Product Created",
          message: `${form.name} added to inventory!`,
          color: "green",
        });
      }

      setModalOpen(false);
      refetch();
    } catch (err: any) {
      notifications.show({
        title: "Error Saving Product",
        message: err?.data?.message || "Operation failed. Please try again.",
        color: "red",
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}"?`)) return;

    try {
      await deleteProduct({ id }).unwrap();
      notifications.show({
        title: "Product Deleted",
        message: `${name} has been removed.`,
        color: "blue",
      });
      refetch();
    } catch (err: any) {
      notifications.show({
        title: "Delete Failed",
        message: err?.data?.message || "Could not delete product.",
        color: "red",
      });
    }
  };

  const products = data?.data || (Array.isArray(data) ? data : []);

  if (isLoading) {
    return (
      <Center style={{ minHeight: 350 }}>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Admin Products Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal}>
          Add Product
        </Button>
      </Group>

      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Image</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {products.map((p: any) => {
              const pId = p._id || p.id;
              return (
                <Table.Tr key={pId}>
                  <Table.Td>
                    <Image
                      src={p.image || PLACEHOLDER}
                      alt={p.name}
                      w={48}
                      h={48}
                      radius="xs"
                      fit="cover"
                      onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#888", maxWidth: 260 }} className="truncate">
                      {p.description}
                    </div>
                  </Table.Td>
                  <Table.Td>₹{p.price}</Table.Td>
                  <Table.Td>
                    <Badge color={p.stock > 0 ? "green" : "red"}>
                      {p.stock > 0 ? p.stock : "Out of Stock"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon color="blue" variant="subtle" onClick={() => openEditModal(p)}>
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(pId, p.name)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Modal Form */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Product" : "Create New Product"}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <TextInput
              label="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
            <NumberInput
              label="Price (₹)"
              value={form.price}
              onChange={(val) => setForm({ ...form, price: Number(val) })}
              min={0}
              required
            />
            <TextInput
              label="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
            />
            <NumberInput
              label="Stock Quantity"
              value={form.stock}
              onChange={(val) => setForm({ ...form, stock: Number(val) })}
              min={0}
              required
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={isCreating || isUpdating}>
                {editingId ? "Update Product" : "Create Product"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default Products;
