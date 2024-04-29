"use client";
import { ContactRound, BookUser, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function UserProfile() {
  const { userData } = useContext(AuthContext)!;
  const { fullName, NIM, email, address, phone, role, bnccId } = userData;

  return (
    <Card className="flex gap-10 p-5">
      <Image src="/img/profile.png" alt="Dashboard" width={300} height={100} />
      <div className="flex flex-col w-full">
        <CardHeader className="flex flex-row justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tighter lg:text-3xl">
            Good afternoon, <span className="text-blue-500">{fullName}</span>!
          </h1>
          {role === 0 ? (
            <Badge className="h-fit bg-blue-400 ">Pengurus</Badge>
          ) : role === 1 ? (
            <Badge className="h-fit">Aktivis</Badge>
          ) : (
            <Badge className="h-fit" variant="secondary">
              Member
            </Badge>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <p className="text-blue-400 font-bold flex flex-row gap-1">
                <ContactRound />
                BNCC ID
              </p>
              <p className="text-muted-foreground">{bnccId}</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold flex flex-row gap-1">
                <BookUser />
                NIM
              </p>
              <p className="text-muted-foreground">{NIM}</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold flex flex-row gap-1">
                <MapPin />
                ADDRESS
              </p>
              <p className="text-muted-foreground">{address}</p>
            </div>
          </div>
          <div>
            <div className="flex gap-4 flex-col">
              <div>
                <p className="text-blue-400 font-bold flex flex-row gap-1">
                  <Mail />
                  EMAIL
                </p>
                <p className="text-muted-foreground">{email}</p>
              </div>
              <div>
                <p className="text-blue-400 font-bold flex flex-row gap-1">
                  <Phone />
                  PHONE NUMBER
                </p>
                <p className="text-muted-foreground">{phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
