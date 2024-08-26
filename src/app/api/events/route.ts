import { prisma } from "@/lib/prisma"; // Make sure this path is correct for your project

export async function GET(request: Request) {
    try {
        const events = await prisma.event.findMany(); // This fetches all records from the Event model

        return new Response(JSON.stringify(events), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle any errors that occur during the request
        return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the incoming request data
        const { name, description, startTime, endTime, location } = body;

        // Create a new event in the database
        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                startTime,
                endTime,
                location,
            },
        });

        // Return the newly created event in the response
        return new Response(JSON.stringify(newEvent), {
            status: 201, // 201 Created
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle any errors that occur during the request
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
