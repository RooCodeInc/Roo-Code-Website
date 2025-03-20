import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").or(z.string().length(0)),
  engineerCount: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]),
  formType: z.enum(["early-access", "demo"])
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    // Format the data for Slack
    const slackMessage = formatSlackMessage(validatedData);
    
    // Get the Slack webhook URL from environment variables
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error("SLACK_WEBHOOK_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    
    // Send the data to Slack
    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });
    
    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error("Error sending message to Slack:", errorText);
      return NextResponse.json(
        { error: "Failed to send message to Slack" },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function formatSlackMessage(data: z.infer<typeof contactFormSchema>) {
  const formTypeText = data.formType === "early-access" 
    ? "Early Access Partner" 
    : "Demo Request";
  
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `New ${formTypeText} Submission`,
          emoji: true
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${data.name}`
          },
          {
            type: "mrkdwn",
            text: `*Company:*\n${data.company}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Email:*\n${data.email}`
          },
          {
            type: "mrkdwn",
            text: `*Website:*\n${data.website || "Not provided"}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Number of Software Engineers:*\n${data.engineerCount}`
          },
          {
            type: "mrkdwn",
            text: `*Submission Time:*\n${new Date().toLocaleString()}`
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Submitted from the Enterprise page on roocode.com`
          }
        ]
      }
    ]
  };
}