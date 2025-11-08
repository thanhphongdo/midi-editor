import { useMemo, useState } from "react";
import {
  Button,
  Group,
  Modal,
  ScrollArea,
  Table,
  Title,
  TextInput,
  ActionIcon,
  CloseButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { IconTrash } from "@tabler/icons-react";
import { Note } from "../../definitions";

export function NoteList() {
  const {
    noteListOpened,
    closeNoteListModal,
    song,
    deleteNote,
    getTrackColor,
    openAddNewNoteModal,
  } = useMidiEditorContext();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filter, setFilter] = useState("");
  const notes = useMemo(() => song.notes, [song.notes]);

  const columnHelper = createColumnHelper<Note>();

  const columns = [
    columnHelper.accessor("track", {
      header: "Track",
      cell: (info) => (
        <span
          style={{
            color: getTrackColor(song.trackLabels[info.getValue() - 1]),
          }}
        >
          {song.trackLabels[info.getValue() - 1]}
        </span>
      ),
    }),
    columnHelper.accessor("title", {
      header: "Note Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("time", {
      header: "Time",
      cell: (info) => `${info.getValue()}s`,
    }),
    columnHelper.accessor("color", {
      header: "Color",
      cell: (info) => (
        <div
          style={{
            backgroundColor: info.getValue(),
            width: 20,
            height: 20,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.display({
      id: "actions",
      header: "Delete",
      cell: (info) => (
        <ActionIcon color="red" onClick={() => handleDelete(info.row.original)}>
          <IconTrash size={16} />
        </ActionIcon>
      ),
    }),
  ];

  const handleDelete = (note: Note) => {
    deleteNote(note);
  };

  const table = useReactTable({
    data: notes,
    columns,
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Modal
      size={"lg"}
      fullScreen={isMobile}
      opened={noteListOpened}
      onClose={closeNoteListModal}
      title={<Title order={4}>Note List</Title>}
      scrollAreaComponent={ScrollArea.Autosize}
      styles={{
        body: {
          paddingBottom: 0,
        },
      }}
    >
      <div className="w-full">
        <div className=" sticky top-[3.75rem] z-10">
          <TextInput
            placeholder="Filter notes..."
            mb="md"
            value={filter ?? ""}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setFilter("")}
                style={{ display: filter ? undefined : "none" }}
              />
            }
            onChange={(e) => setFilter(e.currentTarget.value)}
          />
        </div>

        <Table striped highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <Table.Tr>
                <Table.Td
                  colSpan={columns.length}
                  style={{ textAlign: "center" }}
                >
                  No notes found
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>

      <Group
        className="sticky bottom-0 bg-[var(--mantine-color-body)] py-4"
        mt="lg"
        justify="flex-end"
      >
        <Button color="blue" onClick={openAddNewNoteModal}>
          Add Note
        </Button>
        <Button onClick={closeNoteListModal} color="red">
          Close
        </Button>
      </Group>
    </Modal>
  );
}
