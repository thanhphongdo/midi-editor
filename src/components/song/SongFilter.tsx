import { CloseButton, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SongFilter({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (keyword: string) => void;
}) {
  return (
    <Input
      value={filter}
      onChange={(el) => {
        setFilter(el.target.value);
      }}
      className="w-full"
      placeholder="Search Songs"
      leftSection={<IconSearch size={16} />}
    />
  );
}
