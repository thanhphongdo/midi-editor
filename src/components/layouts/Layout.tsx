import { AppShell, Burger, Drawer, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { SwitchTheme } from "../SwitchTheme";
import { useNavigate } from "react-router";

export function Layout({ children }: PropsWithChildren) {
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <div className="flex items-center justify-center w-full relative">
            <Burger
              className="absolute z-20 left-0"
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div className="flex-1 text-center">
              <Text
                size="xl"
                fw={600}
                className="font-fredoka cursor-pointer"
                onClick={() => navigate("/")}
              >
                MIDI Editor
              </Text>
            </div>
            <div className="absolute right-0 top-0">
              <SwitchTheme />
            </div>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <Drawer opened={opened} onClose={close} title="Implement later">
        {/* Drawer content */}
      </Drawer>
    </AppShell>
  );
}
