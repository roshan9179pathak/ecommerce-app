"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState , useActionState} from "react";
import { login } from "@/app/login/action";
import { useFormStatus } from "react-dom";

const LoginForm: React.FC = () => {
  const [state, loginAction] = useActionState(login, undefined);

  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-white px-4 sm:px-6 lg:px-8">
      <form
        action={loginAction}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-indigo-600"
      >
        <h2 className="text-3xl font-semibold text-indigo-700 text-center mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label
            className="block text-indigo-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          {state?.errors?.email && (
            <p className="text-red-600 text-xs mt-1">{state.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-indigo-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          {state?.errors?.password && (
            <p className="text-red-600 text-xs mt-1">{state.errors.password}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
};

export default LoginForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
