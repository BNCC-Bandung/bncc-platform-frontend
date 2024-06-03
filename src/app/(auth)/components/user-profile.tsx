"use client";
import {
  ContactRound,
  BookUser,
  MapPin,
  Mail,
  Phone,
  LoaderCircle,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useContext, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/components/contexts/AuthContextProvider";

export function UserProfile() {
  const { userData, isUserLoading, getProfile } = useContext(AuthContext)!;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUserLoading) {
    return (
      <div className="flex gap-10 p-5 border w-full">
        <Skeleton className="w-[300px] h-[300px]" />
      </div>
    );
  }

  return (
    <Card className="flex gap-10 p-5">
      <div className="min-w-[300px] min-h-[300px] rounded">
        <Image
          src="/img/profile.png"
          alt="Dashboard"
          width={300}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <CardHeader className="flex flex-row justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tighter lg:text-3xl">
            Good afternoon,{" "}
            <span className="text-blue-500">{userData?.fullName}</span>!
          </h1>
          {userData?.role === 0 ? (
            <Badge className="h-fit bg-blue-400 ">Pengurus</Badge>
          ) : userData?.role === 1 ? (
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
              <p className="text-muted-foreground">{userData?.bnccId}</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold flex flex-row gap-1">
                <BookUser />
                NIM
              </p>
              <p className="text-muted-foreground">{userData?.NIM}</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold flex flex-row gap-1">
                <MapPin />
                ADDRESS
              </p>
              <p className="text-muted-foreground">{userData?.address}</p>
            </div>
          </div>
          <div>
            <div className="flex gap-4 flex-col">
              <div>
                <p className="text-blue-400 font-bold flex flex-row gap-1">
                  <Mail />
                  EMAIL
                </p>
                <p className="text-muted-foreground">{userData?.email}</p>
              </div>
              <div>
                <p className="text-blue-400 font-bold flex flex-row gap-1">
                  <Phone />
                  PHONE NUMBER
                </p>
                <p className="text-muted-foreground">{userData?.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
