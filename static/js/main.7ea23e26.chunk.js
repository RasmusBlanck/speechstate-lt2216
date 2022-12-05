(this.webpackJsonpspeechstate=this.webpackJsonpspeechstate||[]).push([[0],{170:function(t,e,n){},218:function(t,e){},357:function(t,e){},360:function(t,e){},364:function(t,e){},365:function(t,e){},366:function(t,e){},367:function(t,e){},368:function(t,e){},456:function(t,e,n){"use strict";n.r(e);var i=n(166),a=n(51),c=(n(170),n(14),n(159)),o=n(25),r=n(94),s=n(3),u=n(459),l=n(460);function d(t){return Object(s.q)((function(e){return{type:"SPEAK",value:t}}))}var S={"Lecture.":{title:"Dialogue systems lecture"},"Lunch.":{title:"Lunch at the canteen"},"on Friday":{day:"Friday"},"at ten":{time:"10:00"}},f={initial:"idle",states:{idle:{on:{CLICK:"init"}},init:{on:{TTS_READY:"welcome",CLICK:"welcome"}},welcome:{initial:"prompt",on:{RECOGNISED:[{target:"info",cond:function(t){return"title"in(S[t.recResult[0].utterance]||{})},actions:Object(s.b)({title:function(t){return S[t.recResult[0].utterance].title}})},{target:".nomatch"}],TIMEOUT:".prompt"},states:{prompt:{entry:d("Let's create a meeting. What is it about?"),on:{ENDSPEECH:"ask"}},ask:{entry:Object(s.q)("LISTEN")},nomatch:{entry:d("Sorry, I don't know what it is. Tell me something I know."),on:{ENDSPEECH:"ask"}}}},info:{entry:Object(s.q)((function(t){return{type:"SPEAK",value:"OK, ".concat(t.title)}})),on:{ENDSPEECH:"init"}}}},E=n(160),p=n.n(E),T=n(163),b=n.n(T),m=n(12),O=o.a.send,g=o.a.cancel,C="northeurope";Object(l.a)({url:"https://statecharts.io/inspect",iframe:!1});var v=Object(r.a)({id:"root",type:"parallel",states:{dm:Object(a.a)({},f),asrtts:{initial:"init",states:{init:{on:{CLICK:{target:"getToken",actions:[Object(s.b)({audioCtx:function(t){return new(window.AudioContext||window.webkitAudioContext)}}),function(t){return navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){t.audioCtx.createMediaStreamSource(e)}))}]}}},getToken:{invoke:{id:"getAuthorizationToken",src:function(t,e){return _()},onDone:{actions:[Object(s.b)((function(t,e){return{azureAuthorizationToken:e.data}})),"ponyfillASR"],target:"ponyfillTTS"},onError:{target:"fail"}}},ponyfillTTS:{invoke:{id:"ponyTTS",src:function(t,e){return function(e,n){var i=b()({audioContext:t.audioCtx,credentials:{region:C,authorizationToken:t.azureAuthorizationToken}}),a=i.speechSynthesis,c=i.SpeechSynthesisUtterance;t.tts=a,t.ttsUtterance=c,t.tts.addEventListener("voiceschanged",(function(){t.tts.cancel();var n=t.tts.getVoices(),i=RegExp("en-US","u");i=RegExp("en-US","u");var a=n.find((function(t){return i.test(t.name)}));a?(t.voice=a,e("TTS_READY")):(console.error("TTS_ERROR: Could not get voice for regexp ".concat(i)),e("TTS_ERROR"))}))}}},on:{TTS_READY:"idle",TTS_ERROR:"fail"}},idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(s.b)((function(t,e){return{ttsAgenda:e.value}}))}}},recognising:{initial:"noinput",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(s.b)((function(t,e){return{recResult:e.value}}))],target:".match"},RECOGNISED:"idle",SELECT:"idle",CLICK:".pause",RECSTOP:"idle"},states:{noinput:{entry:["recStart",O({type:"TIMEOUT"},{delay:function(t){return 1e3*(t.tdmPassivity||3)},id:"timeout"})],on:{TIMEOUT:"#root.asrtts.idle",STARTSPEECH:"inprogress"},exit:g("timeout")},inprogress:{},match:{entry:O("RECOGNISED")},pause:{entry:"recStop",on:{CLICK:"noinput"}}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle",SELECT:"idle",CLICK:{target:"idle",actions:O("ENDSPEECH")}},exit:"ttsStop"},fail:{}}}}},{actions:{recLogResult:function(t){console.log("U>",t.recResult[0].utterance,t.recResult[0].confidence)},logIntent:function(t){console.log("<< NLU intent: "+t.nluData.intent.name)}}}),h=function(t){var e=((t.state.context.tdmVisualOutputInfo||[{}]).find((function(t){return"name"===t.attribute}))||{}).value,n=((t.state.context.tdmVisualOutputInfo||[{}]).find((function(t){return"image"===t.attribute}))||{}).value,i="circle";switch(!0){case t.state.matches({asrtts:"fail"})||t.state.matches({dm:"fail"}):break;case t.state.matches({asrtts:{recognising:"pause"}}):e="Click to continue";break;case t.state.matches({asrtts:"recognising"}):i="circle-recognising",e=e||"Listening...";break;case t.state.matches({asrtts:"speaking"}):i="circle-speaking",e=e||"Speaking...";break;case t.state.matches({dm:"idle"}):case t.state.matches({dm:"init"}):e="Click to start!",i="circle-click";break;default:e=e||"\xa0"}return Object(m.jsxs)("div",{className:"control",children:[Object(m.jsx)("figure",{className:"prompt",children:n&&Object(m.jsx)("img",{src:n,alt:e})}),Object(m.jsxs)("div",{className:"status",children:[Object(m.jsx)("button",Object(a.a)({type:"button",className:i,style:{}},t)),Object(m.jsx)("div",{className:"status-text",children:e})]})]})},R=function(t){var e=t.alternative.find((function(t){return"name"===t.attribute})).value,n=(t.alternative.find((function(t){return"image"===t.attribute}))||{}).value;return Object(m.jsxs)("figure",Object(a.a)(Object(a.a)({className:"flex"},t),{},{children:[n&&Object(m.jsx)("img",{src:n,alt:e}),Object(m.jsx)("figcaption",{children:e})]}))};function j(){var t=Object(u.b)(v,{devTools:!0,actions:{changeColour:Object(u.a)((function(t){document.body.style.background=t.recResult[0].utterance})),recStart:Object(u.a)((function(t){t.asr.start()})),recStop:Object(u.a)((function(t){t.asr.abort()})),ttsStart:Object(u.a)((function(t){var e='<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="'.concat(t.voice.name,'">');e+=Object({NODE_ENV:"production",PUBLIC_URL:"/speechstate-lt2216",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_SUBSCRIPTION_KEY:"ed17c494c0e84bfbbb9189555f9fae1d",REACT_APP_ASR_LANGUAGE:"en-US",REACT_APP_TTS_VOICE:"en-US"}).REACT_APP_TTS_LEXICON?'<lexicon uri="'.concat(Object({NODE_ENV:"production",PUBLIC_URL:"/speechstate-lt2216",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_SUBSCRIPTION_KEY:"ed17c494c0e84bfbbb9189555f9fae1d",REACT_APP_ASR_LANGUAGE:"en-US",REACT_APP_TTS_VOICE:"en-US"}).REACT_APP_TTS_LEXICON,'"/>'):"",e+="".concat(t.ttsAgenda,"</voice></speak>"),console.debug(e);var n=new t.ttsUtterance(e);console.log("S>",t.ttsAgenda),n.voice=t.voice,n.onend=function(){return a("ENDSPEECH")},t.tts.speak(n)})),ttsStop:Object(u.a)((function(t){t.tts.cancel()})),ponyfillASR:Object(u.a)((function(t,e){var n=p()({audioContext:t.audioCtx,credentials:{region:C,authorizationToken:t.azureAuthorizationToken}}).SpeechRecognition;t.asr=new n,t.asr.lang="en-US",t.asr.continuous=!0,t.asr.interimResults=!0,t.asr.onresult=function(t){var e=t.results[0];e.isFinal?a({type:"ASRRESULT",value:[{utterance:e[0].transcript,confidence:e[0].confidence}]}):a({type:"STARTSPEECH"})}}))}}),e=Object(i.a)(t,2),n=e[0],a=e[1],c=(n.context.tdmExpectedAlternatives||[]).filter((function(t){return t.visual_information})).map((function(t,e){return Object(m.jsx)(R,{state:n,alternative:t.visual_information,onClick:function(){return a({type:"SELECT",value:t.semantic_expression})}},e)}));return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)(h,{state:n,alternative:{},onClick:function(){return a("CLICK")}}),Object(m.jsx)("div",{className:"select-wrapper",children:Object(m.jsx)("div",{className:"select",children:c})})]})}var _=function(){return fetch(new Request("https://northeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken",{method:"POST",headers:{"Ocp-Apim-Subscription-Key":"ed17c494c0e84bfbbb9189555f9fae1d"}})).then((function(t){return t.text()}))},A=document.getElementById("root");c.render(Object(m.jsx)(j,{}),A)}},[[456,1,2]]]);
//# sourceMappingURL=main.7ea23e26.chunk.js.map