"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    userName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

    email: z.string().email({
        message: "Please enter a valid email address.",
    }),

    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <section className="auth-form">
            {/* Header */}
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />

                    <h1 className="font-ibm-plex-serif text-2xl font-bold text-black">
                        Horizon
                    </h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h2 className="text-2xl font-semibold text-gray-900 lg:text-4xl">
                        {user
                            ? "Link Account"
                            : type === "sign-in"
                                ? "Sign In"
                                : "Sign Up"}
                    </h2>

                    <p className="text-base text-gray-600">
                        {user
                            ? "Link your account to get started"
                            : "Please enter your details"}
                    </p>
                </div>
            </header>

            {/* Authentication Form */}
            {user ? (
                <div className="flex flex-col gap-4">
                    {/* PlaidLink will go here */}
                </div>
            ) : (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8"
                >
                    <FieldGroup>
                        {/* Username */}
                        <Controller
                            name="userName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="userName">
                                        Username
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="userName"
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete={
                                            type === "sign-in"
                                                ? "current-password"
                                                : "new-password"
                                        }
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            {type === "sign-in" ? "Sign In" : "Sign Up"}
                        </Button>
                    </FieldGroup>
                </form>
            )}
        </section>
    );
};

export default AuthForm;