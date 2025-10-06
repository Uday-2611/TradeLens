import { inngest } from '@/lib/inngest/client'
import { sendSignedUpEmail } from '@/lib/inngest/functions'
import {serve} from 'inngest/next'

// We are exposing the inngest functions via a next js api route which will make these inngest functions callable within the app and nextjs will handle all the incoming event requests automatically. 

// The functions are the background jobs. 
export const {GET, POST, PUT} = serve({
    client: inngest,
    functions: [sendSignedUpEmail],
})