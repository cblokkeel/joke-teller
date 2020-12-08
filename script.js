const buttonPlay = document.querySelector('#button')
const darkMode = document.querySelector('#darkmode')

const VoiceRSS = {
    speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;new Audio(t.responseText).play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&v="+(e.v||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}
}

const tellTheJoke = (text) => {
    try {
        VoiceRSS.speech({
            key: '4b810b0fc20a48b185cd6b9af169450d',
            src: text,
            hl: 'fr-fr',
            v: 'Axel',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        })
    } catch (err) {
        console.log('voicerss error :', err)
    }
}

const provideJoke = async () => {
    try {
        let apiUrl = ''
        if (darkMode.checked) {
            apiUrl = 'https://sleepy-fjord-31986.herokuapp.com/https://www.blagues-api.fr/api/type/dark/random'
        } else {
            apiUrl = 'https://sleepy-fjord-31986.herokuapp.com/https://www.blagues-api.fr/api/random?disallow=dark&disallow=limit'
        }
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY4NTIzMjg2NjIzMTU4MjcyIiwibGltaXQiOjEwMCwia2V5IjoibWtqeEhJZU9KMDB4dHRBd0JwS09YWWxncmVtMXZ5MWVQRTN3dkhMdVc2YllOMDVoQ28iLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0wOFQwOToxNzoyMCswMTowMCIsImlhdCI6MTYwNzQxNTQ0MH0.XyZZtPApflK_t0zYXrVnYpvEu3edwyc-pe-Flqn_WKc`
            }
        })
        const data = await response.json()
        tellTheJoke(`${data.joke} ${data.answer}`)
    } catch (err) {
        console.log('blagues api error :', err)
    }
}

buttonPlay.addEventListener('click', provideJoke)