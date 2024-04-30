// "use client";
// import type { AxiosError } from "axios";
// import type { FormInputType } from "../types/form-input-type";
// import type { UserLoginType } from "../types/user-data-type";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useState } from "react";
// import axios from "@/api/axios-instace";
// import { AuthContext } from "./AuthContext";

// interface LoginFormContextProviderProps {
//   children: React.ReactNode;
// }

// const LoginFormContext = createContext<FormInputType<UserLoginType> | null>(
//   null
// );

// const LoginFormContextProvider: React.FC<LoginFormContextProviderProps> = ({
//   children,
// }) => {
//   const { getProfile } = useContext(AuthContext)!;
//   const [error, setError] = useState("");
//   const { push } = useRouter();

//   const login = async (data: UserLoginType) => {
//     try {
//       await axios.post("/auth/login", data);
//       getProfile();
//       setError("");
//       push("/");
//     } catch (err) {
//       const axiosError = err as AxiosError<any>;
//       setError(axiosError.response?.data.message);
//     }
//   };

//   const value: FormInputType<UserLoginType> = {
//     error,
//     setError,
//     login: () => {}, // Update the type of login property
//     attendData: { status: 0, track: { createdAt: "" } },
//     setAttendData: () => {},
//   };

//   return (
//     <LoginFormContext.Provider value={value}>
//       {children}
//     </LoginFormContext.Provider>
//   );
// };

// export { LoginFormContext, LoginFormContextProvider };
