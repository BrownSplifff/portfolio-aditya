import Groq from "groq-sdk"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

    export async function POST(req){
        try{
            const body =  await req.json();

            const userMessage = body.message;

            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: userMessage,
                    }
                ],
                model: "llama-3.3-70b-versatile",
            })

            const reply = chatCompletion.choices[0]?.message?.content;

            return Response.json({
                success: true,
                reply,
            })
        
        }catch(error){
            console.log(error)

            return Response.json(
                {
                    success:false,
                    message: "something went wrong"
                },
                {status: 500}
            )
        }
    }