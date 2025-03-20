"use client"

import * as React from "react"
import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modal"

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").or(z.string().length(0)),
  engineerCount: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]),
  formType: z.enum(["early-access", "demo"])
})

interface ContactFormProps {
  formType: "early-access" | "demo"
  buttonText: string
  buttonClassName?: string
}

export function ContactForm({ formType, buttonText, buttonClassName }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const formRef = React.useRef<HTMLFormElement>(null)

  const formTitle = formType === "early-access"
    ? "Become an Early Access Partner"
    : "Request a Demo"
  
  const formDescription = formType === "early-access"
    ? "Fill out the form below to collaborate in shaping Roo Code's enterprise solution."
    : "Fill out the form below to see Roo Code's enterprise capabilities in action."

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
      engineerCount: formData.get("engineerCount") as string,
      formType
    }

    // Validate form data
    try {
      contactFormSchema.parse(data)
      
      // Submit form data to API
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        const responseData = await response.json();

        // Check if the response has a success property that is true
        if (responseData && responseData.success === true) {
          setSubmitStatus("success");
          // Reset form safely
          if (form) {
            form.reset();
          }
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setFormErrors(errors)
      } else {
        setSubmitStatus("error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogDescription>
            {formDescription}
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Thank You!</h3>
            <p className="text-center text-muted-foreground">
              Your information has been submitted successfully. Our team will be in touch with you shortly.
            </p>
            <Button className="mt-4" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`w-full rounded-md border ${
                  formErrors.name ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="Your name"
              />
              {formErrors.name && (
                <p className="text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className={`w-full rounded-md border ${
                  formErrors.company ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="Your company"
              />
              {formErrors.company && (
                <p className="text-xs text-red-500">{formErrors.company}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full rounded-md border ${
                  formErrors.email ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <p className="text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                className={`w-full rounded-md border ${
                  formErrors.website ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="https://example.com"
              />
              {formErrors.website && (
                <p className="text-xs text-red-500">{formErrors.website}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="engineerCount" className="text-sm font-medium">
                Number of Software Engineers <span className="text-red-500">*</span>
              </label>
              <select
                id="engineerCount"
                name="engineerCount"
                className={`w-full rounded-md border ${
                  formErrors.engineerCount ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
                defaultValue="1-10"
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000+">1000+</option>
              </select>
              {formErrors.engineerCount && (
                <p className="text-xs text-red-500">{formErrors.engineerCount}</p>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20">
                There was an error submitting your request. Please try again later.
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}