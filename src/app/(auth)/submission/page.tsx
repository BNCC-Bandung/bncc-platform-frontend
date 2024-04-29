import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Upload } from "lucide-react";

const data = [
  {
    Name: "Final Project Backend Development",
    Deadline: "Sat, 12 Feb 2022 00:00",
    "Last Submission": "Sat, 11 Feb 2022 23:59",
    Download: "",
    Upload: "",
  },
  {
    Name: "Final Project Backend Development",
    Deadline: "Sat, 12 Feb 2022 00:00",
    "Last Submission": "Sat, 11 Feb 2022 23:59",
    Download: "",
    Upload: "",
  },
  {
    Name: "Final Project Backend Development",
    Deadline: "Sat, 12 Feb 2022 00:00",
    "Last Submission": "Sat, 11 Feb 2022 23:59",
    Download: "",
    Upload: "",
  },
  {
    Name: "Final Project Backend Development",
    Deadline: "Sat, 12 Feb 2022 00:00",
    "Last Submission": "Sat, 11 Feb 2022 23:59",
    Download: "",
    Upload: "",
  },
  {
    Name: "Final Project Backend Development",
    Deadline: "Sat, 12 Feb 2022 00:00",
    "Last Submission": "Sat, 11 Feb 2022 23:59",
    Download: "",
    Upload: "",
  },
];

export default function Submission() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <Table>
        <TableCaption>A list of your needed submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Last Submission</TableHead>
            <TableHead>Download</TableHead>
            <TableHead>Upload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item.Deadline}</TableCell>
              <TableCell>{item["Last Submission"]}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
