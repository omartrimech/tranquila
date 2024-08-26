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
                startTime: new Date(startTime),
                endTime: new Date(endTime),
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
        return new Response(JSON.stringify({ error: "Failed to create event" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        // Validate the incoming request data
        const { id, name, description, startTime, endTime, location } = body;

        // Update the existing event in the database
        const updatedEvent = await prisma.event.update({
            where: { id: BigInt(id) }, // Convert id to BigInt if needed
            data: {
                name,
                description,
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                location,
            },
        });

        // Return the updated event in the response
        return new Response(JSON.stringify(updatedEvent), {
            status: 200, // 200 OK
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle any errors that occur during the request
        return new Response(JSON.stringify({ error: "Failed to update event" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}