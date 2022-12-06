import { MachineConfig, send, Action, assign } from "xstate";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

const grammar: { [index: string]: { title?: string, day?: string, time?: string } } = {
    "Lecture.": { title: "Dialogue systems lecture" },
    "Lunch.": { title: "Lunch at the canteen" },
    //"on Friday": { day: "Friday" },
    //"Friday": { day: "Friday" },
    "Friday.": { day: "Friday" },
    "at ten.": { time: "10:00" },
    "at ten": { time: "10:00" },
    "At 10.": { time: "10:00" },
}


const answers: { [index: string]: {confirm?:string, decline?: string} } = {
    "Yes.": { confirm: "Yes" },
    "No.": { decline: "No" },    
}

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'idle',
    states: {
        idle: {
            on: {
                CLICK: 'init'
            }
        },
        init: {
            on: {
                TTS_READY: 'welcome',
                CLICK: 'welcome'
            }
        },
        welcome: {
            initial: 'prompt',
            on: {
                RECOGNISED: [
                    {
                        target: 'info',
                        cond: (context) => "title" in (grammar[context.recResult[0].utterance] || {}),
                        actions: assign({ title: (context) => grammar[context.recResult[0].utterance].title! })
                    },
                    {
                        target: '.nomatch'
                    }
                ],
                TIMEOUT: '.prompt'
            },
            states: {
                prompt: {
                    entry: say("Let's create a meeting. What is it about?"),
                    on: { ENDSPEECH: 'ask' }
                },
                ask: {
                    entry: send('LISTEN'),
                },
                nomatch: {
                    entry: say("Sorry, I don't know what that is. Tell me something I know."),
                    on: { ENDSPEECH: 'ask' }
                }
            }
        },

        info: {
            entry: send((context) => ({
                type: 'SPEAK',
                value: `OK, ${context.title}`
            })),
            on: { ENDSPEECH: 'decideDay' }
        },
                
        decideDay: {
            initial: 'prompt',
            on: {
                RECOGNISED: [
                    {
                        target: 'info2',
                        cond: (context) => "day" in (grammar[context.recResult[0].utterance] || {}),
                        actions: assign({ day: (context) => grammar[context.recResult[0].utterance].day! })
                    },
                    {
                        target: '.nomatch'
                    }
                ],
                TIMEOUT: '.prompt'
            },
            states: {
                prompt: {
                    entry: say("On what day is it?"),
                    on: { ENDSPEECH: 'ask' }
                },
                ask: {
                    entry: send('LISTEN'),
                },
                nomatch: {
                    entry: say("Sorry, I don't know what day that is. Please repeat."),
                    on: { ENDSPEECH: 'ask' }
                }
            }
        },
        info2: {
            entry: send((context) => ({
                type: 'SPEAK',
                value: `OK, on ${context.day}`
            })),
            on: { ENDSPEECH: 'allDay' }
        },
        allDay: {
            initial: 'prompt',
            on: {
                RECOGNISED: [
                    {
                        target: 'askBook',
                        cond: (context) => "confirm" in (answers[context.recResult[0].utterance] || {}),
                        actions: assign({ time: (context) => "allDay"! })                        
                    },
                    {
                        target: 'decideTime',
                        cond: (context) => "decline" in (answers[context.recResult[0].utterance] || {}),
                    },
                    {
                        target: '.nomatch'
                    }
                ],
                TIMEOUT: '.prompt'
            },
            states: {
                prompt: {
                    entry: say("Is the meeting taking all day?"),
                    on: { ENDSPEECH: 'ask' }
                },
                ask: {
                    entry: send('LISTEN'),
                },
                nomatch: {
                    entry: say("Sorry, I didn't quite get that. Please repeat."),
                    on: { ENDSPEECH: 'ask' }
                }
            }
        },        
        
        
            decideTime: {
            initial: 'prompt',
            on: {
                RECOGNISED: [
                    {
                        target: 'askBook',
                        cond: (context) => "time" in (grammar[context.recResult[0].utterance] || {}),
                        actions: assign({ time: (context) => grammar[context.recResult[0].utterance].time! })
                    },
                    {
                        target: '.nomatch'
                    }
                ],
                TIMEOUT: '.prompt'
            },
            states: {
                prompt: {
                    entry: say("On what time would you want to meet?"),
                    on: { ENDSPEECH: 'ask' }
                },
                ask: {
                    entry: send('LISTEN'),
                },
                nomatch: {
                    entry: say("Sorry, I don't quite get that. Please repeat."),
                    on: { ENDSPEECH: 'ask' }
                }
            }
        },
            askBook: {
            initial: 'prompt',
            on: {
                RECOGNISED: [
                    {
                        target: 'success',
                        cond: (context) => "confirm" in (answers[context.recResult[0].utterance] || {}),
                    },
                    {
                        target: 'init',
                        cond: (context) => "decline" in (answers[context.recResult[0].utterance] || {}),
                    },
                    {
                        target: '.nomatch'
                    }
                ],
                TIMEOUT: '.prompt'
            },            
            states: {
                prompt: {
                    entry: send ((context) => ({
                        type: 'SPEAK',
                        value: `Do you want be to book a meeting for ${context.title} ${(context.time == "allDay") ? (`for all of ${context.day}`) : (`on ${context.day} at ${context.time}?`)}`})),
                    on: { ENDSPEECH: 'ask' }
                },
                ask: {
                    entry: send('LISTEN'),
                },
                nomatch: {
                    entry: say("Sorry, I didn't quite get that. Please repeat."),
                    on: { ENDSPEECH: 'ask' }
                }
            }
        },        
             
             
            
        success: {
            entry: send((context) => ({
                type: 'SPEAK',
                value: `OK, your meeting has been booked`
            })),
            on: { ENDSPEECH: 'init' }
        },            
            
        

        
    }
})

const kbRequest = (text: string) =>
    fetch(new Request(`https://cors.eu.org/https://api.duckduckgo.com/?q=${text}&format=json&skip_disambig=1`)).then(data => data.json())
