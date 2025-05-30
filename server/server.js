import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()


import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app=express();
app.use(cors())
app.use(express.json())
app.get('/', async(req, res)=>{
    res.status(200).send({
        message:'Hello from Codex',
    })
});

app.post('/', async(req, res) =>{
    try {
        const prompt=req.body.prompt;
        
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 300,
           
            
        })
        console.log(completion.choices[0].text)
        res.statuus(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));