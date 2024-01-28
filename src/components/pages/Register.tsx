import { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthorizationService from "../../services/AuthorisationService";
import { routes } from "../../router/routes";
import { Link, redirect } from "react-router-dom";
import { AxiosError } from "axios";

const RegisterInputSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string().min(3),
  firstname: z.string(),
  lastname: z.string()
})

type RegisterInputSchemaType = z.infer<typeof RegisterInputSchema>

export default function Register() {
  const {setAuth, setUser} = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputSchemaType>({ resolver:  zodResolver(RegisterInputSchema)})
  const onSubmit: SubmitHandler<RegisterInputSchemaType> = (data) => {
    AuthorizationService().register(data.email, data.password, data.firstname, data.lastname)
    .then((user) => {
      setAuth(true)
      setUser(user)
      redirect(routes.home)
    })
    .catch((error: AxiosError) => {console.log(error)})
  }
  return (
    <div className="flex flex-col items-center justify-center text-center h-svh">
      <h1 className="text-6xl p-8">Register</h1>
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
        <label htmlFor="email" className="self-start text-xl">
          Firstname
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="firstname"
          id="firstname"
          {...register("firstname")}
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
        <label htmlFor="email" className="self-start text-xl">
          Lastname
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="lastname"
          id="lastname"
          {...register("lastname")}
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
        <Link to={routes.login}>Already Registered? Login</Link>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Log in
        </button>
      </form>
    </div>
  )
}
