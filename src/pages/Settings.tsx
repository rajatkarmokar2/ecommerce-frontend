import { useEffect } from "react";
import {
  Card,
  Switch,
  SegmentedControl,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setApi } from "../features/config/configSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.config.api);

  const onChangeApi = (value: string) => {
    dispatch(setApi(value));

    // 🔥 reset RTK cache so new API is used
    // dispatch(baseApi.util.resetApiState());
  };

  //   const [api, setApi] = useState<ApiType>("express");
  const { colorScheme, toggleColorScheme, setColorScheme } =
    useMantineColorScheme();

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedApi = localStorage.getItem("api");

    if (savedTheme === "dark") setColorScheme("dark");
    setApi(savedApi ?? "");
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (colorScheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [colorScheme]);

  // Save API selection
  useEffect(() => {
    localStorage.setItem("api", api);
  }, [api]);

  return (
    <div className=" flex justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* Theme Settings */}
        <Card shadow="md" radius="lg" p="lg" className="dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Text fw={600}>Theme</Text>
              <Text size="sm" c="dimmed">
                Switch between light and dark mode
              </Text>
            </div>

            <Switch
              checked={colorScheme === "dark"}
              onChange={toggleColorScheme}
              size="lg"
            />
          </div>
        </Card>

        {/* API Settings */}
        <Card shadow="md" radius="lg" p="lg" className="dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <Text fw={600}>API Environment</Text>
              <Text size="sm" c="dimmed">
                Choose backend service
              </Text>
            </div>

            <SegmentedControl
              fullWidth
              value={api}
              onChange={onChangeApi}
              data={[
                { label: "Express", value: import.meta.env.VITE_EXPRESS_API },
                { label: "NestJS", value: import.meta.env.VITE_NEST_API },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
