import { Table } from "../ui/table";
import { Download, Eye, Pencil, Trash, Upload } from "lucide-react";

import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  dataAssignmentDummy,
  dataSubmissionAdminDummy,
} from "./dummy/datadummy";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function AdminSubmission() {
  return (
    <>
      <Button variant="secondary">Add Assignment</Button>
      <Table>
        <TableCaption>Manage submissions here.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Submission</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSubmissionAdminDummy.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.deadline}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Eye />
                </Button>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Download />
                </Button>
                <Button variant="ghost" size="icon">
                  {item.status ? <Pencil className="text-muted" /> : <Pencil />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="text-red-400" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
