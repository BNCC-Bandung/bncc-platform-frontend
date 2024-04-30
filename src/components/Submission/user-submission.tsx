import { Table } from "../ui/table";
import { Download, Upload } from "lucide-react";

import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { dataAssignmentDummy } from "./dummy/datadummy";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function UserSubmission() {
  return (
    <Table>
      <TableCaption>A list of your needed submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Last Submission</TableHead>
          <TableHead>Download</TableHead>
          <TableHead>Upload</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataAssignmentDummy.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.deadline}</TableCell>
            <TableCell>{item.lastSubmission}</TableCell>
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
              {item.status ? (
                <Badge className="bg-green-400">Submitted</Badge>
              ) : (
                <Badge variant="destructive">Not Submitted</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
