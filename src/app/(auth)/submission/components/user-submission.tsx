import { Table } from "@/components/ui/table";

import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserSubmission() {
  return (
    <Table>
      <TableCaption>A list of your needed submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Deadline</TableHead>

          <TableHead>Download</TableHead>
          <TableHead>Upload</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      {/* <TableBody>
        {assignment &&
          assignment.map((item, index) => {
            const deadline = new Date(item.deadlineTime);
            return (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {deadline.toLocaleString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    Download
                    <Download className="ml-2" size={15} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    Upload
                    <Upload className="ml-2" size={15} />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  {false ? (
                    <Badge className="bg-green-400">Submitted</Badge>
                  ) : (
                    <Badge variant="destructive">Not Submitted</Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody> */}
    </Table>
  );
}
