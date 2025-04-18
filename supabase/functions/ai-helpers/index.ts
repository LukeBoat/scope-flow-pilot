
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from "https://esm.sh/openai@4.20.1"

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, data } = await req.json()
    
    switch (action) {
      case 'summarize-feedback':
        const feedbackContent = data.feedback.map((f: any) => 
          `${f.content}\nReplies: ${f.replies.map((r: any) => r.content).join(', ')}`
        ).join('\n\n')
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Summarize the feedback and replies into a concise, actionable summary."
            },
            {
              role: "user",
              content: feedbackContent
            }
          ]
        })
        
        return new Response(
          JSON.stringify({ summary: completion.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
        
      case 'suggest-scope':
        const scopeSuggestion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Based on the feedback patterns, suggest potential additions to the project scope."
            },
            {
              role: "user",
              content: data.feedbackHistory
            }
          ]
        })
        
        return new Response(
          JSON.stringify({ suggestion: scopeSuggestion.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
        
      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
