"use client";

import React, {useRef, useState} from 'react';
import * as Form from '@radix-ui/react-form';
import {getNames} from 'country-list';
import Link from "next/link";
import Container from '@/components/elements/Container';

function isInputNamedElement(e: Element): e is HTMLInputElement & { name: string } {
    return 'value' in e && 'name' in e
}


export default function Contact() {
    const [state, setState] = useState<"idle" | "loading" | "success">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData: Record<string, string> = {};

        Array.from(e.currentTarget.elements).filter(isInputNamedElement).forEach((field) => {
            if (!field.name) return;
            formData[field.name] = field.value;
        });

        setState('loading');

        await fetch('/api/email', {
            method: 'POST',

            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                subject: formData.subject,
                country: formData.country,
                message: formData.message
            })
        });

        setState('success');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (state === "success") {
        return (
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-6 md:pb-10">
                        <div className="max-w-3xl mx-auto text-center pb-6">
                            <h1 className="custom-header-1" data-aos="fade-up">Thank You!</h1>
                            <p className="text-xl text-slate-11" data-aos="fade-up" data-aos-delay="200">
                                Your message has been successfully sent. We will get back to you shortly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <Container>
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="custom-header-1" data-aos="fade-up">How can we help you?</h1>
                <p className="text-xl text-slate-11 text-center" data-aos="fade-up" data-aos-delay="200">
                    Browse our <Link href="/faq" title="FAQ"
                                     className="hover:text-indigo-500 text-blue-600">FAQ</Link> for answers to common
                    questions. <br/>
                    Can&apos;t find what you&apos;re looking for? <br/>
                    Send us a message and we&apos;ll get back to you as soon as possible.
                </p>
            </div>
            <Form.Root ref={formRef} className="max-w-xl mx-auto" onSubmit={handleOnSubmit}>

                <Form.Field name="fullName" id="fullName" className="w-full  mb-4">
                    <Form.Label className="block text-slate-11 text-sm font-medium mb-1">Name <span
                        className="text-red-600">*</span></Form.Label>
                    <Form.Control asChild>
                        <input type="text" className="form-input bg-gold-2 dark:bg-sky-3 w-full text-slate-12"
                               placeholder="Enter your name" required/>
                    </Form.Control>
                    <Form.Message match="valueMissing" className="text-red-600">
                        Please enter your name.
                    </Form.Message>
                </Form.Field>


                <Form.Field name="email" id="email" className="w-full  mb-4">
                    <Form.Label className="block text-slate-11 text-sm font-medium mb-1">Email <span
                        className="text-red-600">*</span></Form.Label>
                    <Form.Control asChild>
                        <input type="email" className="form-input bg-gold-2 dark:bg-sky-3 w-full text-slate-12"
                               placeholder="Enter your email address" required/>
                    </Form.Control>
                    <Form.Message match="valueMissing" className="text-red-600">
                        Please enter your email.
                    </Form.Message>
                    <Form.Message match="typeMismatch" className="text-red-600">
                        Please provide a valid email.
                    </Form.Message>
                </Form.Field>

                <Form.Field name="subject" id="subject" className="w-full  mb-4">
                    <Form.Label className="block text-slate-11 text-sm font-medium mb-1">Subject <span
                        className="text-red-600">*</span></Form.Label>
                    <Form.Control asChild>
                        <input type="text" className="form-input bg-gold-2 dark:bg-sky-3 w-full text-slate-12"
                               placeholder="How can we help you?" required/>
                    </Form.Control>
                    <Form.Message match="valueMissing" className="text-red-600">
                        Please provide a subject.
                    </Form.Message>
                </Form.Field>

                <Form.Field name="country" id="country" className="w-full  mb-4">
                    <Form.Label className="block text-slate-11 text-sm font-medium mb-1">Country</Form.Label>
                    <Form.Control asChild>
                        <select className="form-select bg-gold-2 dark:bg-sky-3 w-full text-slate-12">
                            {getNames().map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </Form.Control>
                </Form.Field>

                <Form.Field name="message" id="message" className="w-full  mb-4">
                    <Form.Label className="block text-slate-11 text-sm font-medium mb-1">Message</Form.Label>
                    <Form.Control asChild>
                        <textarea rows={4} className="form-textarea w-full text-slate-11  bg-gold-2 dark:bg-sky-3"
                                  placeholder="Write your message"></textarea>
                    </Form.Control>
                </Form.Field>


                <div className="flex flex-wrap  mt-6">
                    <div className="w-full ">
                        <Form.Submit asChild>

                            <button
                                className="inline-flex flex-col bg-transparent text-center items-center w-full  dark:border-white py-2 m-0 px-8 text-md font-semibold text-slate-12 hover:text-slate-1 dark:bg-black rounded-[0.3rem] border-2 border-solid duration-200 cursor-pointer border-neutral-900 bg-gold-3 hover:bg-black dark:hover:bg-white"
                                disabled={state === 'loading'}>
                                {state === 'loading' ? 'Sending...' : 'Send'}
                            </button>
                        </Form.Submit>
                    </div>
                </div>
                <div className="flex flex-wrap  my-4">
                    <div className="w-full ">
                        <p className="text-slate-10 text-xs ml-1 font-medium mb-1">
                            By clicking &quot;send&quot; you consent to allow Eight Athletics to store and process the personal
                            information submitted above and agree to our <Link href="/terms/terms-and-conditions"
                                                                               title="Terms and Conditions"
                                                                               className="hover:text-indigo-500 text-blue-600">terms
                            and conditions</Link> as well as our <Link href="/terms/privacy-policy"
                                                                       title="Privacy Policy"
                                                                       className="hover:text-indigo-500 text-blue-600">privacy
                            policy</Link>.
                        </p>
                    </div>
                </div>
            </Form.Root>
        </Container>
    );
}