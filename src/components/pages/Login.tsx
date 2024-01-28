import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthorizationService, { validateToken } from "../../services/AuthorisationService";
import { jwtTokenKey } from "../../services/Api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, redirect } from "react-router-dom";
import { routes } from "../../router/routes";

const LogInSchema = z.object({
  email: z.string({required_error: "Email is required"}).email(),
  password: z.string().min(3).max(20),
});

type LoginSchemaType = z.infer<typeof LogInSchema>;

export default function Login() {
  const { setAuth, setUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LogInSchema) });
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    console.log("Base URL: ", import.meta.env.VITE_BASE_URL);
    AuthorizationService()
      .logIn(data.email, data.password)
      .then((user) => {
        console.log(user);
        setAuth(true);
        setUser(user);
        redirect(routes.login);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("JWT Validity: ", validateToken(localStorage.getItem(jwtTokenKey)!));
  };
  return (
    <div className="flex flex-col items-center justify-center text-center h-svh">
      <h1 className="text-6xl p-8">Login</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="self-start text-xl">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="example@mail.com"
          id="email"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password" className="self-start text-xl">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <Link to={routes.register}>Don't have an account? Register</Link>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Log in
        </button>
      </form>
    </div>
  );
}
